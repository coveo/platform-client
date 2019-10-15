export interface ApiKeyModel {
    id: string;
    organizationId: string;
    createdBy?: ApiKeyCreatedBy;
    createdDate: number;
    description?: string;
    displayName?: string;
    enabled: boolean;
    value: string;
    allowedIps?: string[];
    deniedIps?: string[];
    privileges: Privilege[];
    resourceId?: string;
    groupsThatCanEdit?: AccessSerializableAttributesItem[];
}

export interface ApiKeyCreatedBy {
    displayName: string;
    email: string;
    locked?: boolean;
    provider?: string;
    providerUsername?: string;
    realms?: ApiKeyRealm[];
    socialUser?: boolean;
    username?: string;
}

export interface Privilege {
    owner: string;
    targetDomain: string;
    targetId?: string;
    type?: string;
}

export interface ApiKeyRealm {
    member: boolean;
}

export interface AccessSerializableAttributesItem {
    id: string;
    displayName?: string;
}
