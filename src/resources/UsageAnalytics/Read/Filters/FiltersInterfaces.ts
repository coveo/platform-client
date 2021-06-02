export interface FilterModel {
    /** The display name of the filter. */
    displayName: string;

    /** The actual value of the filter. */
    value: string;
}

export interface FilterResponse {
    /** The filter id. */
    id: string;

    /** The filter display name. */
    displayName: string;

    /** The filter account. */
    account: string;

    /** The filter type. Can be 'permissions' or 'reporting'. */
    type: string;

    /** The actual filter. */
    value: string;
}

export type CreateReportingFilterModel = FilterModel;
export type CreateReportingFilterResponse = Pick<FilterResponse, 'id'>;

export type UpdateReportingFilterModel = CreateReportingFilterModel;
export type UpdateReportingFilterResponse = CreateReportingFilterResponse;

export interface ListFiltersResponse {
    /** A list of filters */
    filters: FilterModel[];
}
