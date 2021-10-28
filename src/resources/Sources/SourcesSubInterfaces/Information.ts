import {ActivityOperation, OperationType, SourceStatusType} from '../../Enums';

export interface SourceLastOperation {
    errorCode?: string;
    id?: string;
    initialBuild?: boolean;
    numberOfDocuments?: number;
    operationType?: OperationType;
    result?: string;
    timestamp?: number;
}

export interface NextOperation {
    operationType?: OperationType;
    timestamp?: number;
}

export interface SourceStatus {
    allowedOperations?: ActivityOperation[];
    initialBuild?: boolean;
    numberOfDocuments?: number;
    numberOfProcessedDocuments?: number;
    pausedOnErrorCode?: string;
    refreshType?: OperationType;
    timestamp?: number;
    type?: SourceStatusType;
}

export interface SourceInformation {
    id?: string;
    collectionId?: number;
    collectionName?: string;
    documentsTotalSize?: number;
    lastOperation?: SourceLastOperation;
    nextOperation?: NextOperation;
    numberOfDocuments?: number;
    rebuildRequired?: boolean;
    sourceId?: number;
    sourceName?: string;
    sourceStatus?: SourceStatus;
}
