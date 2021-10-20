import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	DirectorySelectors,
	FileSelectors,
	WorkspaceSelectors
} from "@kling/client/data-access/state";
import { ToastService } from "@kling/client/shared/services";
import { Store } from "@ngrx/store";
import { firstValueFrom } from "rxjs";
import { CollaborationService } from "../collaboration.service";

@Component({
	selector: "kling-collaboration",
	templateUrl: "./collaboration.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollaborationComponent implements OnInit {
	chatMessageInput = "";
	shareUrl!: string | null;

	readonly activeSessionId$ = this.collaborationService.activeSessionId$;
	readonly collaborators$ = this.collaborationService.collaborators$;
	readonly messages$ = this.collaborationService.messages$;

	private username!: string;

	constructor(
		readonly location: Location,
		private readonly collaborationService: CollaborationService,
		private readonly store: Store,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly toast: ToastService
	) {}

	async ngOnInit(): Promise<void> {
		const { username, share, project } = this.route.snapshot.queryParams;
		this.username = username;

		if (share) {
			await this.joinSession(share, project);
		}
	}

	async createSession(): Promise<void> {
		const [files, directories, selectedFile, projectName] = await Promise.all([
			firstValueFrom(this.store.select(FileSelectors.selectAllFiles)),
			firstValueFrom(this.store.select(DirectorySelectors.selectAllDirectories)),
			firstValueFrom(this.store.select(FileSelectors.selectSelectedFilePath)),
			firstValueFrom(this.store.select(WorkspaceSelectors.selectProjectName))
		]);

		const sessionId = await this.collaborationService.createSession(this.username, {
			files,
			directories,
			selectedFile,
			name: projectName
		});

		await this.router.navigate([], {
			queryParams: {
				share: sessionId
			},
			queryParamsHandling: "merge",
			preserveFragment: true
		});

		this.shareUrl = this.generateShareUrl(sessionId);
		this.toast.success("Connected to session: " + sessionId, "Collaboration");
	}

	async joinSession(sessionId: string, projectName?: string): Promise<void> {
		this.shareUrl = this.generateShareUrl(sessionId);
		await this.collaborationService.joinSession(this.username, sessionId, projectName);
		this.toast.success("Connected to session: " + sessionId, "Collaboration");
	}

	private generateShareUrl(id: string): string {
		return `${window.location.origin}/ide?share=${id}`;
	}

	sendChatMessage(text: string): Promise<void> {
		return this.collaborationService.sendChatMessage(text);
	}

	async disconnect(): Promise<void> {
		await this.collaborationService.disconnect();
		this.router.navigate([], {
			queryParams: {
				share: undefined
			},
			queryParamsHandling: "merge",
			preserveFragment: true
		});
	}

	copyToClipboard(text: string): void {
		navigator.clipboard.writeText(text);
		this.toast.info(text, "Copied to Clipboard");
	}
}
