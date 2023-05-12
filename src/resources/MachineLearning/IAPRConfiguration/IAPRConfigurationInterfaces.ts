import {IntervalUnit} from '../../Enums.js';

export interface IAPRConfigurationModel {
    /**
     * The id of the engine
     */
    engineId: string;
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
     * The additional configuration that can be passed to the model.
     */
    extraConfig: {
        catalogId: string;
        [key: string]: any;
    };
}
