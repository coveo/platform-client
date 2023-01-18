import {GranularResource} from '../../BaseInterfaces.js';
import {IntervalUnit, ModelActivenessState, ModelStatus} from '../../Enums.js';
import {AssociatedPipelineModel} from '../../Pipelines/index.js';
import {MLModelInfo, MLModelTypeInfo} from '../ModelInformation/index.js';

export interface MLModel<T extends MLModelTypeInfo = never> extends MLModelInfo<T>, ModelAttributes, GranularResource {
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
    extraConfig?: {
        [key: string]: any;
    };
    commonFilter?: string;
    customEventFilter?: string;
    searchEventFilter?: string;
    viewEventFilter?: string;
    modelSizeStatistic?: number;
    modelActivenessState?: ModelActivenessState;
    daysUntilArchival?: number;
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
