import {Paginated} from '../../BaseInterfaces.js';

export interface ListSearchHubs {
    /**
     * The array of search hubs
     */
    hubs: RestSearchHub[];

    /**
     * The number of search hub created on the organization
     */
    totalCount: number;
}
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

export interface ListSearchHubsParams extends Paginated {
    /**
     * The free-form string to filter the returned list based on the values of the search hub attributes
     */
    filter?: string;

    /**
     * The maximum number of search hubs to list per page
     * @default `100`
     */
    perPage?: number;

    /**
     * The 0-based index number of page to list
     * @default `0`
     */
    page?: number;
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
