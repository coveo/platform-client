export type PageModel<T = any, TItemsKey extends string = 'items'> = {
    [key in TItemsKey]: T[];
} & {
    totalEntries: number;
    totalPages: number;
};

export type New<T, K extends string | number | symbol = null> = Omit<T, 'id' | K>;

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
