import CaseAssist from './CaseAssist';

export enum DocumentSuggestionsStrategies {
    ITD = 'ITD',
}

export enum TypingAidsStrategies {
    StaticValues = 'StaticValues',
    ValuesFromIndex = 'ValuesFromIndex',
}

export interface CaseAssistListOptions {
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

export interface CaseAssistModel {
    id: string;
    name: string;
    documentSuggestionConfiguration?: DocumentSuggestionsConfigurations['ITD'];
    typingAidsConfiguration?: TypingAidsConfigurations['StaticValues'] | TypingAidsConfigurations['ValuesFromIndex'];
}
