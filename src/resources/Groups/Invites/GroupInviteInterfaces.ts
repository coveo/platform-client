import {AuthProvider} from '../../BaseInterfaces';

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

export interface AddInviteOptions {
    sendEmail: boolean;
}
