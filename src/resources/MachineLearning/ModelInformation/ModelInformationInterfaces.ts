import {KeyValue} from '../../BaseInterfaces';

export interface MLModelInfo {
    id: string;
    info?: ModelInformationART | ModelInformationDNE | ModelInformationER | ModelInformationPR | ModelInformationQS;
}

export interface ModelInformationART {
    metaInfo: {
        modelName: string;
        version: string;
        environment: string;
        org: string;
        modelVersion: string;
        createdDate: string;
    };
    modelBuildingStats: {
        searchEventCount: number;
        clickEventCount: number;
        customEventCount: number;
        segmentedVisitsCount: number;
    };
    totalQueries: number;
    wordSelectionModels: KeyValue<KeyValue<number>>;
    candidateExamples: KeyValue<string[]>;
    languages: {
        [languageKey: string]: {
            contextKeysToDocuments: any;
            queries: number;
            documents: number;
            filters: any;
            words: number;
            stopwords: number;
            [otherKeys: string]: number;
        };
    };
    contentIDKeys: string[];
    params: {
        version: string;
        maxBins: number;
        topClicksTakeBins: number[];
        topClicksMultBins: number[];
        intersectMultBins: number[];
        originalMultBins: number[];
        stemmedMultBins: number[];
        userContextMultBins: number[];
        subqueryMultBins: number[];
        subqueryLenThr: number;
        clicksDecayParams: KeyValue<number>;
    };
    featureSelectLog: FeatureSelectLog;
    [key: string]: any;
}

export interface FeatureSelectLog {
    [contextKey: string]: {
        eventType: {name: string};
        statusMessage: string;
    };
}

export interface ModelInformationDNE {
    modelBuildingStats: {
        visitsCount: number;
        totalQueries: number;
        searchEventCount: number;
        clickEventCount: number;
        facetSelectEventCount: number;
    };
    params: {
        version: string;
    };
    totalQueries: number;
    contentIDKeys?: string[];
    languages: {
        [languageKey: string]: {
            topFacets: string[];
            docPerFilters: Record<string, number>;
            queries: number;
        };
    };
    metaInfo: {
        modelName: string;
        version: string;
        environment: string;
        org: string;
        modelVersion: string;
        createdDate: string;
    };
}

export interface ModelInformationER {
    indicatorsModifier: KeyValue<number>;
    deprecatedUrlToFieldValueSize: number;
    candidateExamples: KeyValue<string[]>;
    primaryIdToValue: number;
    eventGroups: string[];
    primaryEventType: string;
    params: {
        languages: string[];
        eventConfigs: any;
        eventsToCombineMapping: any;
        normalizeUrl: any;
        querySplit: {
            maxNgram: number;
            keepOrigQuery: boolean;
            keepStemQuery: boolean;
            keepOrigNGramQuery: boolean;
            keepStemNGramQuery: boolean;
        };
    };
    contentIDKeys: string[];
    primaryEventGroupName: string;
    eventGroupValuesExamplesInHistory: any;
    indicatorsMap: any;
    metaInfo: {
        modelName: string;
        version: string;
        environment: string;
        org: string;
        modelVersion: string;
        createdDate: string;
    };
    modelBuildingStats: {
        viewCount: number;
        PageViewCount: number;
        Query_stem1Count: number;
        searchCount: number;
        Query_stemCount: number;
        clickCount: number;
        [key: string]: number;
    };
    'Possible recommendations: ': number;
    eventGroupsFields: KeyValue<string[]>;
    primaryEventName: string;
    'Recommendations per language: ': KeyValue<number>;
    [key: string]: any;
}

export interface ModelInformationPR {
    metaInfo: {
        createdDate: string;
        environment: string;
        modelName: string;
        modelVersion: string;
        org: string;
        version: string;
    };

    itemBasedNamesAndNumOfRecordedItems: any;
    itemBasedNamesWithCandidateItems: any;
    numOfEventsPerEventType: any;
    userBasedCandidates: any;
    userBasedNumOfItems: any;
    userBasedNumOfUsers: any;

    contentIDKeys: string[];
    parentIDKeys: [];

    modelBuildingStats?: any;
    languages?: any;
}

export interface ModelInformationQS {
    numContextValues: number;
    lastQueriesPerUser: number;
    userContextPrefix: string;
    knownPartialsWithSuggestions: number;
    candidateExamples: KeyValue<string[]>;
    languages: string[];
    minClickCountByLang: KeyValue<number>;
    userClusterMap: number;
    candidatesPerLanguages: KeyValue<number>;
    filterFields: string[];
    params: {
        version: string;
        contextBoost: number;
        cooccurrenceBoost: number;
        userClusterBoost: number;
        partialQueryBoost: number;
    };
    candidates: number;
    numUserClusters: number;
    metaInfo: {
        modelName: string;
        version: string;
        environment: string;
        org: string;
        modelVersion: string;
        createdDate: string;
    };
    modelBuildingStats: {
        searchEventCount: number;
        clickEventCount: number;
        filteredSearches: number;
        customEventCount: number;
    };
    minCandWithContextBoost: number;
    topCooccurrences: number;
    ratioCandWithContextBoost: number;
    userContextFields: string[];
    maxQueryLength: number;
    candidatesPerFilters: KeyValue<number>;
    topCooccurrencesExamples: KeyValue<string[]>;
    stopwords: KeyValue<number>;
    [key: string]: any;
}
