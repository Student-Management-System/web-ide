/**
 * Student-Management-System-API
 * The Student-Management-System-API. <a href=\'http://localhost:3000/api-json\'>JSON</a>
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PartialAssessmentDto } from "./partialAssessmentDto";
import { UserDto } from "./userDto";
import { GroupDto } from "./groupDto";
import { ParticipantDto } from "./participantDto";
import { AssignmentDto } from "./assignmentDto";

export interface AssessmentDto {
	/**
	 * Unique identifier of this assessment.
	 */
	id?: string;
	/**
	 * Identifier of the assignment that is being evaluated by this assessment.
	 */
	assignmentId: string;
	/**
	 * Marks the assessment as a draft.
	 */
	isDraft: boolean;
	/**
	 * The amount of points that the student or group achieved with their submission.
	 */
	achievedPoints?: number;
	/**
	 * A comment providing additional feedback.
	 */
	comment?: string;
	/**
	 * If a group submission is being evaluated, contains the identifier of the group.
	 */
	groupId?: string;
	/**
	 * If a single user is being evaluated, contains the identifier of the user.
	 */
	userId?: string;
	/**
	 * Identifier of the creator of this assessment.
	 */
	creatorId?: string;
	/**
	 * Identifier of the last user that updated this assessment.
	 */
	lastUpdatedById?: string;
	assignment?: AssignmentDto;
	group?: GroupDto;
	participant?: ParticipantDto;
	creator?: UserDto;
	lastUpdatedBy?: UserDto;
	creationDate?: string;
	updateDate?: string;
	partialAssessments?: Array<PartialAssessmentDto>;
}
