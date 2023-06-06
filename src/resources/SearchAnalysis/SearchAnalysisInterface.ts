import {PostSearchBodyQueryParams} from '../Search/SearchInterfaces.js';

/**
 * Define the steps available during a query pipeline execution replay
 */
export type AvailableExecutionStep =
    | 'pipelineSelection'
    | 'paramOverrides'
    | 'thesaurus'
    | 'stopWords'
    | 'filters'
    | 'rankingExpressions'
    | 'featuredResults'
    | 'rankingWeights'
    | 'contentRecommendation'
    | 'productRecommendation'
    | 'art'
    | 'dne'
    | 'triggers'
    | 'indexQuery';

/**
 * Define the mechanism available to select a pipeline when a replay is executed
 */
export type AvailablePipelineSelection =
    | 'AUTHENTICATION_PIPELINE'
    | 'AUTHENTICATION_SEARCH_HUB'
    | 'ML_ROUTING'
    | 'PARAMETER_PIPELINE'
    | 'CONDITION_ROUTING'
    | 'DEFAULT';

/**
 * Define a step during the execution of a query pipeline
 */
export interface ExecutionStep<T extends AvailableExecutionStep> {
    /**
     * The type of the execution step
     */
    type: T;
    /**
     * The human readable name of the execution step
     */
    name: string;
}

/**
 * Define a query pipeline condition
 */
export interface Condition {
    /**
     * The identifier of a condition
     */
    id: string;
}

/**
 * Define which query parameters were affected by a query pipeline execution step
 */
export interface AffectedRequestParameters {
    affectedRequestParameters: Array<{
        name: string;
        value: unknown;
    }>;
}
/**
 * Define which query results were affected by a query pipeline execution step
 */
export interface AffectedResultsPosition {
    affectedResultsPosition: number[];
}

/**
 * Define a statement applied during a query pipeline execution step
 */
export type Applied = {
    /**
     * The ID of the statement applied
     */
    id: string;
    /**
     * The condition associated with a statement
     */
    condition?: Condition;
};

/**
 * Define which rules were applied during a query pipeline execution step
 */
export interface AppliedRules<Affected = Record<string, unknown>, OtherPropertiesApplied = Record<string, unknown>> {
    /**
     * The number of rule applied for a given execution step
     */
    appliedCount: number;
    /**
     * The statements, query parameters and any other properties that affected the result set during the execution of a query pipeline step
     */
    applied: Array<Applied & Affected & OtherPropertiesApplied>;
}

/**
 * Define which query pipeline was selected while replaying a query
 */
export interface SelectedPipelineDefinition {
    /**
     * The ID of the selected pipeline
     */
    id: string;
    /**
     * The human readable name of the selected query pipeline
     */
    name: string;
    /**
     * The condition associated with the selected query pipeline
     */
    condition?: Condition;
}

/**
 * Define the A/B test selection mechanism while replaying a query
 */
export interface PipelineSelectionCauseABTest {
    /**
     * The original selected pipeline
     */
    originalPipeline: SelectedPipelineDefinition;
    /**
     * The targeted pipeline as part of the A/B test
     */
    targetPipeline: SelectedPipelineDefinition;
}

/**
 * Define the cause of a pipeline selection
 */
export interface PipelineSelectionCause {
    /**
     * The pipeline selection cause
     */
    type: AvailablePipelineSelection;
    /**
     * The pipeline A/B test
     */
    abTest?: PipelineSelectionCauseABTest;
}

/**
 * Define the execution step associated with query pipeline selection
 */
export interface QueryPipelineSelection extends ExecutionStep<'pipelineSelection'> {
    /**
     * The selected pipeline
     */
    selectedPipeline: SelectedPipelineDefinition;
    /**
     * The selection cause
     */
    selectionCause: PipelineSelectionCause;
}

/**
 * Define the execution step associated with applying query parameter overrides
 */
export type QueryParamOverrides = ExecutionStep<'paramOverrides'> & AppliedRules<AffectedRequestParameters>;

/**
 * Define the execution step associated with applying thesaurus rules
 */
export type Thesaurus = ExecutionStep<'thesaurus'> & AppliedRules<AffectedRequestParameters>;

/**
 * Define the execution step associated with applying stop words
 */
export type StopWords = ExecutionStep<'stopWords'> & AppliedRules<AffectedRequestParameters>;

/**
 * Define the execution step associated with applying query filters
 */
export type Filters = ExecutionStep<'filters'> & AppliedRules<AffectedRequestParameters>;

/**
 * Define the execution step associated with applying query ranking expressions
 */
export type RankingExpressions = ExecutionStep<'rankingExpressions'> &
    AppliedRules<
        AffectedResultsPosition,
        {
            /**
             * The boost applied by a ranking expression
             */
            boost: number;
        }
    >;

/**
 * Define the execution step associated with applying featured results
 */
export type FeaturedResults = ExecutionStep<'featuredResults'> & AppliedRules<AffectedResultsPosition>;

/**
 * Define the execution step associated with applying ranking weights modifiers
 */
