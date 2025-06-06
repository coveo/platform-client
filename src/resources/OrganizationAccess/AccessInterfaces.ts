import {AccessLevel, PrivilegeHolderType} from '../Enums.js';
import {GlobalPrivilegeModel} from '../GlobalGroups/GlobalGroupInterfaces.js';
import {UserModel} from '../Users/UserInterfaces.js';
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
     * The access level granted by this group.
     */
    accessLevel: AccessLevel;
    /*
     * Whether the calling user is part of this group.
     */
    callerPartOf: boolean;
    /*
     * The display name of this group.
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
     * The list of resources ids this group has edit access level on.
     */
    resourceIdsWithEditLevel?: string[];
};

export type ApiKeyAccessModel = {
    /*
     * The access level granted by this API key.
     */
    accessLevel: AccessLevel;
    /*
     * The creation date of this API key.
     */
    createdDate: string;
    /*
     * The display name of this API key.
     */
    displayName: string;
    /*
     * The id of this API key.
     */
    id: string;
    /*
     * Represent the API key access model type.
     */
    privilegeHolderType: PrivilegeHolderType.API_KEY;
    /*
     * The list of resources ids this API key has edit access level on.
     */
    resourceIdsWithEditLevel?: string[];
};

export type AccessModel = GroupAccessModel | ApiKeyAccessModel;

/**
 * 	Information pertaining to a temporary access in an organization.
 */
export interface TemporaryAccessModel {
    /**
     * The unique identifier of the temporary access.
     */
    id: string;
    /**
     * A brief description of the temporary access.
     */
    description: string;
    /**
     * Justification for the temporary access request.
     */
    justificationNotes: string;
    /**
     * The unique identifier of the organization for which the temporary access was created.
     */
    organizationId: string;
    /**
     * The user that created the temporary access request.
     */
    user: UserModel;
    /**
     * The set of privileges granted to the temporary access.
     */
    privileges: GlobalPrivilegeModel[];
    /**
     * The expiration date of the temporary access in number of milliseconds since UNIX epoch.
     */
    expirationDate: number;
    /**
     * The date at which the temporary access was granted in number of milliseconds since UNIX epoch.
     */
    dateGranted: number;
    /**
     * The date at which the temporary access was revoked in number of milliseconds since UNIX epoch.
     */
    revocationDate: number;
}
