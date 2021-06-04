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
import { MarkerDto } from './markerDto';


export interface PartialAssessmentDto { 
    key?: string;
    title: string;
    draftOnly: boolean;
    comment?: string;
    points?: number;
    markers?: Array<MarkerDto>;
}

