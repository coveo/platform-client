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

export interface CreateGroupOptions {
    canEditItself?: boolean;
    sendEmailToInviteUsers?: boolean;
}

export interface UpdateGroupOptions {
    sendEmailToInviteUsers?: boolean;
}
