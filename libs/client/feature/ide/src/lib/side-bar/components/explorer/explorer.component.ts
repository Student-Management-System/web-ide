import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
	DirectorySelectors,
	FileSelectors,
	WorkspaceSelectors
} from "@kling/client/data-access/state";
import { WorkspaceDialogs } from "@kling/ide-dialogs";
import { FileSystemAccess } from "@kling/ide-services";
import { Store } from "@ngrx/store";
import { firstValueFrom } from "rxjs";

@Component({
	selector: "kling-explorer",
	templateUrl: "./explorer.component.html",
	styleUrls: ["./explorer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerComponent {
	rootDirectory$ = this.store.select(DirectorySelectors.selectDirectoryByPath(""));
	workspace$ = this.store.select(WorkspaceSelectors.selectWorkspaceState);

	constructor(
		public workspaceDialogs: WorkspaceDialogs,
		private readonly fileSystem: FileSystemAccess,
		private readonly store: Store
	) {}

	exportToDisk(): void {
		this.fileSystem.exportAsZip();
	}

	async saveAsNewProject(): Promise<void> {
		const currentFiles = await firstValueFrom(this.store.select(FileSelectors.selectAllFiles));
		const projectName = await firstValueFrom(
			this.store.select(WorkspaceSelectors.selectProjectName)
		);

		this.workspaceDialogs.openCreateProjectDialog({
			project: {
				name: projectName,
				files: currentFiles
			}
		});
	}

	createNewProject(): void {
		this.workspaceDialogs.openCreateProjectDialog();
	}
}