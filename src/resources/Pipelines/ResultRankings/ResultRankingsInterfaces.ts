import {
    CampaignStatementGroupStatusType,
    ListStatementSortBy,
    PermanentStatementGroupStatusType,
    ResultRankingLocales,
    ResultRankingMatchOperators,
    ResultRankingsKind,
    ResultRankingsRuleTypes,
    ResultRankingsStatuses,
} from '../../Enums';

export interface ResultRanking {
    /**
     * The unique identifier of the result ranking rule.
     */
    id: string;
    /**
     * The configuration of the result ranking rule.
     */
    resultRanking: ResultRankingProps;
    /**
     * Associated statement group's information.
     */
    associatedGroup?: ResultRankingAssociatedGroup;

    /**
     * The identifier of the Coveo Cloud platform user who last modified this.
     */
    modifiedBy?: string;
    /**
     * The last time this was modified. (ISO 8601)
     */
    modifiedAt?: string;
}

export interface ListResultRanking extends ResultRanking {
    /**
     * Associated statement group's information.
     */
    associatedGroup?: ResultRankingAssociatedGroupWithStatus;
}

export interface ResultRankingProps {
    /**
     * The name of the result ranking.
     */
    name: string;
    /**
     * The kind of result ranking. The default value is "featured_result".
     */
    kind?: ResultRankingsKind;
    defaultMatchOperator: ResultRankingMatchOperator;
    predicates: ResultRankingPredicate[];
    targets: Array<
        ResultRankingTargetUniqueId | ResultRankingTargetLocalizedContent | ResultRankingTargetQueryExpression
    >;
    qplPredicates?: ResultRankingQplCodePredicate;
    /**
     * Whether to add the current Query (q) to the Disjunction part (dq) of the combined expression using an OR operator.
     */
    matchQuery?: boolean;
    /**
     * Whether to append the current Advanced Query (aq) to the Disjunction part (dq) of the combined query expression using an OR operator.
     */
    matchAdvancedQuery?: boolean;
    includeInFacets?: boolean;
    /**
     * Whether this result ranking uses the latest features and is not managed by a legacy client.
     */
    isMigrated?: boolean;
    /**
     * The intended purpose of this result ranking.
     */
    description?: string;
    /**
     * The ranking score modifier to apply.
     * Use a positive value to promote the target, or a negative value to demote it.
     */
    rankingModifier?: number;
    /**
     * Whether to treat the expression as a Constant Query (cq) expression (and cache its result set).
     */
    isConstant?: boolean;
    /**
     * Whether to apply the Query Ranking Expression (QRE) to every item in the expression query result set, regardless of its current ranking score. When this option is set to 'false', the QRE only applies to query result set items whose current ranking score is considered high enough by the index.
     */
    applyToEveryResult?: boolean;
    /**
     * Whether this result ranking should be used by the query pipeline.
     */
    enabled?: boolean;
    condition?: {
        /**
         * The ID of a mandatory condition to satisfy.
         */
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

export interface ResultRankingAssociatedGroupWithStatus extends ResultRankingAssociatedGroup {
    /**
     * Activation status.
     */
    status: CampaignStatementGroupStatusType | PermanentStatementGroupStatusType;
}

export interface ResultRankingMatchOperator {
    /**
     * The kind of match operator.
     */
    kind: string | ResultRankingMatchOperators;
}

export interface ResultRankingPredicate {
    kind: string;
    /**
     * The value to compare with the search query's actual q value.
     */
    basicQueryExpression?: string;
    matchOperator: ResultRankingMatchOperator;
    locale?: ResultRankingPredicateLocale;
    /**
     * The Query Pipeline Language (QPL) definition of the condition.
     */
    code?: string;
}

export interface ResultRankingPredicateLocale {
    /**
     * The kind of locale.
     */
    kind?: string | ResultRankingLocales;
    /**
     * An additional condition expressed with the Query Pipeline Language (QPL).
     */
    code?: string;
}

export interface ResultRankingTargetUniqueId {
    /**
     * Select a document by unique id (urihash value).
     */
    uniqueId: string;
}

export interface ResultRankingTargetLocalizedContent {
    /**
     * The ID of the knowledge article to show.
     */
    familyId: string;
    locale: ResultRankingLocalizedContentLocale;
    /**
     * Field that identifies the knowledge article.
     */
    familyIdField: string;
    /**
     * Field that identifies the locale of the document.
     */
    localeField: string;
}

export interface ResultRankingLocalizedContentLocale {
    ResultRankingLocalizedContentLocale:
        | ResultRankingLocalizedContentLocaleAuto
        | ResultRankingLocalizedContentLocaleSpecific;
}

export interface ResultRankingLocalizedContentLocaleAuto {
    auto: {
        /**
         * The default locale of the knowledge article to default to if it's not available in the user's locale.
         */
        default: string;
    };
}

export interface ResultRankingLocalizedContentLocaleSpecific {
    /**
     * The locale code of the knowledge article to show.
     */
    code: string;
}

export interface ResultRankingTargetQueryExpression {
    /**
     * Select documents using a query expression.
     */
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
    resultRankings: ListResultRanking[];
    groupedBy: ResultRankingGroupBy;
    totalCount: number;
    totalPages: number;
}

export interface ListResultRankingParams {
    /**
     * Whether to sort the results in ascending order.
     */
    isOrderAscending?: boolean;
    /**
     * The query filter to match.
     * This allows you to search within query pipeline statement definitions and descriptions.
     * By default, results are not required to match a specific query filter.
     */
    filter?: string;
    sortBy?: ListStatementSortBy;
    /**
     * The 0-based number of the page of results to get.
     */
    page?: number;
    /**
     * The number of results to include per page.
     */
    perPage?: number;
    /**
     * The unique identifier of the target Coveo Cloud organization.
     */
    organizationId?: string;
    /**
     * The group names to allow in the results.
     */
    associatedGroups?: Array<string | null>;

    /**
     * @deprecated `ruleTypes` should be preferred over _kind_.
     * @see ruleTypes
     */
    kind?: ResultRankingsKind;

    /**
     * Similar to `kind`, the _ruleTypes_ parameter allows to filter by result ranking rule type.
     * This new parameter should be preferred over `kind` as it may eventually support other rule types.
     *
     * @see kind
     */
    ruleTypes?: ResultRankingsRuleTypes[];
    /**
     * The rule status to allow in the results.
     */
    ruleStatuses?: ResultRankingsStatuses[];
}

export interface CopyResultRankingRequest {
    /**
     * The unique identifier of the query pipeline to copy the statements to.
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
         * The identifier of the result ranking rule.
         */
        id: string;

        /**
         * The result ranking rule content.
         */
        resultRanking: ResultRankingProps;
    }>;
}
