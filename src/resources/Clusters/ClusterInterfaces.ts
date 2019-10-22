export interface ClusterResource {
    id: string;
    name: string;
    createdDate?: number;
    status: 'QUEUED_TO_CREATE' | 'CREATING' | 'REMOVING' | 'UPGRADING' | 'PAUSED' | 'COMPLETED' | 'ERROR';
    type: string;
    numberOfRetries: number;
}

export interface ClusterStatusModel {
    orgReadOnlyStatus: boolean;
    currentProvisioningProgress: number;
    initialProvisioningDone: boolean;
    lastProvisioningCompletedDate?: number;
    ongoing: boolean;
    resources: ClusterResource[];
    retryScheduled: boolean;
    status: 'ERROR' | 'HEALTHY';
}

export interface ClusterTopologyModel {
    agents: ClusterTopologyAgentModel[];
    crawlerDbConnectionString: string;
    dpmDocUri: string;
    indexDocUri: string;
    indexers: ClusterIndexerModel[];
    rabbitServerId: string;
    secCacheJobUri: string;
    secClusterSyncUri: string;
    securityCaches: ClusterSecurityCacheModel[];
    securityProviderDbConnectionString: string;
    securityProviders: ClusterSecurityProviderModel[];
    topologyId: string;
}

export interface ClusterTopologyAgentModel {
    id: string;
    machineSpec: ClusterMachineSpecModel;
    storages: ClusterStorageSpecModel[];
}

export interface ClusterStorageSpecModel {
    numberOfIops: number;
    sizeInGibibytes: number;
    sizeInGigabytes: number;
    storageType: 'STANDARD' | 'SSD' | 'PROVISIONED_SSD';
}

export interface ClusterMachineSpecModel {
    architecture: string;
    storageSpec: ClusterStorageSpecModel;
}

export interface ClusterComponentModel {
    adminPort: number;
    adminUri: string;
    agentId: string;
    componentName: string;
    componentPlatform: string;
    componentVersion: string;
    id: string;
    name: string;
}

export interface ClusterIndexerModel extends ClusterComponentModel {
    indexerDocUri: string;
    searchPort: number;
    searchServerUri: string;
}

export interface ClusterSecurityCacheModel extends ClusterComponentModel {
    secCacheSyncUri: string;
}

export interface ClusterSecurityProviderModel extends ClusterComponentModel {
    type: string;
    useDefaultConfiguration: boolean;
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
    clusterTopology: ClusterTopologyModel;
}

export interface ClusterAgentModel {
    id: string;
    name: string;
    description: string;
    platform: string;
    version: string;
    status: ClusterNodeStatusModel;
}

export interface ClusterNodeStatusModel {
    message: string;
    severity: string;
    status: string;
    timestamp: string;
}
