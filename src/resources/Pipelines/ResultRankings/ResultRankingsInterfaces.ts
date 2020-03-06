import {ResultRankingsKind} from '../../Enums';
import {ListStatementSortBy} from '../Statements';

export interface ResultRanking {
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
}

export interface ResultRankingMatchOperator {
    is?: ResultRankingEmptyUnionCase;
    contains?: ResultRankingEmptyUnionCase;
    matches?: ResultRankingEmptyUnionCase;
}

export interface ResultRankingPredicate {
    basicQueryExpression?: string;
    matchOperator: ResultRankingMatchOperator;
    locale?: ResultRankingPredicateLocale;
}

export interface ResultRankingPredicateLocale {
    all?: ResultRankingEmptyUnionCase;
    unspecified?: ResultRankingEmptyUnionCase;
    specific?: ResultRankingLocaleSpecific;
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

export interface ResultRankingEmptyUnionCase {}

export interface ResultRankingLocaleSpecific {
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
