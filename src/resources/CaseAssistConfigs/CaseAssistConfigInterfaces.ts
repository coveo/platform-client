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
    filter?: string;
}

interface DocumentSuggestionsConfigurations {
    ITD: {
        pipeline?: string;
        fieldsToFeed: string[];
        filter?: string;
        strategy: DocumentSuggestionsStrategies;
    };
}

interface TypingAidsConfigurations {
    StaticValues: {
        values: string[];
        strategy: TypingAidsStrategies;
    };
    ValuesFromIndex: {
        filter: string;
        field: string;
        strategy: TypingAidsStrategies;
    };
}

export interface CaseAssistConfigModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations[DocumentSuggestionsStrategies.ITD];
    typingAidsConfiguration?:
        | TypingAidsConfigurations[TypingAidsStrategies.StaticValues]
        | TypingAidsConfigurations[TypingAidsStrategies.ValuesFromIndex];
}
