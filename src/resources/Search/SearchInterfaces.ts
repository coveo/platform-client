import {RestUserIdType} from '../Enums';

export interface RestTokenParams {
    userIds: RestUserId[];
    userGroups?: string[];
    userDisplayName?: string;
    canSeeUserProfileOf?: string[];
    pipeline?: string;
    filter?: string;
    searchHub?: string;
    salesforceOrganizationId?: string;
    validFor?: number;
    salesforceUser?: string;
    salesforceCommunityUrl?: string;
    salesforceFallbackToAdmin?: boolean;
    usertype?: string; // this is really usertype and not userType
    licenseDefinitionKey?: string;
    superUserToken?: string;
    commerce?: RestCommerceParameters;
    scope?: number; // Deprecated: This property is exposed for backward compatibility reasons only.
}

export interface RestUserId {
    name: string;
    provider: string;
    type?: RestUserIdType;
    infos?: any;
    authCookie?: string;
    password?: string; // Deprecated: This property is exposed for backward compatibility reasons only.
}

export interface RestCommerceParameters {
    catalogId: string;
    filter: string;
    operation: string;
}

export interface TokenModel {
    token: string;
}

export interface PostSearchQueryStringParams {
    viewAllContent?: boolean;
}

export interface RestQueryParams {
    q: string;
    aq: string;
    cq: string;
    dq: string;
    lq: string;
    enableDidYouMean: boolean;
    mlDidYouMeanMaxCandidates: number;
    mlDidYouMeanMinScore: number;
    mlDidYouMeanUseFacetCount: boolean;
    enableMLDidYouMean: boolean;
    partialMatch: boolean;
    partialMatchKeywords: string;
    partialMatchThreshold: RestQueryParamsThreshold;
    lqPartialMatchMaxKeywords: number;
    lqPartialMatchKeywords: string;
    lqPartialMatchThreshold: RestQueryParamsThreshold;
    wildcards: boolean;
    questionMark: boolean;
    enableQuerySyntax: boolean;
    lowercaseOperators: boolean;
    excerptLength: number;
    retrieveFirstSentences: boolean;
    fieldsToInclude: string[]; // TODO: I think we should pass it only when defined
    fieldsToExclude: string[]; // TODO: I think we should pass it only when defined
    groupBy: RestQueryGroupByParams[];
    facets: RestQueryFacetParams[];
    facetOptions: RestQueryFacetOptionsParams[];
    categoryFacets: RestQueryCategoryFacetParams[];
    sortCriteria: string;
    rankingFunctions: RestQueryRankingFunctionParams[];
    queryFunctions: RestQueryFunctionParams[];
    firstResult: number;
    numberOfResults: number;
    enableDuplicateFiltering: boolean;
    filterField: string;
    parentField: string;
    childField: string;
    filterFieldRange: number;
    searchById: boolean;
    syntax: string;
    enableCollaborativeRating: boolean;
    summaryLength: number;
    staticQuery: boolean;
    userActions: RestQueryUserActionsParams;
    commerce: RestCommerceParameters;
    dictionaryFieldContext: Record<string, string>; // TODO: Check which value types are allowed here
    pipeline: string;
    maximumAge: number;
    searchHub: string;
    tab: string;
    referrer: string;
    context: Record<string, unknown>; // TODO: Find out the best typing for this one
    actionsHistory: RestQueryActionHistoryParams[];
    recommendation: string;
    locale: string;
    timezone: string;
    format: string; // TODO: We should probably be using an enum here
    debug: boolean;
    indexToken: string;
    visitorId: string;
    mlParameters: RestQueryMLParametersParams;
    indexType: string; // TODO: should use an enum here
    index: string;
    logicalIndex: string;
    analytics: RestQueryAnalyticsParams;
}

export type RestQueryParamsThreshold = string | number;

export interface RestQueryGroupByParams {
    field: string;
    allowedValues: string[];
    allowedValuesPatternType: string; // TODO: should use an enum here
    maximumNumberOfValues: number;
    completeFacetWithStandardValues: boolean;
    injectionDepth: number;
    rangeValues: unknown[]; // TODO: should be able to provide some typing here
    generateAutomaticRanges: boolean;
    sortCriteria: string; // TODO: should use an enum here
    computedFields: Array<{
        field: string;
        operation: string; // TODO: should use an enum here
    }>;
    queryOverride: string;
    advancedQueryOverride: string;
    constantQueryOverride: string;
    disjunctionQueryOverride: string;
    filterFacetCount: boolean;
}

export interface RestQueryFacetParams {
    field: string;
    facetId: string;
    type: string; // TODO: should use an enum here
    mlDebugTitle: string;
    basePath: string[];
    filterByBasePath: boolean;
    sortCriteria: string; // TODO: should use an enum here
    numberOfValues: number;
    injectionDepth: number;
    freezeCurrentValues: boolean;
    currentValues: Array<{
        value: string;
        state: string; // TODO: should use an enum here
        preventAutoSelect: boolean;
        start: unknown; // TODO: provide some typing for this
        end: unknown; // TODO: provide some typing for this
        endInclusive: boolean;
        children: unknown[]; // TODO: check the typing on this
        retrieveChildren: boolean;
        retrieveCount: number;
    }>;
    isFieldExpanded: boolean;
    generateAutomaticRanges: boolean;
    rangeAlgorithm: string; // TODO: should use an enum here
    filterFacetCount: boolean;
    delimitingCharacter: string;
    preventAutoSelect: boolean;
}

export interface RestQueryFacetOptionsParams {
    freezeFacetOrder: boolean;
    enableIndexFacetOrdering: boolean;
}

export interface RestQueryCategoryFacetParams {
    field: string;
    path: string[];
    maximumNumberOfValues: number;
    injectionDepth: number;
    delimitingCharacter: string;
    filterFacetCount: boolean;
}

export interface RestQueryRankingFunctionParams {
    expression: string;
    normalizeWeight: boolean;
    modifier: number;
}

export interface RestQueryFunctionParams {
    function: string;
    fieldName: string;
}

export interface RestQueryUserActionsParams {
    tagViewsOfUser: string;
}

export interface RestQueryActionHistoryParams {
    name: string; // TODO: could possibly use an enum for that, but might be safest just to use a string
    value: string;
    time: string;
    internalTime: number;
}

export interface RestQueryMLParametersParams {
    num: number;
    padding: string; // TODO: should probably use an enum for that
}

export interface RestQueryAnalyticsParams {
    userId: string;
    clientId: string;
    deviceId: string;
    documentLocation: string;
    documentReferrer: string;
    pageId: string;
    userIp: string;
    clientRequestId: string;
    clientTimestamp: string;
    userAgent: string;
}
