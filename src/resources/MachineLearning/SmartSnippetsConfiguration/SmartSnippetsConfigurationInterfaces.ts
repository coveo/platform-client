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
     * The names of the sources containing the content to use for model building.
     */
    sources: string[];
    /**
     * An array of css selectors to evaluate content to exclude.
     */
    cssSelectorsToExclude?: string[];
    /**
     * The document type for which content is in custom index fields.
     */
    documentTypes?: DocumentType[];
}

export type DocumentRequirementStatus = 'OK' | 'INSUFFICIENT_DOCUMENTS';

export interface SmartSnippetsDocumentGroupPreviewParams {
    /**
     * The sources to consider.
     */
    sources: string[];
}

export interface SmartSnippetsDocumentGroupPreview {
    /**
     * The query that was used to fetch document information.
     */
    query: string;
    /**
     * Status indicating whether there are enough candidates for learning.
     */
    documentRequirementStatus: DocumentRequirementStatus;
    /**
     * The total number of documents in all sources.
     */
    numberOfDocuments: number;
    /**
     * The number of documents that have a permanent id.
     */
    numberOfDocumentsWithPermanentId: number;
    /**
     * The number of documents that are candidates for learning.
     */
    numberOfValidDocuments: number;
}

export interface SmartSnippetsContentFieldsParams {
    /**
     * The type of documents to target.
     */
    documentType: string;
    /**
     * The names of the sources to consider.
     */
    sources: string[];
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
     * The sources to use to consider.
     */
    sources: string[];
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
