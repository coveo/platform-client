export enum DocumentSuggestionsStrategies {
    ITD = 'ITD',
}

export enum TypingAidsStrategies {
    StaticValues = 'StaticValues',
    ValuesFromIndex = 'ValuesFromIndex',
}

export enum CaseClassificationStrategies {
    Some = 'Some',
}

export interface CaseAssistConfigListOptions {
    page?: number;
    pageSize?: number;
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

export type TypingAidsConfigurations = StaticValuesConfigurationModel | ValuesFromIndexConfigurationModel;
export type DocumentSuggestionsConfigurations = ITDConfigurationModel;
export type CaseClassificationConfigurations = CaseClassificationSomeConfigurationModel;

export interface CaseAssistConfigModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations;
    typingAidsConfiguration?: TypingAidsConfigurations;
    classificationConfigurations?: CaseClassificationConfigurations[];
}
