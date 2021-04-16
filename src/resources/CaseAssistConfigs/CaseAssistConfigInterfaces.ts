export enum DocumentSuggestionsStrategies {
    ITD = 'ITD',
}

export enum TypingAidsStrategies {
    StaticValues = 'StaticValues',
    ValuesFromIndex = 'ValuesFromIndex',
}

export enum CaseClassificationStrategies {
    Some = 'Some',
    Axon = 'Axon',
}

export interface CaseAssistConfigListOptions {
    page?: number;
    perPage?: number;
}

export interface ITDConfigurationModel {
    pipeline?: string;
    filter?: string;
    strategy: DocumentSuggestionsStrategies;
}

export interface StaticValuesConfigurationModel {
    values: string[];
    strategy: TypingAidsStrategies;
}

export interface ValuesFromIndexConfigurationModel {
    filter: string;
    field: string;
    strategy: TypingAidsStrategies;
}

export interface FieldToPredict {
    name: string;
}

export interface CaseClassificationSomeConfigurationModel {
    filter?: string;
    fieldsToPredict?: FieldToPredict[];
    strategy: CaseClassificationStrategies;
}

export interface CaseClassificationAxonConfigurationModel {
    modelId: string;
    fieldsToPredict: FieldToPredict[];
    strategy: CaseClassificationStrategies;
}

export type TypingAidsConfigurations = StaticValuesConfigurationModel | ValuesFromIndexConfigurationModel;
export type DocumentSuggestionsConfigurations = ITDConfigurationModel;
export type CaseClassificationConfiguration =
    | CaseClassificationSomeConfigurationModel
    | CaseClassificationAxonConfigurationModel;

export interface CaseAssistConfigModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations;
    typingAidsConfiguration?: TypingAidsConfigurations;
    classificationConfigurations?: CaseClassificationConfiguration[];
}

export interface ContextField {
    value: string;
}

export type ContextFields = Record<string, ContextField>;

export interface SuggestionRequestBody {
    visitorId: string;
    locale: string;
    fields: ContextFields;
}
