export enum Operator {
    Equals = 'EQUALS',
    NotEquals = 'NOT_EQUALS',
}

export interface FilterConditions {
    /**
     * The name of the field.
     * Example: status
     */
    field: string;
    /**
     * The operator to use to evaluate the condition.
     * Must be EQUALS or NOT_EQUALS
     */
    operator: Operator;
    /**
     * The value to use for the condition.
     * Example: completed
     */
    value: string;
}

export type ExtractionPeriod = FixedExtractionPeriod | IntervalExtractionPeriod;

export interface CaseClassificationConfigurationModel {
    /**
     * The unique ID of the model.
     */
    modelId: string;
    /**
     * The model name to display.
     * Example: My First Model
     */
    modelDisplayName: string;
    /**
     * The names of the sources containing the cases to use for model building.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    caseFilterConditions?: FilterConditions[];
    /**
     * The field containing the case ID
     * Example: sfid
     */
    caseIdField: string;
    /**
     * The time period for which to extract cases for model building.
     * Must contain an export period or a start time and end time.
     */
    caseExtractionPeriod?: ExtractionPeriod;
    /**
     * The case fields to use for model training.
     * Example: [subject, reason, category]
     */
    fieldsForModelTraining: string[];
    /**
     * The case fields the model should predict.
     * Example: [subject, reason, category]
     */
    fieldsToPredict: string[];
}

export interface FixedExtractionPeriod {
    /**
     * Date in milliseconds that indicates the beginning of the time interval to include cases.
     * The date format is the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.
     */
    startTime: number;
    /**
     * Date in milliseconds that indicates the end of the time interval to include cases.
     * The date format is the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.
     */
    endTime: number;
}

export interface IntervalExtractionPeriod {
    /**
     * The period to export data from. The exportPeriod uses the moment when the model was generated as a base.
     * Must be in the ISO8601 period format (i.e., PyYmMwWdDThHmMsS).
     * Example: P3Y6M4DT12H30M5S Represents a duration of three years, six months, four days, twelve hours, thirty minutes, and five seconds.
     */
    exportPeriod: string;
}