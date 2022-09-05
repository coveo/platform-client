import {Paginated} from '../BaseInterfaces';
import {FieldOperatorType, FieldValueType} from '../Enums';
import {DeprecatedPaginated} from '../InternalBaseInterface';

export type ProductListingsListOptions = Paginated | DeprecatedPaginated;

export interface FieldValueModel {
    /**
     * The field type.
     */
    type: string;
    /**
     * The field value enum type.
     */
    value: FieldValueType;
}

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

export interface ProductListingMetricsModel {
    lastNumberOfProducts?: number;
    lastQueried: string;
}

export interface ProductListingModel {
    /**
     * The list of exclusion filters.
     */
    exclusion?: QueryFilterModel[];
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
    metrics?: ProductListingMetricsModel;
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
