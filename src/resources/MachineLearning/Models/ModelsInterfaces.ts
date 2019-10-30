import {IdAndDisplayNameModel} from '../../BaseInterfaces';
import {MLModelInfo} from '../ModelInformation/ModelInformationInterfaces';

export interface MLModel extends MLModelInfo {
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
    customer_errors?: CustomerError[];
}

export interface CustomerError {
    description?: string;
    errorCode?: string;
    errorType?: string;
    precision?: string;
    troubleshoot?: string;
}
