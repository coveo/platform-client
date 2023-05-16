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
}
