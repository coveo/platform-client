import {ConditionModel} from '../../Pipelines/index.js';
import {MLModelStatus} from '../MachineLearningInterfaces.js';

export interface ModelAssociationsListParams {
    /*
     * The 0-based number of the page of results to list. Default: 0
     */
    page: number;
    /*
     * The maximum number of results to include per page.. Default: 100
     */
    pageSize: number;
}
export interface AssociationItem {
    associationId: string;
    modelId: string;
    engineId?: string;
    modelDisplayName?: string;
    modelStatusInfo?: {
        modelStatus: MLModelStatus;
    };
    condition?: ConditionModel;
    position: number;
    useAdvancedConfiguration?: boolean;
    customQueryParameters?: {submodel: string};
}
