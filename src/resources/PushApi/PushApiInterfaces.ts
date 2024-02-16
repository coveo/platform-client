import {SinglePermissionResult, SinglePermissionIdentityType} from '../Enums.js';

export interface FileContainer {
    uploadUri: string;
    fileId: string;
    requiredHeaders: Record<string, string>;
}

export interface FileContainerOptions {
    /**
     * Whether to generate the presigned URL using the virtual hosted-style URL.
     *
     * Example of a virtual hosted-style url: `https://coveo-nprod-customer-data.s3.us-east-1.amazonaws.com/proda/blobstore/mycoveocloudv2organizationg8tp8wu3/b5e8767e-8f0d-4a89-9095-1127915c89c7[...]`
     */
    useVirtualHostedStyleUrl?: boolean;
}

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
