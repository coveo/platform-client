import {Paginated} from '../BaseInterfaces.js';
import {FieldOperatorType, FieldValueType} from '../Enums.js';
import {DeprecatedPaginated} from '../InternalBaseInterface.js';

export type ProductListingsListOptions = Paginated | DeprecatedPaginated;

interface FieldValueModelGeneric<T extends FieldValueType> {
    /**
     * The type of the field.
     */
    type: T;
    /**
     * The value of the field.
     */
    value: ValueTypeForFieldValueType[T];
}

interface ValueTypeForFieldValueType {
    [FieldValueType.RANGE]: number[];
    [FieldValueType.STRING]: string;
    [FieldValueType.DECIMAL]: number;
    [FieldValueType.ARRAY]: string[];
    [FieldValueType.HIERARCHIC_MULTI_VALUE]: string[];
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

interface ProductListingQueryMetricsModel {
    lastNumberOfProducts?: number;
    lastQueried: string;
}

export interface ProductListingModel {
    /**
     * The list of exclusion filters.
     */
    exclude?: QueryFilterModel[];
    /**
     * The unique identifier of this product listing.
     */
    id?: string;
    /**
     * The list of inclusion filters.
     */
    include?: QueryFilterModel[];
    /**
     * The name of this product listing.
     */
    name: string;
    /**
     * The list of URLs for the product listing.
     */
    urls: string[];
    /**
     * The list of usage metrics.
     */
    metrics?: ProductListingQueryMetricsModel;
}

export interface CatalogProductListingsGroupModel {
    /**
     * The unique identifier of the catalog.
     */
    catalogId?: string;
    /**
     * The name of the catalog.
     */
    catalogName?: string;
    /**
     * The number of associated product listings.
     */
    productListingsCount?: number;
}
