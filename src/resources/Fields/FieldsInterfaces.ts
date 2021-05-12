import {FieldOrigin, FieldTypes, SortingOrder} from '../Enums';

export interface FieldModel {
    dateFormat?: string;
    description?: string;
    facet?: boolean;
    hierarchicalFacet?: boolean;
    includeInQuery?: boolean;
    includeInResults?: boolean;
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

export interface ListFieldsParams {
    facetsOnly?: boolean;
    filter?: string;
    order?: SortingOrder;
    origin?: FieldOrigin;
    page?: number;
    perPage?: number;
    sortBy?: string;
    type?: FieldTypes;
}
