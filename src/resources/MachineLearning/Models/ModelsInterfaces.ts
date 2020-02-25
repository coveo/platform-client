import {GranularResource} from '../../BaseInterfaces';
import {IntervalUnit, ModelStatus} from '../../Enums';
import {AssociatedPipelineModel} from '../../Pipelines';
import {MLModelInfo} from '../ModelInformation/ModelInformationInterfaces';

export interface MLModel extends MLModelInfo, ModelAttributes, GranularResource {
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
    modelErrorDescription?: ModelErrorDescription;
    previousModelUpdateTime?: number;
    intervalTime: number;
    intervalUnit: IntervalUnit;
    exportPeriod: string;
    exportOffset?: string;
    status: ModelStatus;
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

export interface ModelAttributes {
    associatedPipelines?: AssociatedPipelineModel[];
    parsedExportOffset?: string;
    parsedExportPeriod?: string;
}
