import {IdAndDisplayNameModel, PrivilegeModel} from '../BaseInterfaces';

export interface ApiKeyModel {
    organizationId?: string;
    id?: string;
    enabled?: boolean;
    value?: string;
    displayName?: string;
    description?: string;
    createdBy?: object;
    createdDate?: number;
    allowedIps?: string[];
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    deniedIps?: string[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    privileges?: PrivilegeModel[];
    resourceId?: string;
}

export interface CreateApiKeyOptions {
    apiKeyTemplateId?: string;
}
