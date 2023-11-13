export interface IAPRConfigurationModel {
    /**
     * The unique identifier of the catalog to be used by the model to infer
     * personalized suggestions based on product vectors.
     */
    catalogId: string;
    /**
     * The model display name in the Coveo Administration console.
     */
    modelDisplayName: string;
    /**
     * The trackingIds that usage analytics events must contain for the model to use those events in its learning process. The model will use an event if it contains at least one of the specified IDs
     *
     * @Example: [ "sport" ]
     */
    trackingIds: string[];
}
