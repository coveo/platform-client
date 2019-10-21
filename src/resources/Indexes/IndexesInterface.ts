export interface IndexStorageSpec {
    numberOfIops: number;
    sizeInGibibytes: number;
    sizeInGigabytes: number;
    storageType: string;
}

export interface IndexMachineSpec {
    architecture: string;
    storageSpec: IndexStorageSpec;
}

export interface IndexSourceStatistics {
    collectionId: number;
    documentCount: number;
    documentTotalSize: number;
    sourceId: number;
}

export interface IndexStatusStats {
    diskSpaceUsed: number;
    documentCount: number;
    documentsTotalSize: number;
    lastAppliedTransactionTimestamp: number;
    lastCommitTimestamp: number;
    numberOfQueries: number;
    numberOfSlices: number;
    pendingTransactions: number;
    realtimeDiskSpaceUsed: number;
    realtimeDocumentCount: number;
    realtimeDocumentsTotalSize: number;
    realtimePendingTransactions: number;
    remainingDiskSpace: number;
    sourceStatistics: IndexSourceStatistics[];
    totalMemoryUsed: number;
    totalPhysicalMemory: number;
}

export interface IndexStatus {
    internalStatus: string;
    online: boolean;
    readOnlyStatus: string;
    stats: IndexStatusStats;
}

export interface IndexAttributes {
    adminUri: string;
    agentId: string;
    id: string;
    logicalIndex: string;
    machineSpec: IndexMachineSpec;
    name: string;
    organizationId: string;
    region: string;
    searchUri: string;
    status: IndexStatus;
    storages: IndexStorageSpec[];
    type: string;
}

export interface CreateCoveoIndexModel {
    copyFromId?: string;
    logicalIndexId?: string;
    machineSpec?: IndexMachineSpecModel;
    online?: boolean;
    region?: string;
    versions?: IndexVersionsModel;
}

export interface IndexMachineSpecModel {
    architecture: string;
    storageSpec: IndexStorageSpecModel;
}

export interface IndexStorageSpecModel {
    numberOfIops: number;
    sizeInGibibytes: number;
    sizeInGigabytes: number;
    storageType: string;
}

export interface IndexVersionsModel {
    indexerVersion: string;
    securityCacheVersion: string;
}
