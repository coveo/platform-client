import {CaseAssistConfigModel} from './CaseAssistConfigInterfaces';

export interface Document {
    title: string;
    clickUri: string;
    excerpt: string;
    fields: any;
}

export interface DocumentSuggestions {
    documents: Document[];
    responseId: string;
    totalCount: number;
}

export interface FieldValueSuggestion {
    predictions: Array<{
        value: string;
        confidence: number;
    }>;
}

export interface CaseClassifications {
    fields: Record<string, FieldValueSuggestion>;
    responseId: string;
}

export interface ContextFields {
    [key: string]: {
        value: string;
    };
}

export interface PreviewRequestBody {
    visitorId: string;
    locale: string;
    fields: ContextFields;
    configuration: Partial<CaseAssistConfigModel>;
}
