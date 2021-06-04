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
import { ParticipantDto } from "./participantDto";

export interface ParticipantsWithAssignedEvaluatorDto {
	/**
	 * UserId of the assigned evaluator (for assignment).
	 */
	assignedEvaluatorId?: string;
	/**
	 * Id of the assessment for this user, if it exists.
	 */
	assessmentId?: string;
	participant: ParticipantDto;
}
