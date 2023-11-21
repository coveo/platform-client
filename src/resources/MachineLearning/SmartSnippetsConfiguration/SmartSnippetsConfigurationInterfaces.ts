import {DocumentRequirementStatus} from '../DocumentInterfaces.js';
import {FilterConditions} from '../FilterConditions.js';

export interface DocumentType {
    /**
     * The fields containing the content to use for smart snippets.
     */
    contentFields: string[];
    /**
     * The document type.
     */
    documentType: string;
}

export interface SmartSnippetsConfigurationModel {
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
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    /**
     * An array of css selectors to evaluate content to exclude.
     */
    cssSelectorsToExclude?: string[];
    /**
     * The document type for which content is in custom index fields.
     */
    documentTypes?: DocumentType[];
}

export interface SmartSnippetsDocumentGroupPreviewParams {
    /**
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    /**
     * The query that determines the documents to extract
     */
    advancedQuery: string;
}

export interface SmartSnippetsDocumentGroupPreview {
    /**
     * The query that was used to fetch document information.
     *
     * @Example @source==("Salesforce Notifier")
     */
    query: string;
    /**
     * @Deprecated use `numberOfDocumentsInSources` instead
     */
    numberOfDocuments: number;
    /**
     * The total number of documents in the selected sources.
     */
    numberOfDocumentsInSources: number;
    /**
     * The number of documents that are candidates for learning.
     */
    numberOfValidDocuments: number;
    /**
     * @Deprecated use `numberOfDocumentsInSourcesMatchingFilters` instead
     */
    numberOfDocumentsMatchingConditions: number;
    /**
     * The number of documents in the selected sources that match the conditions.
     */
    numberOfDocumentsInSourcesMatchingFilters: number;
    /**
     * @Deprecated use `numberOfDocumentsInSourcesMatchingFiltersWithPermanentId` instead
     */
    numberOfDocumentsWithPermanentId: number;
    /**
     * The number of documents in the selected sources that match the conditions and have a permanentid
     */
    numberOfDocumentsInSourcesMatchingFiltersWithPermanentId: number;
    /**
     * Status for the number of required documents to build the model.
     *
     * @Example OK
     */
    documentRequirementStatus: DocumentRequirementStatus;
}

export interface SmartSnippetsContentFieldsParams {
    /**
     * The type of documents to target.
     */
    documentType: string;
    /**
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    /**
     * The query that determines the documents to extract
     */
    advancedQuery: string;
}

export interface SmartSnippetsContentField {
    /**
     * The name of the field.
     */
    name: string;
}

export interface SmartSnippetsContentFields {
    /**
     * The query that was used to fetch document information.
     */
    query: string;
    /**
     * The list of fields that are non-empty for at least one document.
     */
    fields: SmartSnippetsContentField[];
}

export interface SmartSnippetsDocumentTypesParams {
    /**
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    /**
     * The query that determines the documents to extract
     */
    advancedQuery: string;
}

export interface SmartSnippetsDocumentType {
    /**
     * The document type.
     */
    documentType: string;
}

export interface SmartSnippetsDocumentTypes {
    /**
     * The query that was used to fetch document information.
     */
    query: string;
    /**
     * The document types in all sources.
     */
    documentTypes: SmartSnippetsDocumentType[];
}
