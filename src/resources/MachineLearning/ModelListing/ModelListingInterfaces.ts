export interface MLListingModel {
    /**
     * The model display name in the Coveo Administration console.
     */
    modelDisplayName: string;
    /**
     * The unique identifier of the target machine learning model.
     */
    modelId: string;
    /**
     * The id of the engine.
     */
    engineId: string;
    /**
     * The date and time the model was last updated.
     **/
    estimatedPreviousModelUpdateTime: number;
    /**
     * The date and time the model is scheduled to start its next update.
     */
    nextModelUpdateTime: number;
    /**
     * Version of the platform.
     */
    platformVersion: 1 | 2;
    /**
     * The model size statistic. Depending on the model type, this value represents the number of items or queries on which the model was built.
     */
    modelSizeStatistic: number;
    readyForAssociation: boolean;
    /**
     * The current status of the model
     */
    modelStatusInfo: MLModelStatusInfo;
    /**
     * The associations related to this model
     */
    modelAssociations: MLModelAssociation[];
}

export interface MLModelStatusInfo {
    /**
     * The status of the model.
     */
    modelStatus:
        | 'ARCHIVED'
        | 'SOON_TO_BE_ARCHIVED'
        | 'BUILD_IN_PROGRESS'
        | 'ERROR'
        | 'ERROR_INTERNAL'
        | 'LIMITED'
        | 'NOT_ASSOCIATED'
        | 'ACTIVE'
        | 'INACTIVE';
    /**
     * The remaining days until the model is archived.
     */
    daysUntilArchival?: number;
}

export interface MLModelAssociation {
    /**
     * The unique identifier of the query pipeline to which the model is associated.
     */
    parentId: string;
    /**
     * The unique identifier of the model association.
     */
    id: string;
    /**
     * The name of the query pipeline or case assist configuration the model is associated with.
     */
    name: string;
    /**
     * The type of the association.
     */
    associationType: 'QUERY_PIPELINE' | 'CASE_ASSIST';
}
