import {PostSearchBodyQueryParams} from '../Search/SearchInterfaces';

type RequestParameters = PostSearchBodyQueryParams;
interface Result {
    title: string;
    rankingInfo: unknown;
    fields: Record<string, string>;
}

interface ExecutionStep {
    type: string;
    name: string;
}

interface Condition {
    id: string;
}

interface AffectedRequestParameters {
    affectedRequestParameters: Array<{name: string; value: unknown}>;
}

interface AffectedResultsPosition {
    affectedResultsPosition: number[];
}

interface AppliedRules<Affected = Record<string, unknown>, OtherPropertiesApplied = Record<string, unknown>> {
    appliedCount: number;
    applied: Array<
        {
            id: string;
            condition?: Condition;
        } & Affected &
            OtherPropertiesApplied
    >;
}

interface QueryPipelineSelection extends ExecutionStep {
    type: 'pipelineSelection';
    selectedPipeline: {
        id: string;
        name: string;
        condition?: Condition;
    };
    selectionCause: {
        type:
            | 'AUTHENTICATION_PIPELINE'
            | 'AUTHENTICATION_SEARCH_HUB'
            | 'ML_ROUTING'
            | 'PARAMETER_PIPELINE'
            | 'CONDITION_ROUTING'
            | 'DEFAULT';
        abTest?: {
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
        };
    };
}

interface QueryParamOverrides extends ExecutionStep, AppliedRules<AffectedRequestParameters> {
    type: 'paramOverrides';
}

interface Thesaurus extends ExecutionStep, AppliedRules<AffectedRequestParameters> {
    type: 'thesaurus';
}

interface StopWords extends ExecutionStep, AppliedRules<AffectedRequestParameters> {
    type: 'stopWords';
}

interface Filters extends ExecutionStep, AppliedRules<AffectedRequestParameters> {
    type: 'filters';
}

interface RankingExpressions extends ExecutionStep, AppliedRules<AffectedResultsPosition, {boost: number}> {
    type: 'rankingExpressions';
}

interface FeaturedResults extends ExecutionStep, AppliedRules<AffectedResultsPosition> {
    type: 'featuredResults';
}

interface RankingWeights extends ExecutionStep, AppliedRules {
    type: 'rankingWeights';
}

interface ContentRecommendation extends ExecutionStep, AppliedRules<AffectedResultsPosition> {
    type: 'contentRecommendation';
}

interface ProductRecommendation extends ExecutionStep, AppliedRules<AffectedResultsPosition> {
    type: 'productRecommendation';
}

interface AutomaticRelevanceTuning extends ExecutionStep, AppliedRules<AffectedResultsPosition> {
    type: 'art';
}

interface DynamicNavigationExperience extends ExecutionStep, AppliedRules<AffectedResultsPosition> {
    type: 'dne';
}

interface Triggers extends ExecutionStep, AppliedRules {
    type: 'triggers';
}

interface IndexQuery extends ExecutionStep {
    type: 'indexQuery';
    request: Record<string, unknown>;
}

export interface ReplayAnalysis {
    requestParameters: RequestParameters;
    execution: [
        QueryPipelineSelection,
        ...Array<
            | QueryParamOverrides
            | Thesaurus
            | StopWords
            | Filters
            | RankingExpressions
            | FeaturedResults
            | RankingWeights
            | ContentRecommendation
            | ProductRecommendation
            | AutomaticRelevanceTuning
            | DynamicNavigationExperience
            | Triggers
        >,
        IndexQuery
    ];
    totalResultsCount: number;
    results: Result[];
}
