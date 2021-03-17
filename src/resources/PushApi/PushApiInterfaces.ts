import {SinglePermissionResult, SinglePermissionIdentityType} from '../Enums';

export interface SecurityIdentityAliasModel extends SecurityIdentityBase {
    mappings: AliasMappings;
}

export interface SecurityIdentityModel extends SecurityIdentityBase {
    members?: Identity[];
}

export interface SecurityIdentityDelete {
    identity: Identity;
}

export interface SecurityIdentityDeleteOptions extends Required<SecurityIdentityOptions> {
    queueDelay?: number;
}

export interface SecurityIdentityOptions {
    orderingId?: number;
}

export interface SecurityIdentityBatchConfig {
    fileId: string;
    orderingId?: string;
}

interface SecurityIdentityBase {
    Result?: {
        errorDetails: string;
        result: SinglePermissionResult;
    };
    identity?: Identity;
    wellKnowns?: Identity[];
}

interface AliasMappings extends Identity {
    provider: string;
}

interface Identity {
    additionalInfo: Record<string, string>;
    name: string;
    type: SinglePermissionIdentityType;
}
