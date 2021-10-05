import { Injectable } from "@angular/core";
import {
	FileActions,
	FileSelectors,
	WorkspaceActions,
	WorkspaceSelectors
} from "@kling/client/data-access/state";
import { IndexedDbService, InMemoryProject } from "@kling/indexed-db";
import { createDirectoriesFromFiles, File } from "@kling/programming";
import { Store } from "@ngrx/store";
import { BehaviorSubject, firstValueFrom, Subject } from "rxjs";
import { ToastService } from "../../shared/services/toast.service";
import { CodeEditorComponent } from "../editor/components/code-editor/code-editor.component";
import { FileSystemAccess } from "./file-system-access.service";

@Injectable({ providedIn: "root" })
export class WorkspaceService {
	private _init$ = new Subject<void>();
	/** Emits when the workspace is initialized. */
	init$ = this._init$.asObservable();

	private _fileAdded$ = new BehaviorSubject<File>(undefined);
	/** Emits the added file. */
	fileAdded$ = this._fileAdded$.asObservable();

	private _fileRemoved$ = new BehaviorSubject<File>(undefined);
	/** Emits the `id` of the removed file. */
	fileRemoved$ = this._fileRemoved$.asObservable();

	/** Emits when the editor should be focused programmatically, i.e. after adding a new file */
	readonly focusEditor$ = new Subject<void>();

	/** Determines the application's entry point. */
	readonly entryPoint$ = this.store.select(WorkspaceSelectors.selectEntryPoint);

	private __editorComponent: CodeEditorComponent;
	private stdin: string;

	private projectName: string;

	constructor(
		private readonly store: Store,
		private readonly fileSystem: FileSystemAccess,
		private readonly indexedDb: IndexedDbService,
		private toast: ToastService
	) {
		this.store.select(WorkspaceSelectors.selectProjectName).subscribe(projectName => {
			this.projectName = projectName;
		});
	}

	initWorkspace(): void {
		this._init$.next();
	}

	emitFileAdded(file: File): void {
		this._fileAdded$.next(file);
	}

	emitFileRemoved(file: File): void {
		this._fileRemoved$.next(file);
	}

	/** Brings browser focus to the editor. */
	focusEditor(): void {
		this.__editorComponent.focus();
	}

	async saveFile(path: string, content: string): Promise<void> {
		const file = await firstValueFrom(this.store.select(FileSelectors.selectFileByPath(path)));
		const project = await this.indexedDb.projects.getByName(this.projectName);

		if (!project) {
			console.log(`Project "${this.projectName}" does not exist yet. Creating new project.`);

			const files = await firstValueFrom(this.store.select(FileSelectors.selectAllFiles));

			await this.indexedDb.projects.saveProject(
				{
					lastOpened: new Date(),
					name: this.projectName,
					source: "in-memory"
				},
				files
			);
		} else {
			await this.indexedDb.files.put(this.projectName, {
				...file,
				content,
				hasUnsavedChanges: false
			});
		}

		if (this.fileSystem.hasSynchronizedDirectory) {
			await this.fileSystem.saveSynchronizedFile(path, content);
		}

		this.store.dispatch(FileActions.saveFile({ path, content }));
	}

	/**
	 * Restores a project from the `indexedDB` and loads it into the workspace.
	 *
	 * @param projectName Name of the project.
	 * @param [openFile=true] Determines, whether a file from this project should be opened automatically.
	 */
	async restoreProject(projectName: string, openFile = true): Promise<void> {
		this.store.dispatch(
			WorkspaceActions.loadProject({
				projectName,
				files: [],
				directories: []
			})
		);

		try {
			const project = await this.indexedDb.projects.getByName(projectName);

			if (!project) {
				throw new Error("Project does not exist.");
			}

			if (project.source === "fs") {
				await this.fileSystem.synchronizeWithDirectory(project.directoryHandle, openFile);
			} else {
				await this.restoreInMemoryProject(project, openFile);
			}
		} catch (error) {
			this.toast.error("Error.FailedToLoadProject", undefined, { projectName });
			console.error(`Failed to restore project: ${projectName}`);
			console.error(error);
		}
	}

	private async restoreInMemoryProject(project: InMemoryProject, openFile = true): Promise<void> {
		const files = await this.indexedDb.files.getFiles(project.name);
		const directories = createDirectoriesFromFiles(files);

		this.store.dispatch(
			WorkspaceActions.loadProject({
				projectName: project.name,
				files: files ?? [],
				directories
			})
		);

		if (openFile) {
			this.store.dispatch(FileActions.setSelectedFile({ path: files?.[0]?.path ?? null }));
		}
	}

	/**
	 * Sets the entry point for the currently opened project.
	 * The entry point must be known to create code execution requests.
	 *
	 * @param path
	 */
	setEntryPoint(path: string): void {
		this.store.dispatch(WorkspaceActions.setEntryPoint({ path }));
	}

	/**
	 * Sets the `stdin`, which will be included in code execution requests to enable programs to read
	 * user input from the command line.
	 *
	 * @param content
	 */
	setStdin(content: string): void {
		this.stdin = content;
	}

	getStdin(): string {
		return this.stdin;
	}

	setEditorComponent(component: CodeEditorComponent): void {
		this.__editorComponent = component;
	}
}
