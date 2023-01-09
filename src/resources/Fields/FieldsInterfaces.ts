import {Paginated} from '../BaseInterfaces.js';
import {FacetOrSortStatus, FieldOrigin, FieldTypes, SortingOrder} from '../Enums.js';

export interface FieldModel {
    dateFormat?: string;
    description?: string;
    facet?: boolean;
    hierarchicalFacet?: boolean;
    includeInQuery?: boolean;
    includeInResults?: boolean;
    keepAccentsDisplayValueFacet?: boolean;
    keyValue?: boolean;
    mergeWithLexicon?: boolean;
    multiValueFacet?: boolean;
    multiValueFacetTokenizers?: string;
    name?: string;
    ranking?: boolean;
    smartDateFacet?: boolean;
    sort?: boolean;
    stemming?: boolean;
    system?: boolean;
    type?: FieldTypes;
    useCacheForComputedFacet?: boolean;
    useCacheForNestedQuery?: boolean;
    useCacheForNumericQuery?: boolean;
    useCacheForSort?: boolean;
}

export interface ListFieldsParams extends Paginated {
    facetsOnly?: boolean;
    filter?: string;
    order?: SortingOrder;
    origin?: FieldOrigin;
    sortBy?: string;
    type?: FieldTypes;
}

export interface FieldListingFilters {
    /**
     * The facet status of the fields to list.
     */
    facet?: FacetOrSortStatus;
    /**
     * A substring that must appear in the name property of a field in order for this field to be included in the results.
     */
    name?: string;
    /**
     * The origin of the fields to list.
     */
    origin?: FieldOrigin;
    /**
     * The sort status of the fields to list.
     */
    sort?: FacetOrSortStatus;
    /**
     * The origin of the fields to list.
     */
    type?: FieldTypes;
}

export interface FieldListingOptions extends Paginated {
    /**
     * Filters to narrow down the returned fields.
     */
    filters?: FieldListingFilters;
    /**
     * The sort direction of the results.
     */
    order?: SortingOrder;
    /**
     * The sort direction of the results.
     */
    sortBy?: string;
}
