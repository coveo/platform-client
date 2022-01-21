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

export type RestQueryParams = PostSearchBodyQueryParams & PostSearchQueryStringParams;

export interface PostSearchQueryStringParams {
    viewAllContent?: boolean | number;
}

export interface PostSearchBodyQueryParams {
    actionsHistory?: RestActionHistory[];
    analytics?: RestAnalyticsRequest;
    aq?: string;
    categoryFacets?: RestCategoryFacetRequest[];
    childField?: string;
    commerce?: RestCommerceParameters;
    context?: RestContextRequest;
    cq?: string;
    debug?: boolean;
    dictionaryFieldContext?: RestDictionaryFieldContextRequest;
    dq?: string;
    enableCollaborativeRating?: boolean;
    enableDidYouMean?: boolean;
    enableDuplicateFiltering?: boolean;
    enableMLDidYouMean?: boolean;
    enableQuerySyntax?: boolean;
    excerptLength?: number;
    facetOptions?: RestFacetOptions[];
    facets?: RestFacetRequest[];
    format?: RestFormat;
    fieldsToExclude?: string[];
    fieldsToInclude?: string[];
    filterField?: string;
    filterFieldRange?: number;
    firstResult?: number;
    groupBy?: RestGroupByRequest[];
    index?: string;
    indexToken?: string;
    indexType?: string;
    isGuestUser?: boolean;
    locale?: string;
    logicalIndex?: string;
    lowercaseOperators?: boolean;
    lq?: string;
    lqPartialMatchKeywords?: string;
    lqPartialMatchMaxKeywords?: number;
    lqPartialMatchThreshold?: RestThreshold;
    maximumAge?: number;
    mlDidYouMeanMaxCandidates?: number;
    mlDidYouMeanMinScore?: number;
    mlDidYouMeanUseFacetCount?: boolean;
    mlParameters?: RestMLParameters;
    numberOfResults?: number;
    parentField?: string;
    partialMatch?: boolean;
    partialMatchKeywords?: string;
    partialMatchThreshold?: RestThreshold;
    pipeline?: string;
    q?: string;
    queryFunctions?: RestQueryFunctionRequest[];
    questionMark?: boolean;
    rankingFunctions?: RestRankingFunctionRequest[];
    recommendation?: string;
    referrer?: string;
    resultRankings?: unknown[];
    retrieveFirstSentences?: boolean;
    searchById?: boolean;
    searchHub?: string;
    sortCriteria?: string;
    staticQuery?: boolean;
    summaryLength?: number;
    syntax?: string;
    tab?: string;
    timezone?: string;
    userActions?: RestUserActionsParameters;
    visitorId?: string;
    wildcards?: boolean;
}

export type RestThreshold = string | number;

export type RestComputedFieldOperation = 'average' | 'maximum' | 'minimum' | 'sum';

export type RestFacetSortCriteria = 'alphanumeric' | 'ascending' | 'descending' | 'occurrences' | 'score';

export type RestFacetType = 'dateRange' | 'hierarchical' | 'numericalRange' | 'specific';

export type RestFormat = 'json' | 'opensearch-atom' | 'opensearch-rss' | 'xlsx';

export type RestGroupBySortCriteria =
    | 'alphaascending'
    | 'alphadescending'
    | 'chisquare'
    | 'computedfieldascending'
    | 'computedfielddescending'
    | 'nosort'
    | 'occurrences'
    | 'score';

export type RestMLParametersPadding = 'popular' | 'trending';

export type RestRangeAlgorithm = 'equiprobable' | 'even';

export interface RestActionHistory {
    internalTime?: number;
    name?: string;
    time?: string;
    value?: string;
}

export interface RestAnalyticsRequest {
    clientId?: string;
    clientRequestId?: string;
    clientTimestamp?: string;
    deviceId?: string;
    documentLocation?: string;
    documentReferrer?: string;
    pageId?: string;
    userAgent?: string;
    userId?: string;
    userIp?: string;
}

export interface RestCategoryFacetRequest {
    delimitingCharacter?: string;
    field: string;
    filterFacetCount?: boolean;
    injectionDepth?: number;
    maximumNumberOfValues?: number;
    path?: string[];
}

export interface RestComputedField {
    field: string;
    operation: RestComputedFieldOperation;
}

export interface RestContextRequest {
    [fieldName: string]: string | string[];
}

export interface RestDictionaryFieldContextRequest {
    [fieldName: string]: string;
}

export interface RestFacetOptions {
    enableIndexFacetOrdering?: boolean;
    freezeFacetOrder?: boolean;
}

export interface RestFacetRequest {
    basePath?: string[];
    currentValues?: RestFacetValue[];
    delimitingCharacter?: string;
    facetId?: string;
    field: string;
    filterByBasePath?: boolean;
    filterFacetCount?: boolean;
    freezeCurrentValues?: boolean;
    generateAutomaticRanges?: boolean;
    injectionDepth?: number;
    isFieldExpanded?: boolean;
    mlDebugTitle?: string;
    numberOfValues?: number;
    preventAutoSelect?: boolean;
    rangeAlgorithm?: RestRangeAlgorithm;
    sortCriteria?: RestFacetSortCriteria;
    type?: RestFacetType;
}

export interface RestFacetValue {
    children?: RestHierarchicalFacetValue[];
    end?: string;
    endInclusive?: boolean;
    preventAutoSelect?: boolean;
    retrieveChildren?: boolean;
    retrieveCount?: number;
    start?: string;
    state?: string;
    value: string;
}

export interface RestGroupByRangeValue {
    end: number;
    endInclusive?: boolean;
    label?: string;
    start: number;
}

export interface RestGroupByRequest {
    advancedQueryOverride?: string;
    allowedValues?: string[];
    allowedValuesPatternType?: string;
    completeFacetWithStandardValues?: boolean;
    computedFields?: RestComputedField[];
    constantQueryOverride?: string;
    disjunctionQueryOverride?: string;
    field: string;
    filterFacetCount?: boolean;
    generateAutomaticRanges?: boolean;
    injectionDepth?: number;
    maximumNumberOfValues?: number;
    queryOverride?: string;
    rangeValues?: RestGroupByRangeValue[];
    sortCriteria?: RestGroupBySortCriteria;
}

export interface RestHierarchicalFacetValue {
    children?: RestHierarchicalFacetValue[];
    preventAutoSelect?: boolean;
    retrieveChildren?: boolean;
    retrieveCount?: number;
    state?: string;
    value?: string;
}

export interface RestMLParameters {
    brandFilter?: string;
    categoryFilter?: string;
    considerUserContext?: boolean;
    filters?: Record<string, string>;
    itemId?: string;
    itemIds?: string[];
    maxActionsHistoryItemsToConsider?: number;
    minNumberOfWords?: number;
    num?: number;
    padding?: RestMLParametersPadding;
    wordSelection?: string;
}

export interface RestQueryFunctionRequest {
    fieldName: string;
    function: string;
}

export interface RestRankingFunctionRequest {
    expression: string;
    modifier?: number;
    normalizeWeight?: boolean;
}

export interface RestUserActionsParameters {
    tagViewsOfUser?: string;
}
