import {DeprecatedPaginated} from '../InternalBaseInterface.js';
import {FacetRequestOptions, FieldOperatorType, FieldValueType, RestFacetRequest} from '../index.js';

export const isRankingTypeEnum = (value: unknown): value is RankingTypeEnum =>
    value === RankingTypeEnum.BOOST || value === RankingTypeEnum.BURY;

export enum RankingTypeEnum {
    BOOST = 'boost',
    BURY = 'bury',
}

export const isFilterTypeEnum = (value: unknown): value is FilterTypeEnum =>
    value === FilterTypeEnum.INCLUDE || value === FilterTypeEnum.EXCLUDE;

export enum FilterTypeEnum {
    INCLUDE = 'include',
    EXCLUDE = 'exclude',
}

export enum SortOrderEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortPropertyEnum {
    NAME = 'NAME',
    REVENUE = 'REVENUE',
    CONVERSION_RATE = 'CONVERSION_RATE',
    BOUNCE_RATE = 'BOUNCE_RATE',
}

export enum RuleVariantEnum {
    BASELINE = 'BASELINE',
    CAMPAIGN = 'CAMPAIGN',
}

export type ProductListingsListOptions = DeprecatedPaginated;

export interface MatchingConfigurationModel {
    /**
     * URL associated to a listing configuration used for pattern matching.
     */
    url: string;
}

export interface FacetRequestModel extends FacetRequestOptions {
    /**
     * The facet request configuration.
     */
    facets: RestFacetRequest[];
}

export interface SortByFieldModel {
    /**
     * The name of a field to sort by.
     */
    field: string;
    /**
     * Sort order.
     */
    direction?: SortOrderEnum;
    /**
     * The display name of a field to sort by.
     */
    displayName?: string;
}
export interface SortByFieldsModel {
    sortCriteria: string;
    /**
     * Defines the fields and, optionally, their sort order.
     */
    fields: SortByFieldModel[];
}

export interface SortByRelevanceModel {
    sortCriteria: string;
}

export interface QueryConfigurationModel {
    /**
     * The UUID of the query configuration.
     */
    id?: string;
    /**
     * Additional fields allow you to collect additional information, besides the standard data.
     */
    additionalFields: string[];
    /**
     * The facet request configuration.
     */
    facets: FacetRequestModel;
    /**
     * The number of results per page.
     */
    perPage?: number;
    /**
     * Determines the order in which to retrieve the results.
     */
    sorts: Array<SortByFieldsModel | SortByRelevanceModel>;
}

export interface RulesModel {
    /**
     * The UUID of the rule.
     */
    id?: string;
    /**
     * The unique identifier of the configuration.
     */
    listingConfigurationId?: string;
    /**
     * Whether the rules are part of a baseline or a campaign.
     */
    variant?: RuleVariantEnum;
    /**
     * List of the ranking rules.
     */
    rankingRules: RankingConfigurationModel[];
    /**
     * List of the filter rules.
     */
    filterRules: FilterConfigurationModel[];
    /**
     * List of the pin rules.
     */
    pinRules: PinConfigurationModel[];
}

export interface ListingConfigurationModel {
    /**
     * The unique identifier of the listing configuration.
     */
    id?: string;
    /**
     * Possible pattern matching values associated to a listing configuration.
     */
    matching: MatchingConfigurationModel;
    /**
     * Query configuration.
     */
    queryConfiguration?: QueryConfigurationModel;
    /**
     * Listing rules to apply at query time.
     */
    rules: RulesModel;
    /**
     * Additional fields allow you to collect additional information, besides the standard data.
     */
    additionalFields?: string[];
}

export interface BaseRuleConfigurationModel {
    /**
     * The id of the configuration.
     */
    id?: string;
    /**
     * The name of the configuration.
     */
    name: string;
    /**
     * The updated at date when a configuration is created/updated
     */
    updatedAt: number;
}

export interface RankingConfigurationModel extends BaseRuleConfigurationModel {
    /**
     * The list of filters.
     */
    filters: QueryFilterModel[];
    /**
     * The type of the RankingConfiguration.
     */
    type: RankingTypeEnum;
    /**
     * The modifier value if type is BOOST or BURY
     */
    value: number;
}

export interface FilterConfigurationModel extends BaseRuleConfigurationModel {
    /**
     * The list of inclusion filters.
     */
    filters: QueryFilterModel[];
    /**
     * The type of the FilterConfiguration.
     */
    type: FilterTypeEnum;
}

export interface PinConfigurationModel extends BaseRuleConfigurationModel {
    /**
     * The record of pinned product ranks by their permanent id.
     */
    rankByPermanentId: Record<string, number>;
    /**
     * the type of the PinConfiguration. The backend doesn't return this, but we need a prop to simplify the code
     */
    type: undefined;
}

interface ValueTypeForFieldValueType {
    [FieldValueType.RANGE]: number[];
    [FieldValueType.STRING]: string;
    [FieldValueType.DECIMAL]: number;
    [FieldValueType.ARRAY]: string[];
    [FieldValueType.HIERARCHIC_MULTI_VALUE]: string[];
}

interface FieldValueModelGeneric<T extends FieldValueType> {
    /**
     * The type of the field.
     */
    type: T;
    /**
     * The value of the field.
     */
    value?: ValueTypeForFieldValueType[T];
    /**
     * The multiple values of the field.
     */
    values?: ValueTypeForFieldValueType[T];
    /**
     * the number of results that match the value.
     */
    numberOfResults?: number;
}

type FieldValueModel =
    | FieldValueModelGeneric<FieldValueType.RANGE>
    | FieldValueModelGeneric<FieldValueType.STRING>
    | FieldValueModelGeneric<FieldValueType.DECIMAL>
    | FieldValueModelGeneric<FieldValueType.ARRAY>
    | FieldValueModelGeneric<FieldValueType.HIERARCHIC_MULTI_VALUE>;

export interface QueryFilterModel {
    /**
     * The field name.
     */
    fieldName: string;
    /**
     * The field operator.
     */
    operator: FieldOperatorType;
    /**
     * The field value.
     */
    value: FieldValueModel;
}
