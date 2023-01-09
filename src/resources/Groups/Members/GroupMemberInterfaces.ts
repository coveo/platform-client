import {AuthProvider} from '../../Enums.js';

export interface MemberModel {
    id: string;
    username: string;
    email?: string;
    displayName?: string;
    lastLogin?: number;
    provider?: AuthProvider;
    providerUsername?: string;
}

export interface AddGroupMemberOptions {
    sendEmailOnInvite: boolean;
}
