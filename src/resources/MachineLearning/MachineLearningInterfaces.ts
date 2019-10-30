import {IdAndDisplayNameModel} from '../BaseInterfaces';
import {MLModel} from './Models/ModelsInterfaces';

export interface RegistrationModel {
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

export interface MLModelCreated extends MLModel {
    endTime?: number;
    startTime?: number;
    resourceId?: string;
}
