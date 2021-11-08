import { NgModule, Pipe, PipeTransform } from "@angular/core";
import { getLanguageFromFilename } from "@kling/programming";

@Pipe({ name: "programmingLanguage" })
export class ProgrammingLanguagePipe implements PipeTransform {
	transform(filename: string): string | null {
		return getLanguageFromFilename(filename);
	}
}

@NgModule({
	declarations: [ProgrammingLanguagePipe],
	exports: [ProgrammingLanguagePipe]
})
export class ProgrammingLanguageModule {}