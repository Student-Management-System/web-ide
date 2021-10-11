import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
	FileActions,
	FileSelectors,
	FileTabActions,
	FileTabSelectors
} from "@kling/client/data-access/state";
import { Store } from "@ngrx/store";

@Component({
	selector: "kling-file-tabs",
	templateUrl: "./file-tabs.component.html",
	styleUrls: ["./file-tabs.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTabsComponent {
	selectedFile$ = this.store.select(FileSelectors.selectCurrentFile);
	tabs$ = this.store.select(FileTabSelectors.getFileTabs);

	constructor(private store: Store) {}

	selectTab(selectedPath: string, currentPath: string): void {
		if (selectedPath !== currentPath) {
			this.store.dispatch(FileActions.setSelectedFile({ path: selectedPath }));
		}
	}

	closeTab(selectedPath: string): void {
		this.store.dispatch(FileTabActions.removeFileTab({ path: selectedPath }));
	}
}