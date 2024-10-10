export interface MLListingModel {
    /**
     * The model display name in the Coveo Administration console.
     * @Example `MyModelDisplayName`
     */
    modelDisplayName: string;
    /**
     * The unique identifier of the target machine learning model.
     * @Example `My_Model_ID`
     */
    modelId: string;
    /**
     * The id of the engine.
     * @Example `topclicks`
     */
    engineId: string;
    /**
     * The date and time the model was last updated.
     * @Example `1691762520000`
     */
    estimatedPreviousModelUpdateTime: number;
    /**
     * The date and time the model is scheduled to start its next update.
     * @Example `1691762520000`
     */
    nextModelUpdateTime: number;
    /**
     * Version of the platform.
     * @Example `2`
     */
    platformVersion: 1 | 2;
    /**
     * The model size statistic. Depending on the model type, this value represents the number of items or queries on which the model was built.
     * @Example `5`
     */
    modelSizeStatistic: number;
    readyForAssociation: boolean;
    /**
     * The current status of the model
     */
    modelStatusInfo: MLModelStatusInfo;
    /**
     * The associations related to this model
     *
     */
    modelAssociations: MLModelAssociation[];
}

export interface MLModelStatusInfo {
    /**
     * The status of the model.
     * @Example `ACTIVE`
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
     * @Example `4`
     */
    daysUntilArchival?: number;
}

export interface MLModelAssociation {
    /**
     * The unique identifier of the query pipeline to which the model is associated.
     * @Example `38b08160-d7d4-4626-8e03-53587c23415d`
     */
    parentId: string;
    /**
     * The unique identifier of the model association.
     * @Example `917af358-13fd-4c8e-94af-7cf649bddc48`
     */
    id: string;
    /**
     * The name of the query pipeline or case assist configuration the model is associated with.
     * @Example `association name`
     */
    name: string;
    /**
     * The type of the association.
     * @Example `QUERY_PIPELINE`
     */
    associationType: 'QUERY_PIPELINE' | 'CASE_ASSIST';
}
