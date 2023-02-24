import {AccessLevel, PrivilegeHolderType} from '../Enums.js';
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
    /*
     * The access level for this privilege.
     */
    accessLevel: AccessLevel;
    /*
     * Whether the calling user is part of this group.
     */
    callerPartOf?: boolean;
    /*
     * The creation date of this privilege.
     */
    createdDate?: string;
    /*
     * The display name of this privilege.
     */
    displayName: string;
    /*
     * The id of this privilege.
     */
    id: string;
    /*
     * The type of this privilege.
     */
    privilegeHolderType: PrivilegeHolderType;
    /*
     * The list of sources id this privilege is applied to.
     */
    resourceIdsWithEditLevel?: string[];
}
