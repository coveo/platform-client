export enum DocumentSuggestionsStrategies {
    ITD = 'ITD',
}

export enum TypingAidsStrategies {
    StaticValues = 'StaticValues',
    ValuesFromIndex = 'ValuesFromIndex',
}

export interface CaseAssistConfigListOptions {
    page?: number;
    pageSize?: number;
}

export interface ITDConfigurationModel {
    pipeline?: string;
    fieldsToFeed: string[];
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

export type TypingAidsConfigurations = StaticValuesConfigurationModel | ValuesFromIndexConfigurationModel;
export type DocumentSuggestionsConfigurations = ITDConfigurationModel;

export interface CaseAssistConfigModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations;
    typingAidsConfiguration?: TypingAidsConfigurations;
}
