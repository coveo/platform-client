export interface ApiKeyModel {
    organizationId?: string;
    id?: string;
    enabled?: boolean;
    value?: string;
    displayName?: string;
    description?: string;
    createdBy?: {};
    createdDate?: number;
    allowedIps?: string[];
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    deniedIps?: string[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    privileges?: PrivilegeModel[];
    resourceId?: string;
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
    targetId: string;
    type?: string;
}

export interface CreateApiKeyOptions {
    apiKeyTemplateId?: string;
}
