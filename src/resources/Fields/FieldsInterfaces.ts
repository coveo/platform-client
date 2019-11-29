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

export enum FieldTypes {
    LONG = 'LONG',
    LONG_64 = 'LONG_64',
    DOUBLE = 'DOUBLE',
    DATE = 'DATE',
    STRING = 'STRING',
}

export interface ListFieldsParams {
    filter?: string;
    order?: 'ASC' | 'DESC';
    origin?: 'ALL' | 'USER' | 'SYSTEM';
    page?: number;
    perPage?: number;
    sortBy?: string;
    type?: FieldTypes;
}
