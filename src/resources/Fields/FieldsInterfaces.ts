import {Paginated} from '../BaseInterfaces.js';
import {FacetOrSortStatus, FieldOrigin, FieldTypes, SortingOrder} from '../Enums.js';

export interface FieldModel {
    /**
     * Whether this field is to be considered by the facet generator feature.
     */
    automaticFacetsCandidate?: boolean;
    /**
     * A regex indicating the date format, for some date type fields.
     */
    dateFormat?: string;
    /**
     * A description of the field.
     */
    description?: string;
    /**
     * Whether [Group By](https://docs.coveo.com/en/203/glossary/group-by) operations and [Facet](https://docs.coveo.com/en/198/glossary/facet) requests can be performed on the field.
     */
    facet?: boolean;
    /**
     * Whether the field contains multiple values that form a hierarchy (see also the multiValueFacetTokenizers property).
     * Note: Applicable to field type STRING only.
     */
    hierarchicalFacet?: boolean;
    /**
     * Whether this field can be referred to in [Coveo Cloud query syntax](https://docs.coveo.com/en/149/index-content/available-boolean-field-options) expressions.
     */
    includeInQuery?: boolean;
    /**
     * Whether the field can be included in the raw property of [query](https://docs.coveo.com/en/231/glossary/query) results.
     */
    includeInResults?: boolean;
    /**
     * Whether field values with differing accents should be considered distinct facet values.
     * Note: Applicable to field type STRING only.
     */
    keepAccentsDisplayValueFacet?: boolean;
    /**
     * Whether the field is a dictionary field, which contains mappings of keys to values instead of a single value.
     */
    keyValue?: boolean;
    /**
     * A displayable label for the field when used by the facet generator.
     */
    label?: string;
    /**
     * Whether the field is free text searchable.
     * Note: Applicable to field type STRING only.
     */
    mergeWithLexicon?: boolean;
    /**
     * Whether the field contains multiple values (see also the multiValueFacetTokenizers property).
     * Note: Applicable to field type STRING only.
     */
    multiValueFacet?: boolean;
    /**
     * The character to use as a value separator, if the field contains multiple values (see also the multiValueFacet property).
     */
    multiValueFacetTokenizers?: string;
    /**
     * The name of the field, also referred to as the field identifier, or fieldId.
     * Note: Must match ^([a-z][a-z0-9_]{0,254})$
     */
    name?: string;
    /**
     * Whether to use the field in result ranking calculation only.
     * Notes:
     * - Has a significant impact on query performance.
     * - Applicable to field type STRING
     */
    ranking?: boolean;
    /**
     * Whether to transform date and time string values into semicolon separated number of days/weeks/months/quarters/years since January 1st, 1900.
     * Note: Applicable to field type DATE only.
     */
    smartDateFacet?: boolean;
    /**
     * Whether query results can be sorted based on the value of the field.
     */
    sort?: boolean;
    /**
     * Whether to allow an item to match the query when the value of this field for this item stems from the same root as one of the query expression keywords.
     * Notes:
     * - applicable to STRING type fields only.
     * - Has a significant impact on query performance.
     */
    stemming?: boolean;
    /**
     * Whether the field is a standard Coveo field.
     * Note: system option can not be set to true.
     */
    system?: boolean;
    /**
     * The data type of the field.
     * See [Field Types](https://docs.coveo.com/en/2036/index-content/about-fields#Field2).
     */
    type?: FieldTypes;
    /**
     * Whether to keep computed field data in memory.
     * Note: Cannot be enabled on STRING type fields.
     */
    useCacheForComputedFacet?: boolean;
    /**
     * Whether to keep the data required to perform nested queries in memory.
     * Note: only applicable to fields which are faceted or multi-value faceted.
     */
    useCacheForNestedQuery?: boolean;
    /**
     * Whether to keep the data required to execute operations on numeric and date fields in memory.
     * Note: Cannot be enabled on STRING type fields.
     */
    useCacheForNumericQuery?: boolean;
    /**
     * Whether to keep the entire field in memory for fast sorting.
     */
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
