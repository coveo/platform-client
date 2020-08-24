import {
    FacetRuleKind,
    FacetRuleState,
    ListStatementSortBy,
    PredicateKind,
    PredicateLocaleKind,
    PredicateMatchOperator,
} from '../../Enums';

export interface IdentifiedFacetStateRule {
    id: string;
    position: number;
    rule: FacetStateRule;
}

export interface FacetStateRule {
    condition?: FacetStateRuleCondition;
    defaultMatchOperator?: PredicateMatchOperator;
    description?: string;
    field?: string;
    kind: FacetRuleKind;
    predicates?: Predicate;
    state?: FacetRuleState;
    values?: string[];
}

export interface FacetStateRuleCondition {
    reference: string;
}

export interface Predicate {
    basicQueryExpression?: string;
    code?: string;
    kind: PredicateKind;
    locale?: PredicateLocale;
    matchOperator: PredicateMatchOperator;
}

export interface PredicateLocale {
    code: string;
    kind: PredicateLocaleKind;
}

export interface ListFacetStateRuleParams {
    isOrderAscending?: boolean;
    filter?: string;
    sortBy?: ListStatementSortBy;
    page?: number;
    perPage?: number;
    organizationId: string;
}

export interface ListFacetStateRuleResponse {
    facetStateRules: IdentifiedFacetStateRule[];
    totalCount: number;
    totalPages: number;
}
