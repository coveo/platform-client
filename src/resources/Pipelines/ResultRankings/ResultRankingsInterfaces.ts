import {ListStatementSortBy, ResultRankingLocales, ResultRankingMatchOperators, ResultRankingsKind} from '../../Enums';

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

export interface ListResultRankingResponse {
    resultRankings: ResultRanking[];
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
}
