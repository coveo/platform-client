export interface ApiKeyModel {
    organizationId: string;
    id: string;
    enabled: boolean;
    value: string;
    displayName?: string;
    description?: string;
    createdBy?: UserModel;
    createdDate?: string;
    allowedIps?: string[];
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    deniedIps?: string[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    privileges: PrivilegeModel[];
    resourceId?: string;
}

export interface UserModel {
    additionalInformation?: {};
    country?: string[];
    credentialsExpired?: boolean;
    displayName?: string;
    email: string;
    emailAliases?: string[];
    emailConfirmed?: boolean;
    enabled: boolean;
    expired?: boolean;
    firstName?: string;
    lastLogin: number;
    lastName?: string;
    locked: boolean;
    name?: string;
    provider?: Provider;
    providerUserId?: string;
    providerUsername?: string;
    realms?: UserRealmModel[];
    samlIdentityProviderId?: string;
    socialUser?: boolean;
    username?: string;
}

export interface UserRealmModel {
    member?: boolean;
    realm?: RealmModel;
}

export interface RealmModel {
    displayName: string;
    id: string;
    provider: Provider;
    samlIdentityProviderId?: string;
}

export enum Provider {
    SALESFORCE = 'SALESFORCE',
    SALESFORCE_SANDBOX = 'SALESFORCE_SANDBOX',
    GOOGLE = 'GOOGLE',
    OFFICE365 = 'OFFICE365',
    SAML = 'SAML',
    EMAIL = 'EMAIL',
    OTHER = 'OTHER',
}

export interface IdAndDisplayNameModel {
    id: string;
    displayName?: string;
}

export interface PrivilegeModel {
    owner: string;
    targetDomain: string;
    targetId?: string;
    type?: string;
}

export interface CreateApiKeyOptions {
    apiKeyTemplateId?: string;
}
