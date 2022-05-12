export interface DeprecatedPaginated {
    /**
     * The 0-based index number of the page of elements to retrieve.
     */
    page?: number;
    /**
     * The number of elements to list per page.
     *
     * @deprecated use @see {Paginated} and @see {perPage} instead.
     */
    pageSize?: number;
}
