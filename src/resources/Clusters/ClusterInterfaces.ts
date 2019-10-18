export interface ClusterResource {
    name: string;
    createdDate?: number;
    status: string;
    type: string;
}

export interface ClusterStatusModel {
    orgReadOnlyStatus: boolean;
    currentProvisioningProgress: number;
    initialProvisioningDone: boolean;
    lastProvisioningCompletedDate?: number;
    ongoing: boolean;
    resources: ClusterResource[];
    status: string;
}

export interface ClusterModel {
    id: string;
    identityTargetMode: string;
    liveCluster: boolean;
    organizationId: string;
    componentVersions: {
        connectorsVersion: string;
        indexerVersion: string;
        securityCacheVersion: string;
        securityProviderVersion: string;
    };
}

export interface ClusterAgentModel {
    id: string;
    name: string;
    description: string;
    platform: string;
    version: string;
    status: NodeStatusModel;
}
export interface NodeStatusModel {
    message: string;
    severity: string;
    status: string;
    timestamp: string;
}
