import { createReducer, on } from "@ngrx/store";
import * as WorkspaceActions from "./workspace.actions";

export const workspaceFeatureKey = "workspace";

export interface State {
	entryPoint: string;
	projectName: string;
	theme: string;
}

function createInitialState(): State {
	return {
		entryPoint: null,
		projectName: "Unnamed Project",
		theme: localStorage.getItem("theme") === "default-theme" ? "light" : "dark"
	};
}

export const reducer = createReducer(
	createInitialState(),
	on(WorkspaceActions.initEmptyProject, state => state),
	on(WorkspaceActions.loadProject, (state, action) => ({
		...state,
		projectName: action.projectName,
		entryPoint: action.entryPoint
	})),
	on(WorkspaceActions.setEntryPoint, (state, action) => ({
		...state,
		entryPoint: action.path
	})),
	on(WorkspaceActions.setProjectName, (state, action) => ({
		...state,
		projectName: action.name
	})),
	on(WorkspaceActions.setTheme, (state, action) => ({ ...state, theme: action.theme }))
);
