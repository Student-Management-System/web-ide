import { File } from "@kling/programming";
import { StoredProject } from "../project";
import { createFileId, WebIdeDatabase } from "../web-ide-database";

export class ProjectTable {
	constructor(private readonly db: WebIdeDatabase) {}

	createProject(project: StoredProject, files: File[]): Promise<void> {
		return this.db.transaction("readwrite", this.db.projects, this.db.files, async () => {
			await this.put(project);

			for await (const file of files) {
				await this.db.files.add({
					id: createFileId(project.name, file.path),
					projectName: project.name,
					file
				});
			}
		});
	}

	/**
	 * Adds or updates information about a project.
	 */
	async put(project: StoredProject): Promise<void> {
		await this.db.projects.put(project, project.name);
	}

	/**
	 * Returns all stored projects sorted by their `lastOpened` dates.
	 */
	getMany(): Promise<StoredProject[]> {
		return this.db.projects.reverse().sortBy("lastOpened");
	}

	/**
	 * Returns the project associated with the given `projectName`.
	 */
	getByName(projectName: string): Promise<StoredProject | undefined> {
		return this.db.projects.get(projectName);
	}

	/**
	 * Deletes the project associated with the given `projectName`.
	 * Will also delete all related files from the {@link FileTable}.
	 */
	async delete(projectName: string): Promise<void> {
		await this.db.transaction("readwrite", this.db.projects, this.db.files, async () => {
			await Promise.all([
				this.db.projects.delete(projectName),
				this.db.files.where("projectName").equals(projectName).delete()
			]);
		});
	}
}
