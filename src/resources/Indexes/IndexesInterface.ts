import {Paginated} from '../BaseInterfaces.js';

export interface IndexStorageSpec {
    numberOfIops: number;
    sizeInGibibytes: number;
    sizeInGigabytes: number;
    storageType: string;
    throughputInMebibytes: number;
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

export interface IndexStatisticsModel {
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
    stats: IndexStatisticsModel;
    syncStatus?: IndexSyncStatusAttributes;
    backupStatus?: IndexSyncStatusAttributes;
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
    machineSpec?: MachineSpecModel;
    online?: boolean;
    region?: string;
    versions?: IndexVersionsModel;
}

export interface MachineSpecModel {
    architecture: string;
    storageSpec: IndexStorageSpecModel;
}

export interface IndexStorageSpecModel {
    numberOfIops: number;
    sizeInGibibytes: number;
    storageType: string;
    throughputInMebibytes: number;
}

export interface IndexVersionsModel {
    indexerVersion: string;
    securityCacheVersion: string;
}

export interface IndexBackupsItems {
    backupId: string;
    creationDate: number;
    indexId: string;
    logicalIndex: string;
    organizationId: string;
}

export interface IndexBackupsOptions extends Paginated {
    backupId?: string;
    from?: number;
    indexId?: string;
    order?: string;
    sortBy?: string;
    to?: number;
}

export interface IndexSyncStatusAttributes {
    currentFileName: string;
    currentFileNumber: number;
    totalNumberOfFiles: number;
    transferredSize: number;
    totalSize: number;
}

export interface IndexPhysicalIndexModel {
    applyStemmingOnExactPhraseTerms: boolean;
    description: string;
    enableRealtimeIndexing: boolean;
    groupByMaxToCache: number;
    languagesSettings: string;
    name: string;
    normalizerUnicodeSetExclusion: string;
    performanceCacheMemory: number;
    realtimeIndexingDocumentsThreshold: number;
    realtimeIndexingStartThreshold: number;
    uniqueTermsPerDocument: number;
    wildcardsNumberOfLeadingChars: number;
    wildcardsNumberOfTerms: number;
}

export interface IndexHighlightTagModel {
    end: string;
    id: number;
    start: string;
}

export interface IndexQueryHighlighterModel {
    highlightTags: IndexHighlightTagModel[];
    ignoreAccents: boolean;
    ignoredFields: string;
    useStemming: boolean;
}

export interface IndexRankingModel {
    adjacencyMult: number;
    conceptMult: number;
    customDocumentWeightMult: number;
    docDateMult: number;
    formattedMult: number;
    languageMult: number;
    linkRankMult: number;
    numberOfResultsToRefine: number;
    qualityMult: number;
    rankingHeuristic: string;
    rankingHeuristicUseIndexSize: boolean;
    sourceReputationMult: number;
    summaryMult: number;
    tFIDFMult: number;
    termCasingMult: number;
    termCorrelationMult: number;
    titleMult: number;
    uRIMult: number;
}

export interface IndexSystemModel {
    documentDuplicateFactor: number;
    documentLimitWarning: number;
    documentsChunkToDefragment: number;
    documentsFragmentationTarget: number;
    enableInternalLiveTagging: boolean;
    enableLiveTagging: boolean;
    enableQueryMetrics: boolean;
    enableSearchDebugArgument: boolean;
    enableServiceIndexMetrics: boolean;
    enableTransactionsIndexMetrics: boolean;
    enableWordCorrectorLexicon: boolean;
    freeSpaceBeforeRebalancingBTree: number;
    freeSpaceBeforeRebalancingBTreeDuringCleanup: number;
    indexingBlockerMode: string;
    limitSystemFileCacheSize: boolean;
    maxBTreeFlushPendingMemoryMB: number;
    maxChunksCleanupPerTransactionPeakPeriod: number;
    maxChunksCleanupTimePerTransactionPeakPeriod: number;
    maxDocIDRecyclingTimePerTransactionPeakPeriod: number;
    maxMMFFlushPendingMemoryMB: number;
    maxRecycledTermIDCleanupTimePeakPeriod: number;
    maxRecycledTermIDCleanupTimePercentPeakPeriod: number;
    maxSystemFileCacheSize: number;
    maxTermDefragmentationTimePeakPeriod: number;
    maxTermDefragmentationTimePercentPeakPeriod: number;
    maxWriterBTreeShrinkTimePeakPeriod: number;
    maximumResults: number;
    maximumTermsPerQuery: number;
    minDocIDCountForRecycling: number;
    minTermIDCountForRecycling: number;
    minimumDiskSpace: number;
    numberOfBatchQueryThreads: number;
    numberOfQueryThreads: number;
    performanceCacheMemory: number;
    performanceMinimumCacheMemory: number;
    recyclingThresholdMultiplierInIndexingMode: number;
    securityEntityResolverRefreshDelayInSeconds: number;
    streamCompressionMethod: string;
    systemFileCacheTrimInterval: number;
    termsChunksToDefragmentPerTransactionPeakPeriod: number;
    transactionMaxDocumentsSize: number;
    transactionUpdateFrequency: number;
}

export interface RawIndexConfig {
    physicalIndex: IndexPhysicalIndexModel;
    queryHighlighter: IndexQueryHighlighterModel;
    ranking: IndexRankingModel;
    system: IndexSystemModel;
}
