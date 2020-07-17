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

interface ITDConfigurationModel {
    pipeline?: string;
    fieldsToFeed: string[];
    filter?: string;
    strategy: DocumentSuggestionsStrategies;
}

interface StaticValuesConfigurationModel {
    values: string[];
    strategy: TypingAidsStrategies;
}

interface ValuesFromIndexConfigurationModel {
    filter: string;
    field: string;
    strategy: TypingAidsStrategies;
}

type TypingAidsConfigurations = StaticValuesConfigurationModel | ValuesFromIndexConfigurationModel;
type DocumentSuggestionsConfigurations = ITDConfigurationModel;

export interface CaseAssistConfigModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations;
    typingAidsConfiguration?: TypingAidsConfigurations;
}
