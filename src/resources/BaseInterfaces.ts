export type PageModel<T = any, TItemsKey extends string = 'items'> = {
    [key in TItemsKey]: T[];
} & {
    totalEntries: number;
    totalPages: number;
};

export type New<T, K extends keyof T | null = null> = Omit<T, 'id' | NonNullable<K>>;

export interface IdAndDisplayNameModel {
    id: string;
    displayName?: string;
}

export interface PrivilegeModel {
    /**
     * The owner of the privilege.
     * See [Valid Privilege owner, targetDomain, and type Combinations](https://docs.coveo.com/en/159/).
     */
    owner: string;
    /**
     * The target domain of the privilege.
     * See [Valid Privilege owner, targetDomain, and type Combinations](https://docs.coveo.com/en/159/).
     */
    targetDomain: string;
    /**
     * The `displayName` of the source targeted by the privilege.
     * Note: The wildcard character (`*`) will include all sources.
     */
    targetId?: string;
    /**
     * The type of the privilege.
     * See [Valid Privilege owner, targetDomain, and type Combinations](https://docs.coveo.com/en/159/).
     */
    type?: string;
    /**
     * The access level of the global privileges.
     */
    level?: string;
}

export interface GranularResource {
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    groupsThatCanEdit?: IdAndDisplayNameModel[];
}

export interface Paginated {
    /**
     * The 0-based index number of the page of elements to retrieve.
     */
    page?: number;
    /**
     * The number of elements to list per page.
     */
    perPage?: number;
}

export type WithRequired<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export type WithOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;

/**
 * Pagination information about which page is included in the response,
 * and what the full range of data is.
 */
export interface PaginationInformationModel {
    /**
     * Zero-based page index of the current page.
     */
    page: number;
    /**
     * The number of items for each page.
     * Note that the actual number of items may be lower for the last page.
     */
    perPage: number;
    /**
     * Total number of items available (across all pages).
     */
    totalItems: number;
    /**
     * The number of pages available, based on `totalItems` and `perPage`.
     */
    totalPages: number;
}

export interface PaginatedResponse {
    /**
     * Pagination information.
     */
    pagination: PaginationInformationModel;
}
