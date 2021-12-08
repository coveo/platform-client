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
    sources: string[];
}

export interface SmartSnippetsDocumentGroupPreview {
    query: string;
    documentRequirementStatus: DocumentRequirementStatus;
    numberOfDocuments: number;
    numberOfDocumentsWithPermanentId: number;
    numberOfValidDocuments: number;
}

export interface SmartSnippetsContentFieldsParams {
    documentType: string;
    sources: string[];
}

export interface SmartSnippetsContentField {
    name: string;
}

export interface SmartSnippetsContentFields {
    query: string;
    fields: SmartSnippetsContentField[];
}

export interface SmartSnippetsDocumentTypesParams {
    sources: string[];
}

export interface SmartSnippetsDocumentType {
    documentType: string;
}

export interface SmartSnippetsDocumentTypes {
    query: string;
    documentTypes: SmartSnippetsDocumentType[];
}
