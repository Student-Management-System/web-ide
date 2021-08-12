import { SupportedLanguage } from "@kling/programming";

export type File = {
	path: string;
	name: string;
	directoryPath: string;
	language: SupportedLanguage;
	content: string;
};

/**
 * Creates a simple `File` object.
 * @param name Complete name of the file (incl. extension), i.e., `Main.java`.
 * @param language Name of the programming language or file type.
 * @param [directoryPath=""] Path to this file's directory. Defaults to empty string (root directory).
 * @param [content] Initial content of this file. Not synchronized with the editor.
 */
export function createFile(
	name: string,
	language: SupportedLanguage,
	directoryPath = "",
	content?: string
): File {
	return {
		path: directoryPath?.length > 0 ? directoryPath + "/" + name : name,
		name,
		language,
		directoryPath,
		content: content ?? `// ${name}`
	};
}
