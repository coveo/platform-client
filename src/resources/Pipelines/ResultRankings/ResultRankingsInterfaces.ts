import {
    ListStatementSortBy,
    ResultRankingLocales,
    ResultRankingMatchOperators,
    ResultRankingsKind,
    ResultRankingsRuleTypes,
    ResultRankingsStatuses,
} from '../../Enums';

export interface ResultRanking {
    id: string;
    resultRanking: ResultRankingProps;
    associatedGroup?: ResultRankingAssociatedGroup;
}

export interface ResultRankingProps {
    name: string;
    kind?: ResultRankingsKind; // default: "featured_result"
    defaultMatchOperator: ResultRankingMatchOperator;
    predicates: ResultRankingPredicate[];
    targets: Array<
        ResultRankingTargetUniqueId | ResultRankingTargetLocalizedContent | ResultRankingTargetQueryExpression
    >;
    qplPredicates?: ResultRankingQplCodePredicate;
    matchQuery?: boolean;
    matchAdvancedQuery?: boolean;
    includeInFacets?: boolean;
    isMigrated?: boolean;
    description?: string;
    rankingModifier?: number;
    isConstant?: boolean;
    applyToEveryResult?: boolean;
    enabled?: boolean;
    condition?: {
        reference: string;
    };
    statementGroupId?: string;
    associatedGroup?: ResultRankingAssociatedGroup;
}

export interface ResultRankingAssociatedGroup {
    id: string;
    name: string;
    isActive: boolean;
}

export interface ResultRankingMatchOperator {
    kind: string | ResultRankingMatchOperators;
}

export interface ResultRankingPredicate {
    kind: string;
    basicQueryExpression?: string;
    matchOperator: ResultRankingMatchOperator;
    locale?: ResultRankingPredicateLocale;
    code?: string;
}

export interface ResultRankingPredicateLocale {
    kind?: string | ResultRankingLocales;
    code?: string;
}

export interface ResultRankingTargetUniqueId {
    uniqueId: string;
}

export interface ResultRankingTargetLocalizedContent {
    familyId: string;
    locale: ResultRankingLocalizedContentLocale;
    familyIdField: string;
    localeField: string;
}

export interface ResultRankingLocalizedContentLocale {
    ResultRankingLocalizedContentLocale:
        | ResultRankingLocalizedContentLocaleAuto
        | ResultRankingLocalizedContentLocaleSpecific;
}

export interface ResultRankingLocalizedContentLocaleAuto {
    auto: {
        default: string;
    };
}

export interface ResultRankingLocalizedContentLocaleSpecific {
    code: string;
}

export interface ResultRankingTargetQueryExpression {
    queryExpression: string;
}

export interface ResultRankingQplCodePredicate {
    code: string;
}

export interface ResultRankingGroupByStatementGroups {
    associated: Record<string, number>;
    orphaned: number;
}

export interface ResultRankingGroupByStatus {
    active: number;
    inactive: number;
}

export interface ResultRankingGroupByTypes {
    rankingExpressions: number;
    featuredResults: number;
}

export interface ResultRankingGroupBy {
    groups: ResultRankingGroupByStatementGroups;
    status: ResultRankingGroupByStatus;
    type: ResultRankingGroupByTypes;
}

export interface ListResultRankingResponse {
    resultRankings: ResultRanking[];
    groupedBy: ResultRankingGroupBy;
    totalCount: number;
    totalPages: number;
}

export interface ListResultRankingParams {
    isOrderAscending?: boolean;
    filter?: string;
    sortBy?: ListStatementSortBy;
    page?: number;
    perPage?: number;
    organizationId?: string;
    associatedGroups?: Array<string | null>;

    /**
     * @deprecated `ruleTypes` should be preferred over _kind_.
     * @see ruleTypes
     */
    kind?: ResultRankingsKind;

    /**
     * Similar to `kind`, the _ruleTypes_ parameter allows to filter by result ranking rule type.
     * This new parameter should be preferred over `kind` as it may eventually support other rule types.
     * @see kind
     */
    ruleTypes?: ResultRankingsRuleTypes[];
    ruleStatuses?: ResultRankingsStatuses[];
}

export interface CopyResultRankingRequest {
    /**
     * The unique identifier of the query pipeline to copy the statements to
     */
    destinationPipelineId: string;

    /**
     * The unique identifiers of the result ranking rules to copy.
     */
    resultRankingIds: string[];
}

export interface CopyResultRankingResponse {
    /**
     * The list of result rankings that were copied to the destination pipeline.
     */
    resultRankings: Array<{
        /**
         * The identifier of the result ranking rule
         */
        id: string;

        /**
         * The result ranking rule content.
         */
        resultRanking: ResultRankingProps;
    }>;
}
