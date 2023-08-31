export interface MLModelInfo<T extends MLModelTypeInfo = never> {
    id: string;
    info?: T;
}

export type MLModelTypeInfo =
    | ModelInformationART
    | ModelInformationCC
    | ModelInformationDNE
    | ModelInformationER
    | ModelInformationPR
    | ModelInformationQS
    | ModelInformationSmartSnippets;

export interface MetaInfo {
    modelName: string;
    version: string;
    environment: string;
    org: string;
    modelVersion: string;
    createdDate: string;
}

export interface ModelInformationART {
    metaInfo: MetaInfo;
    modelBuildingStats: {
        searchEventCount: number;
        clickEventCount: number;
        customEventCount: number;
        segmentedVisitsCount: number;
    };
    totalQueries: number;
    wordSelectionModels: Record<string, Record<string, number>>;
    candidateExamples: Record<string, string[]>;
    languages: {
        [languageKey: string]: {
            contextKeysToDocuments: any;
            queries: number;
            documents: number;
            filters: any;
            words: number;
            stopwords: number;
            docPerFilters: Record<string, number>;
            [otherKeys: string]: any;
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
        clicksDecayParams: Record<string, number>;
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
    metaInfo: MetaInfo;
}

export interface ModelInformationER {
    indicatorsModifier: Record<string, number>;
    deprecatedUrlToFieldValueSize: number;
    /**
     * The sample of the top queries for which the model could recommend items for each listed context key.
     *
     * Consider using `contextCandidateExamples` which provides the same data but not prefixed with
     * `c_context` and no `visit` suffix
     */
    candidateExamples: Record<string, string[]>;
    /**
     * The sample of the top queries for which the model could recommend items for each listed context key.
     */
    contextCandidateExamples: Record<string, string[]>;
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
    metaInfo: MetaInfo;
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
    eventGroupsFields: Record<string, string[]>;
    primaryEventName: string;
    'Recommendations per language: ': Record<string, number>;
    featureSelectLog: FeatureSelectLog;
    [key: string]: any;
}

export interface ModelInformationPR {
    metaInfo: MetaInfo;
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
    candidateExamples: Record<string, string[]>;
    languages: string[];
    minClickCountByLang: Record<string, number>;
    userClusterMap: number;
    candidatesPerLanguages: Record<string, number>;
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
    metaInfo: MetaInfo;
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
    candidatesPerFilters: Record<string, number>;
    topCooccurrencesExamples: Record<string, string[]>;
    stopwords: Record<string, number>;
    featureSelectLog: FeatureSelectLog;
    [key: string]: any;
}

export interface MetaInfoSmartSnippets extends MetaInfo {
    modelId: string;
    engineName: string;
    modelSize: string;
}

/**
 * Snippet details per document
 */
export interface SnippetsPerDocument {
    min: number;
    max: number;
    mean: number;
}

export interface StatsSmartSnippets {
    /**
     * Total number of valid documents
     */
    documentCount: number;

    /**
     * Number of documents with duplicated ID
     */
    documentWithDuplicatedIdCount: number;

    /**
     * Number of invalid HTML documents
     */
    invalidHtmlDocumentCount: number;

    /**
     * Number of documents with snippets
     */
    documentWithSnippetCount: number;

    /**
     * Number of documents without permanent ID
     */
    documentWithoutIdCount: number;

    /**
     * Ratio of documents with at least 1 snippet / total valid documents
     */
    documentWithSnippetRatio: number;

    /**
     * Number of available snippets
     */
    snippetCount: number;

    /**
     * Snippets stats per document
     */
    snippetsPerDocument: SnippetsPerDocument;
}

export interface BuildingStatsSmartSnippets extends StatsSmartSnippets {
    /**
     * Number of documents with HTML headers
     */
    headerCount: number;

    /**
     * Average number of words per snippet
     */
    meanSnippetLength: number;

    /**
     * Additional stats related to each source
     */
    statsPerSource: StatsPerSource[];
}

export interface StatsPerSource extends StatsSmartSnippets {
    /**
     * Name of the source
     */
    sourceName: string;
}

export interface ModelInformationSmartSnippets {
    metaInfo: MetaInfoSmartSnippets;
    modelBuildingStats: BuildingStatsSmartSnippets;
}

export interface DatasetFieldDetails {
    numSamples: number;
    labelsDistribution: Record<string, number>;
}

export interface DatasetDetails {
    numRows: number;
    dataDetails: Record<string, DatasetFieldDetails>;
}

export interface FacetPerformanceDetails {
    hit1: number;
    hit3: number;
}

export interface HyperParameterDetails {
    learningRate: number;
    warmUp: number;
}

export interface FacetDetails {
    facetLabels: Record<string, string[]>;
    defaultFacets: Partial<Record<string, string>>;
    facetDisregardedLabels: Record<string, string[]>;
}

export interface PreparationConfigCC {
    caseIdColumn: string;
    facetFields: string[];
    contextFields: string[];
    minLen: number;
    maxLen: number;
    maxPortionDisregarded: number;
    condensationMapPath?: string;
    testPortion: number;
}

export interface MetaInfoCC extends MetaInfo {
    modelId: string;
    engineName: string;
    modelSize: string;
}

export interface PreparationDetailsCC {
    preparationConfig: PreparationConfigCC;
    facetsDetails: FacetDetails;
    trainDatasetsDetails: DatasetDetails;
    testDatasetsDetails: DatasetDetails;
}

export interface TrainingDetailsCC {
    performanceDetails: Record<string, FacetPerformanceDetails>;
    hyperParameterDetails: HyperParameterDetails;
}

export interface ModelInformationCC {
    metaInfo: MetaInfoCC;
    preparationDetails: PreparationDetailsCC;
    trainingDetails: TrainingDetailsCC;
}
