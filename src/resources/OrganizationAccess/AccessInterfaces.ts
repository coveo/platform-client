import {AccessLevel, PrivilegeholderType} from '../Enums';
export interface AccessParams {
    /*
     * The access level an API key must have to be included in the response.
     * Allowed values:
     *  - EDIT_ALL: API key can edit the organization.
     *  - CUSTOM: API key has custom access to the organization.
     *  - VIEW_ALL: API key can view the organization.
     *  - NONE: API key has no access to the organization.
     */
    accessLevel: AccessLevel[];
    /*
     * The owner value an API key must have to be included in the response.
     * Example: 'PLATFORM'
     */
    privilegeOwner: string;
    /*
     * The targetDomain value an API key must have to be included in response.
     * Example: 'SOURCE'
     */
    privilegeTargetDomain: string;
}

export interface AccessModel {
    accessLevel: AccessLevel[];
    callerPartOf: boolean;
    displayName: string;
    id: string;
    privilegeholderType: PrivilegeholderType[];
}
