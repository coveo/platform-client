import {FilterConditions} from '../FilterConditions.js';

export enum Operator {
    Equals = 'EQUALS',
    NotEquals = 'NOT_EQUALS',
}

export type CaseClassificationDocumentRequirementStatus = 'OK' | 'INSUFFICIENT_DOCUMENTS';

export interface DateField {
    /**
     * The field to use as date.
     */
    dateField?: string;
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

export type ExtractionPeriod = DateField & (FixedExtractionPeriod | IntervalExtractionPeriod);

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
     * The names of the sources that contain the cases that the model will use.
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
     * The case creation date range for the cases the model will use.
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
    /**
     * The name of the field that contains the value to use as the language.
     */
    languageField?: string;
}

export interface CaseClassificationDocumentGroupPreviewParams {
    /**
     * The time period for which to extract cases for model building.
     * Must contain an export period or a start time and end time.
     */
    caseExtractionPeriod: ExtractionPeriod;
    /**
     * An array of filtering conditions.
     */
    caseFilterConditions: FilterConditions[];
    /**
     * The name of the field that contains the value to use as the language.
     */
    languageField: string;
    /**
     * The names of the sources that contain the cases that the model will use.
     */
    sources: string[];
}

export interface CaseClassificationDocumentGroupPreview {
    /**
     * The query that was used to fetch document information.
     */
    query: string;
    /**
     * Status indicating whether there are enough candidates for learning.
     */
    documentRequirementStatus: CaseClassificationDocumentRequirementStatus;
    /**
     * The total number of documents in all sources.
     */
    numberOfDocuments: number;
    /**
     * The number of documents matching the configured conditions.
     */
    numberOfDocumentsMatchingConditions: number;
    /**
     * The number of English documents matching the configured conditions.
     */
    numberOfDocumentsMatchingConditionsAndInEnglish: number;
    /**
     * The number of documents that are candidates for learning.
     */
    numberOfValidDocuments: number;
}

export interface CaseClassificationContentFieldsAdvancedMode {
    /**
     * The query to use when building the model.
     */
    advancedQuery: string;
    /**
     * The case creation date range for the cases the model will use.
     */
    caseExtractionPeriod?: never;
    /**
     * An array of filtering conditions.
     */
    caseFilterConditions?: never;
    /**
     * The field value to use as language.
     */
    languageField?: never;
    /**
     * The names of the sources that contain the cases that the model will use.
     */
    sources?: never;
}

export interface CaseClassificationContentFieldsStandardMode {
    /**
     * The case creation date range for the cases the model will use.
     */
    caseExtractionPeriod: ExtractionPeriod;
    /**
     * An array of filtering conditions.
     */
    caseFilterConditions: FilterConditions[];
    /**
     * The field value to use as language.
     */
    languageField: string;
    /**
     * The names of the sources that contain the cases that the model will use.
     */
    sources: string[];
    /**
     * The query to use when building the model.
     */
    advancedQuery?: never;
}

export type CaseClassificationContentFieldsParams =
    | CaseClassificationContentFieldsStandardMode
    | CaseClassificationContentFieldsAdvancedMode;

export interface CaseClassificationContentField {
    name: string;
}

export interface CaseClassificationContentFields {
    fields: CaseClassificationContentField[];
    query: string;
}

interface CaseClassificationFieldCountAdvancedMode {
    /**
     * The query to use when building the model.
     */
    advancedQuery: string;
    /**
     * The names of the sources that contain the cases that the model will use.
     */
    sources?: never;
    /**
     * An array of filtering conditions.
     */
    filterConditions?: never;
    /**
     * The name of the field that contains the value to use as the language.
     */
    languageField?: never;
    /**
     * The case creation date range for the cases the model will use.
     */
    caseExtractionPeriod?: never;
}

interface CaseClassificationFieldCountStandardMode {
    /**
     * The names of the sources that contain the cases that the model will use.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions?: FilterConditions[];
    /**
     * The name of the field that contains the value to use as the language.
     */
    languageField: string;
    /**
     * The case creation date range for the cases the model will use.
     */
    caseExtractionPeriod: ExtractionPeriod;
    /**
     * The query to use when building the model.
     */
    advancedQuery?: never;
}

export type CaseClassificationFieldCountParams =
    | CaseClassificationFieldCountAdvancedMode
    | CaseClassificationFieldCountStandardMode;

export interface FieldValueCount {
    /**
     * The count of values matching a field.
     */
    valueCount: number;
    /**
     * Indicates the presence of more values than the one returned in the count.
     */
    areMoreValuesAvailable: boolean;
}

export interface FieldDocumentCount {
    /**
     * The count of items matching a field.
     */
    documentCount: number;
}
