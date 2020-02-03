import {AuthProvider} from '../Enums';
import {RealmModel} from '../Groups';

export interface UserModel {
    additionalInformation: Record<string, any>;
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
