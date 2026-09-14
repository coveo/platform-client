import {GranularResource, PrivilegeModel} from '../BaseInterfaces.js';
import {InviteModel} from './Invites/index.js';
import {MemberModel} from './Members/index.js';
import {RealmModel} from './Realms/index.js';

export interface GroupModel extends GranularResource {
    id: string;
    displayName: string;
    invites?: InviteModel[];
    members?: MemberModel[];
    privileges?: PrivilegeModel[];
    realms?: RealmModel[];
    deletable?: boolean;
    resourceId?: string;
}

export type DefaultGroupType = 'CUSTOM' | 'ADMINISTRATOR' | 'MCP_SEARCH_USERS';

/**
 * A built-in group.
 */
export interface DefaultGroupModel {
    /**
     * The unique identifier of the built-in group.
     */
    id: string;
    /**
     * The display name of the built-in group.
     */
    displayName: string;
    /**
     * Whether the built-in group can be deleted.
     */
    deletable: boolean;
    /**
     * The privileges of the built-in group.
     */
    privileges: PrivilegeModel[];
    /**
     * The group type for the given group.
     */
    groupType: DefaultGroupType;
}

export interface CreateGroupOptions {
    canEditItself?: boolean;
    sendEmailToInviteUsers?: boolean;
}

export interface UpdateGroupOptions {
    sendEmailToInviteUsers?: boolean;
}
