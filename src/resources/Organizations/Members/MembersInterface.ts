import {AuthProvider} from '../../Enums.js';

export interface OrganizationMemberModel {
    /**
     * The display name of the member
     */
    displayName: string;
    /**
     * The email address of the member
     */
    email: string;
    /**
     * The groups the member is a part of
     */
    groups: OrganizationMemberGroupModel[];
    /**
     * The provider of the member
     */
    provider: AuthProvider;
    /**
     * The username used for the assigned provider
     */
    providerUsername: string;
    /**
     * The username of the member
     */
    username: string;
    /**
     * The last used date of the member as a Unix timestamp (milliseconds)
     */
    lastUsedDate?: number;
}

export interface OrganizationMemberGroupModel {
    /**
     * The display name of the group
     */
    displayName: string;
    /**
     * The id of the group
     */
    id: string;
}
