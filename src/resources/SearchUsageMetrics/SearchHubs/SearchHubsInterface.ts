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

export interface SearchHubNameParams {
    /**
     * The search hub name
     */
    hubName: string;
}

interface SearchHubModel {
    /**
     * The search hub data
     */
    hub: RestSearchHub;
}

interface SearchHubBucketParams {
    /**
     * The search hub bucket
     */
    bucket: string;
}

export type UpdateSearchHubParams = SearchHubNameParams & SearchHubModel;

export type UpdateSearchHubBucketParams = SearchHubNameParams & SearchHubBucketParams;
