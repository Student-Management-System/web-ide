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


export interface ChangeCourseRoleDto { 
    role: ChangeCourseRoleDto.RoleEnum;
}
export namespace ChangeCourseRoleDto {
    export type RoleEnum = 'LECTURER' | 'TUTOR' | 'STUDENT';
    export const RoleEnum = {
        Lecturer: 'LECTURER' as RoleEnum,
        Tutor: 'TUTOR' as RoleEnum,
        Student: 'STUDENT' as RoleEnum
    };
}


