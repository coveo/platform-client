import {ConditionModel} from '../../Pipelines/index.js';
import {MLModelStatusInfo} from '../MachineLearningInterfaces.js';

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
    /**
     * The unique identifier of the model association.
     */
    associationId: string;
    /**
     * The unique identifier of the target machine learning model.
     */
    modelId: string;
    /**
     * The id of the engine.
     */
    engineId?: string;
    /**
     * The name of the model configuration.
     */
    modelDisplayName?: string;
    /**
     * The current status of the model.
     * @example { modelStatus: "BUILDING", daysUntilArchival : 3 }
     */
    modelStatusInfo?: MLModelStatusInfo;
    /**
     * The condition that must be met to trigger the model association.
     */
    condition?: ConditionModel;
    /**
     * The position at which this model association is evaluated in the query pipeline, relative to other model associations.
     */
    position: number;
    /**
     * Whether the Coveo Administration Console should show the advanced configuration for this association.
     */
    useAdvancedConfiguration?: boolean;
    /**
     * The additional parameters to send to Coveo ML.
     */
    customQueryParameters?: {submodel?: string; strategy?: string};
}
