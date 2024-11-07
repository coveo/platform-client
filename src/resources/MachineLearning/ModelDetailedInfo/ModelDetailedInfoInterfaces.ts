import {MLModelStatus} from '../MachineLearningInterfaces.js';
import {ModelDetails} from './details/ModelDetails.js';

export interface ModelAssociation {
    /**
     * The unique identifier of the query pipeline to which the model is associated.
     * @example 38b08160-d7d4-4626-8e03-53587c23415d
     */
    parentId: string;
    /**
     * The unique identifier of the model association.
     * @example 917af358-13fd-4c8e-94af-7cf649bddc48
     */
    id: string;
    /**
     * The name of the query pipeline or case assist configuration the model is associated with.
     * @example association name
     */
    name: string;
    /**
     * The type of the association.
     * @example QUERY_PIPELINE
     */
    associationType: 'QUERY_PIPELINE' | 'CASE_ASSIST';
}

export interface ModelIssues {
    /**
     * A description of an error or limitation present in the model.
     */
    description: string;
    /**
     * The recommended action to perform to resolve the error or limitation.
     */
    troubleshoot: string;
}

export interface ModelStatusInfo {
    /**
     * The status of the model.
     * @example ACTIVE
     */
    modelStatus: MLModelStatus;
    /**
     * The remaining days until the model is archived.
     * @example 2
     */
    daysUntilArchival: number;
}

export interface ModelWithDetails {
    /**
     * The id of the engine.
     * @Example topclicks
     */
    engineId: string;
    /**
     * The unique identifier of the target machine learning model.
     * @example My_Model_ID
     */
    modelId: string;
    /**
     * The name of the model configuration.
     * @example My model
     */
    modelDisplayName: string;
    /**
     * The associations related to this model.
     * @example [{
     *    "parentId": "38b08160-d7d4-4626-8e03-53587c23415d",
     *    "id": "917af358-13fd-4c8e-94af-7cf649bddc48",
     *    "name": "test pipeline",
     *    "associationType": "QUERY_PIPELINE"
     * }]
     */
    modelAssociations: ModelAssociation[];
    /**
     * The date and time the model was last updated.
     * @example 1691762520000
     */
    estimatedPreviousModelUpdateTime: number;
    /**
     * The date and time the model is scheduled to start its next update.
     * @example 1691762520000
     */
    nextModelUpdateTime: number;
    /**
     * The description and troubleshooting messages for a model error or limitation.
     */
    modelIssues: ModelIssues[];
    /**
     * The detailed information about the model.
     */
    modelDetails?: ModelDetails;
    /**
     * The current status of the model.
     */
    modelStatusInfo: ModelStatusInfo;
    /**
     * Specifies whether the model must be associated with a query pipeline to be effective.
     */
    requiresAssociation: boolean;
}