export type RankingWeights = ExecutionStep<'rankingWeights'> & AppliedRules;

/**
 * Define the execution step associated with retrieving content recommendation from an ML model
 */
export type ContentRecommendation = ExecutionStep<'contentRecommendation'> & AppliedRules<AffectedResultsPosition>;

/**
 * Define the execution step associated with retrieving product recommendation from an ML model
 */
export type ProductRecommendation = ExecutionStep<'productRecommendation'> & AppliedRules<AffectedResultsPosition>;

/**
 * Define the execution step associated with applying an Automatic Relevance Tuning ML model
 */
export type AutomaticRelevanceTuning = ExecutionStep<'art'> & AppliedRules<AffectedResultsPosition>;

/**
 * Define the execution step associated with applying an Dynamic Navigation Experience ML Model
 */
export type DynamicNavigationExperience = ExecutionStep<'dne'> & AppliedRules<AffectedResultsPosition>;

/**
 * Define the execution step associated with applying query pipeline triggers
 */
export type Triggers = ExecutionStep<'triggers'> & AppliedRules;

/**
 * Define the execution step associated with the execution of the query in the index.
 */
export interface IndexQuery extends ExecutionStep<'indexQuery'> {
    request: Record<string, unknown>;
}

/**
 * Define a well known map of available pipeline step with their associated content
 */
export type MappedExecutionSteps = {
    [T in AvailableExecutionStep]: T extends 'pipelineSelection'
        ? QueryPipelineSelection
        : T extends 'paramOverrides'
        ? QueryParamOverrides
        : T extends 'thesaurus'
        ? Thesaurus
        : T extends 'stopWords'
        ? StopWords
        : T extends 'filters'
        ? Filters
        : T extends 'rankingExpressions'
        ? RankingExpressions
        : T extends 'featuredResults'
        ? FeaturedResults
        : T extends 'rankingWeights'
        ? RankingWeights
        : T extends 'contentRecommendation'
        ? ContentRecommendation
        : T extends 'productRecommendation'
        ? ProductRecommendation
        : T extends 'art'
        ? AutomaticRelevanceTuning
        : T extends 'dne'
        ? DynamicNavigationExperience
        : T extends 'triggers'
        ? Triggers
        : T extends 'indexQuery'
        ? IndexQuery
        : unknown;
};

/**
 * Define the full query pipeline execution steps flow
 */
export type ExecutionSteps = Array<MappedExecutionSteps[AvailableExecutionStep]>;

/**
 * Define the output of a replay analysis
 */
export interface ReplayAnalysis {
    /**
     * Define the query parameters that were received by the Search API
     */
    requestParameters: PostSearchBodyQueryParams;
    /**
     * Define the full query pipeline execution steps flow
     */
    execution: ExecutionSteps;
    /**
     * Define the number of results returned as part of a replayed query analysis
     */
    totalResultsCount: number;
    /**
     * Define the array of results returned as part of a replayed query analysis
     */
    results: Result[];
}

/**
 * Defines a result coming back from a replayed query analysis
 */
export interface Result {
    /**
     * Title of the result
     */
    title: string;
    /**
     * Ranking information associated with the result
     */
    rankingInfo?: RankingInformation;
    /**
     * Fields associated with the result
     */
    fields: Record<string, string>;
}

/**
 * Define the ranking information associated with a result
 */
export interface RankingInformation {
    /**
     * The total weight applied for that result
     */
    totalWeight: number;
    /**
     * The weights related to the document
     */
    documentWeights: Record<string, number>;
    /**
     * The weights composed of query terms, ranking function and query ranking expression
     */
    weightComposition?: WeightComposition;
}

/**
 * Define the weights composed of query terms, ranking function and query ranking expression
 */
export interface WeightComposition {
    /**
     * Query terms that affected the document position in the result set
     */
    termsWeights?: TermWeight[];
    /**
     * Ranking function that affected the document position in the result set
     */
    rankingFunctions?: RankingExpression[];
    /**
     * Query ranking expressions that affected the document position in the result set
     */
    queryRankingExpressions?: RankingExpression[];
}

/**
 * Define a query term ranking information
 */
export interface TermWeight {
    /**
     * The dictionary of term associated with ranking information
     */
    term: {[keyword: string]: Term};
    /**
     * The weight associated with the term
     */
    weightInfo: Record<string, number>;
}

/**
 * Define a term ranking information
 */
export interface Term {
    /**
     * The correlation score
     */
    correlation: number;
    /**
     * The TFIDF score
     */
    idfScore: number;
}

/**
 * Define a ranking expression
 */
export interface RankingExpression {
    /**
     * The query expression
     */
    expression: string;
    /**
     * The origin of the expression
     */
    origin: string;
    /**
     * The rule of the expression
     */
    rule?: RankingExpressionRule;
    /**
     * The score of the expression
     */
    score: number;
}

/**
 * Define a ranking expression rule
 */
export interface RankingExpressionRule {
    /**
     * The identifier
     */
    id: string;
    /**
     * The type of rule
     */
    type: string;
}
