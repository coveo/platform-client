import {ActivityOperation, OperationType, SourceStatusType, SourceStatusTypeWithTransition} from '../../Enums.js';

export interface SourceCurrentOperation {
    itemsAdded?: number;
    itemsFiltered?: number;
    itemsRemoved?: number;
    itemsUnchanged?: number;
    itemsUpdated?: number;
    operationType: OperationType;
    statusMessage?: string;
}

export interface SourceLastOperation {
    errorCode?: string;
    id?: string;
    initialBuild?: boolean;
    itemsAdded?: number;
    itemsFiltered?: number;
    itemsRemoved?: number;
    itemsUnchanged?: number;
    itemsUpdated?: number;
    numberOfDocuments?: number;
    operationType: OperationType;
    result?: string;
    timestamp?: number;
    startedDate?: number;
}

export interface NextOperation {
    operationType?: OperationType;
    timestamp?: number;
}

export interface SourceStatus {
    /**
     * The unique identifier of the current activity of the source.
     */
    activityId?: string;
    allowedOperations?: ActivityOperation[];
    /**
     * The date when the activity was created.
     */
    createdDate?: number;
    /**
     * The status type including transition statuses.
     */
    extendedCurrentStatus?: SourceStatusTypeWithTransition;
    initialBuild?: boolean;
    numberOfDocuments?: number;
    numberOfProcessedDocuments?: number;
    pausedOnErrorCode?: string;
    refreshType?: OperationType;
    timestamp?: number;
    /**
     * The status type.
     */
    type?: SourceStatusType;
}

export interface SourceUpdateEventModel {
    /**
     * The reason of why the source needs to be rebuilt
     */
    reason: string;
    /**
     * The date on which the triggering change occurred.
     */
    datetime: number;
}

export interface SourceInformation {
    id?: string;
    collectionId?: number;
    collectionName?: string;
    currentOperation?: SourceCurrentOperation;
    documentsTotalSize?: number;
    lastOperation?: SourceLastOperation;
    nextOperation?: NextOperation;
    numberOfDocuments?: number;
    rebuildRequired?: boolean;
    sourceId?: number;
    sourceName?: string;
    sourceStatus?: SourceStatus;
    /**
     * The update events that have occurred since the last rebuild of the source.
     */
    updateEventsSinceLastRebuild?: SourceUpdateEventModel[];
}
