export interface File {
	path: string;
	name: string;
	directoryPath: string;
	language: string;
	content: string;
}

export function createFile(
	name: string,
	language: string,
	directoryPath: string,
	content = ""
): File {
	return {
		path: directoryPath?.length > 0 ? directoryPath + "/" + name : name,
		name,
		language,
		directoryPath,
		content
	};
}
