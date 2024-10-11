import {IntervalUnit} from '../../Enums.js';

export interface PQSConfigurationModel {
    /**
     * The unique identifier of the catalog to be used by the model to infer
     * personalized suggestions based on product vectors.
     */
    catalogId: string;
    /**
     * The filter to apply to the 'Common' event dimensions (shared by all event types)
     * of the UA data to learn from when rebuilding the model.
     */
    commonFilter?: string;
    /**
     * The period of UA data to learn from when rebuilding the model.
     * The exportPeriod uses the moment when the model was last generated as a base.
     * Must be in the ISO8601 period format (i.e., PyYmMwWdDThHmMsS).
     */
    exportPeriod?: string;
    /**
     * The number of intervalUnit to wait between each rebuild of the model.
     * Must be greater than or equal to 1.
     */
    intervalTime?: number;
    /**
     * The duration unit to use when interpreting the rebuild intervalTime for the model.
     */
    intervalUnit?: IntervalUnit;
    /**
     * The model display name in the Coveo Administration console.
     */
    modelDisplayName: string;
    /**
     * The unique identifier of the target machine learning model.
     */
    modelId?: string;
    /**
     * The filter to apply to the 'Click' and 'Search' event dimensions of the UA data to learn from when rebuilding the model.
     */
    searchEventFilter?: string;
    /**
     * The trackingIds that usage analytics events must contain for the model to use those events in its learning process. The model will use an event if it contains at least one of the specified IDs
     * @Example: [ "sport" ]
     */
    trackingIds: string[];
}
