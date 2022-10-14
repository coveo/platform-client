import {PostSearchBodyQueryParams} from '../Search/SearchInterfaces';
declare type RequestParameters = PostSearchBodyQueryParams;
interface Result {
    title: string;
    rankingInfo: unknown;
    fields: Record<string, string>;
}

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

export type AvailablePipelineSelection =
    | 'AUTHENTICATION_PIPELINE'
    | 'AUTHENTICATION_SEARCH_HUB'
    | 'ML_ROUTING'
    | 'PARAMETER_PIPELINE'
    | 'CONDITION_ROUTING'
    | 'DEFAULT';

export interface ExecutionStep<T extends AvailableExecutionStep> {
    type: T;
    name: string;
}
export interface Condition {
    id: string;
}
export interface AffectedRequestParameters {
    affectedRequestParameters: Array<{
        name: string;
        value: unknown;
    }>;
}
export interface AffectedResultsPosition {
    affectedResultsPosition: number[];
}

export type Applied = {id: string; condition?: Condition};

export interface AppliedRules<Affected = Record<string, unknown>, OtherPropertiesApplied = Record<string, unknown>> {
    appliedCount: number;
    applied: Array<Applied & Affected & OtherPropertiesApplied>;
}

export interface SelectedPipelineDefinition {
    id: string;
    name: string;
    condition?: Condition;
}

export interface PipelineSelectionCauseABTest {
    originalPipeline: {
        id: string;
        name: string;
        condition?: Condition;
    };
    targetPipeline: {
        id: string;
        name: string;
        condition?: Condition;
    };
}

export interface PipelineSelectionCause {
    type: AvailablePipelineSelection;
    abTest?: PipelineSelectionCauseABTest;
}

export interface QueryPipelineSelection extends ExecutionStep<'pipelineSelection'> {
    selectedPipeline: SelectedPipelineDefinition;
    selectionCause: PipelineSelectionCause;
}

export type QueryParamOverrides = ExecutionStep<'paramOverrides'> & AppliedRules<AffectedRequestParameters>;

export type Thesaurus = ExecutionStep<'thesaurus'> & AppliedRules<AffectedRequestParameters>;

export type StopWords = ExecutionStep<'stopWords'> & AppliedRules<AffectedRequestParameters>;

export type Filters = ExecutionStep<'filters'> & AppliedRules<AffectedRequestParameters>;
export type RankingExpressions = ExecutionStep<'rankingExpressions'> &
    AppliedRules<
        AffectedResultsPosition,
        {
            boost: number;
        }
    >;

export type FeaturedResults = ExecutionStep<'featuredResults'> & AppliedRules<AffectedResultsPosition>;

export type RankingWeights = ExecutionStep<'rankingWeights'> & AppliedRules;

export type ContentRecommendation = ExecutionStep<'contentRecommendation'> & AppliedRules<AffectedResultsPosition>;

export type ProductRecommendation = ExecutionStep<'productRecommendation'> & AppliedRules<AffectedResultsPosition>;

export type AutomaticRelevanceTuning = ExecutionStep<'art'> & AppliedRules<AffectedResultsPosition>;

export type DynamicNavigationExperience = ExecutionStep<'dne'> & AppliedRules<AffectedResultsPosition>;

export type Triggers = ExecutionStep<'triggers'> & AppliedRules;

export interface IndexQuery extends ExecutionStep<'indexQuery'> {
    request: Record<string, unknown>;
}

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

export type ExecutionSteps = Array<MappedExecutionSteps[AvailableExecutionStep]>;

export interface ReplayAnalysis {
    requestParameters: RequestParameters;
    execution: ExecutionSteps;
    totalResultsCount: number;
    results: Result[];
}
