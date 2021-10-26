import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@kling/client/shared/components";
import { TranslateModule } from "@ngx-translate/core";
import { ContextMenuModule } from "ngx-contextmenu";
import { FileModule } from "../file/file.module";
import { DirectoryComponent } from "./directory.component";

@NgModule({
	declarations: [DirectoryComponent],
	imports: [CommonModule, ContextMenuModule, IconModule, FileModule, TranslateModule],
	exports: [DirectoryComponent]
})
export class DirectoryModule {}
