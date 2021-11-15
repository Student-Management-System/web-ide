import { SubmissionResultDto } from "@student-mgmt/exercise-submitter-api-client";

export const SUBMISSION_RESULT_ACCEPTED_ERROR_WARNING: SubmissionResultDto = {
	accepted: true,
	messages: [
		{
			checkName: "checkstyle",
			file: "Main.java",
			message: "Checkstyle could not parse file",
			type: "WARNING"
		},
		{
			checkName: "javac",
			column: 62,
			file: "Main.java",
			line: 6,
			message: "';' expected",
			type: "ERROR"
		}
	]
};

export const SUBMISSION_RESULT_ACCEPTED_NO_ERRORS: SubmissionResultDto = {
	accepted: true,
	messages: []
};

export const SUBMISSION_RESULT_REJECTED: SubmissionResultDto = {
	accepted: false,
	messages: []
};
