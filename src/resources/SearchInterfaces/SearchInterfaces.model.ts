export interface IAccesses {
    /**
     * The list of users that are allowed to access the search interface.
     */
    users: string[];

    /**
     * The list of domains that are allowed to access the search interface.
     */
    domains: string[];
}

export interface IFacet {
    /**
     * The [field](https://docs.coveo.com/en/200) on which the facet is based.
     */
    field: string;

    /**
     * The label of the facet.
     */
    label: string;
}

export interface ISearchInterfaceConfiguration {
    /**
     * The configuration identifier.
     */
    id: string;

    /**
     * The name of the search interface configuration.
     */
    name: string;

    /**
     * The title of the search interface configuration. Will be displayed as the HTML page title.
     */
    title: string;

    /**
     * The List of facets to display in the search interface.
     */
    facets: IFacet[];

    /**
     * The public access configuration.
     */
    accesses: IAccesses;
}

export interface IListSearchInterfacesParameters {
    /**
     * A substring that must appear in a search interface configuration name for this configuration to appear in results.
     */
    filter?: string;

    /**
     * The sort direction of the results.<br />Possible values:<br /> - `asc`: ascending order<br /> - `desc`: descending order.
     */
    order?: 'desc' | 'asc';

    /**
     * The 0-based number of the page of configurations to list.
     */
    page?: number;

    /**
     * The maximum number of configurations to include per page.
     */
    perPage?: number;
}
