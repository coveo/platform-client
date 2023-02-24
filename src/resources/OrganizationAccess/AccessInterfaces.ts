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

export type GroupAccessModel = {
    /*
     * The access level granted by the access model.
     */
    accessLevel: AccessLevel;
    /*
     * Whether the calling user is part of this group.
     */
    callerPartOf: boolean;
    /*
     * The display name of the group.
     */
    displayName: string;
    /*
     * The id of the group.
     */
    id: string;
    /*
     * Represent the group access model type.
     */
    privilegeHolderType: PrivilegeHolderType.GROUP;
    /*
     * The list of resources ids this access model has edit access level on.
     */
    resourceIdsWithEditLevel?: string[];
};

export type ApiKeyAccessModel = {
    /*
     * The access level granted by the access model.
     */
    accessLevel: AccessLevel;
    /*
     * The creation date of the api key.
     */
    createdDate: string;
    /*
     * The display name of the api key.
     */
    displayName: string;
    /*
     * The id of the api key.
     */
    id: string;
    /*
     * Represent the api key access model type.
     */
    privilegeHolderType: PrivilegeHolderType.API_KEY;
    /*
     * The list of resources ids this access model has edit access level on.
     */
    resourceIdsWithEditLevel?: string[];
};

export type AccessModel = GroupAccessModel | ApiKeyAccessModel;
