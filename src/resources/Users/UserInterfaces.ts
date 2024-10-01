import {AuthProvider} from '../Enums.js';
import {RealmModel} from '../Groups/index.js';

export interface UserModel {
    additionalInformation: Record<string, string>;
    country: string;
    credentialsExpired: boolean;
    displayName: string;
    email: string;
    emailAliases: string[];
    emailConfirmed: boolean;
    enabled: boolean;
    expired: boolean;
    firstName: string;
    lastLogin: number;
    lastName: string;
    locked: boolean;
    name: string;
    provider: AuthProvider;
    providerUserId: string;
    providerUsername: string;
    realms: UserRealmModel[];
    samlIdentityProviderId: string;
    socialUser: boolean;
    username: string;
}

export interface UserRealmModel {
    member: boolean;
    realm: RealmModel;
}
