import {AuthProvider, IdAndDisplayNameModel, PrivilegeModel} from '../BaseInterfaces';

export interface GroupModel {
    id: string;
    displayName: string;
    invites?: InviteModel[];
    members?: MemberModel[];
    privileges?: PrivilegeModel[];
    realms?: RealmModel[];
    deletable?: boolean;
    resourceId?: string;
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
}

export interface InviteByEmail {
    id: string;
    email: string;
    username?: string;
    providerUsername?: string;
    displayName?: string;
    expirationDate?: number;
    invitedDate?: number;
    provider?: AuthProvider;
}
export interface InviteByUsername {
    id: string;
    username: string;
    email?: string;
    providerUsername?: string;
    displayName?: string;
    expirationDate?: number;
    invitedDate?: number;
    provider?: AuthProvider;
}

export interface InviteByProvider {
    id: string;
    provider: AuthProvider;
    providerUsername: string;
    username?: string;
    email?: string;
    displayName?: string;
    expirationDate?: number;
    invitedDate?: number;
}

export type InviteModel = InviteByEmail | InviteByUsername | InviteByProvider;

export interface MemberModel {
    id: string;
    username: string;
    email?: string;
    displayName?: string;
    lastLogin?: number;
    provider?: AuthProvider;
    providerUsername?: string;
}

export interface RealmModel {
    id: string;
    provider: AuthProvider;
    displayName: string;
    samlIdentityProviderId?: string;
}

export interface CreateGroupOptions {
    canEditItself?: boolean;
    sendEmailToInviteUsers?: boolean;
}

export interface UpdateGroupOptions {
    sendEmailToInviteUsers?: boolean;
}
