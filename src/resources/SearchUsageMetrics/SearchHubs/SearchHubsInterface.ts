export interface RestSearchHub {
    /**
     * The name of the search hub
     */
    name: string;

    /**
     * The usage bucket to count queries from this hub into
     */
    bucket?: string;

    /**
     * A description for the search hub
     */
    description?: string;
}

export interface SearchHubModel {
    /**
     * The search hub data
     */
    hub: RestSearchHub;
}

export interface SearchHubsList {
    /**
     * List of search hub data
     */
    hubs: RestSearchHub[];
}

export interface SearchHubNameParams {
    /**
     * The search hub name
     */
    hubName: string;
}

interface SearchHubBucketParams {
    /**
     * The search hub bucket
     */
    bucket: string;
}

export type DeleteSearchHubParams = SearchHubNameParams;

export type UpdateSearchHubParams = SearchHubNameParams & SearchHubModel;

export type UpdateSearchHubBucketParams = SearchHubNameParams & SearchHubBucketParams;
