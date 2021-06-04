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
import { ParticipantDto } from './participantDto';
import { GroupEventDto } from './groupEventDto';


export interface GroupDto { 
    /**
     * Unique identifier of this group.
     */
    id?: string;
    /**
     * Name of the group.
     */
    name: string;
    /**
     * Password required to enter the group.
     */
    password?: string;
    /**
     * Indicates, wether group has a password. Set by the server.
     */
    hasPassword?: boolean;
    /**
     * Count of group members. Set by the server.
     */
    size?: number;
    /**
     * Determines, wether course participant are able to join this group.
     */
    isClosed?: boolean;
    members?: Array<ParticipantDto>;
    history?: Array<GroupEventDto>;
}

