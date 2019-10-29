import {IdAndDisplayNameModel} from '../BaseInterfaces';

export interface MLModel extends MLModelInfo, MLModelCreated {
    orgId: string;
    id: string;
    engineId: string;
    modelName: string;
    modelDisplayName?: string;
    modelCreationTime: number;
    nextModelUpdateTime?: number;
    modelVersion?: string;
    engineVersion?: string;
    platformVersion?: 1 | 2;
    versionMatcher?: string;
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    modelErrorDescription?: ModelErrorDescription;
    previousModelUpdateTime?: number;
    intervalTime: number;
    intervalUnit: 'DAY' | 'WEEK' | 'MONTH';
    exportPeriod: string;
    exportOffset?: string;
    status:
        | 'DELETED'
        | 'SCHEDULING'
        | 'SCHEDULED'
        | 'ERROR'
        | 'PENDING'
        | 'REGISTERED'
        | 'PAUSED'
        | 'REGISTERING'
        | 'IN_PROGRESS'
        | 'ERROR_DELETING'
        | 'ONLINE'
        | 'OFFLINE'
        | 'IN_CREATION';
    commandLineParameters?: string[];
    commonFilter?: string;
    customEventFilter?: string;
    searchEventFilter?: string;
    viewEventFilter?: string;
}

export interface ModelErrorDescription {
    present?: boolean;
}

export interface MLModelInfo {
    id: string;
    info?: {};
}

export interface CreateMLModelOptions {
    engineId: string;
    modelName: string;
    modelDisplayName?: string;
    exportPeriod: string;
    intervalTime: number;
    intervalUnit: 'DAY' | 'WEEK' | 'MONTH';
    exportOffset?: string;
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    commandLineParameters?: string[];
    commonFilter?: string;
    customEventFilter?: string;
    searchEventFilter?: string;
    viewEventFilter?: string;
    versionMatcher?: string;
}

export interface MLModelCreated {
    endTime?: number;
    startTime?: number;
    resourceId?: string;
}
