import {New} from '../BaseInterfaces';
import {CaseAssistConfigModel} from './CaseAssistConfigInterfaces';

export interface Document {
    title: string;
    clickUri: string;
    excerpt: string;
    fields: Record<string, number | string>;
}

export interface DocumentSuggestions {
    documents: Document[];
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
}

export interface ContextField {
    value: string;
}

export interface ContextFields {
    [key: string]: ContextField;
}

export interface PreviewRequestBody {
    visitorId: string;
    locale: string;
    fields: ContextFields;
    configuration: New<CaseAssistConfigModel>;
}
