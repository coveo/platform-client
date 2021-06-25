import {GranularResource, PrivilegeModel} from '../BaseInterfaces';

export interface ApiKeyModel extends GranularResource {
    organizationId?: string;
    id?: string;
    enabled?: boolean;
    value?: string;
    displayName?: string;
    description?: string;
    createdBy?: any;
    createdDate?: number;
    lastUsedDate?: number;
    allowedIps?: string[];
    deniedIps?: string[];
    privileges?: PrivilegeModel[];
    resourceId?: string;
}

export interface CreateApiKeyOptions {
    apiKeyTemplateId?: string;
}
