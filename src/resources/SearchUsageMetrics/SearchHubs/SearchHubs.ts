import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {
    SearchHubNameParams,
    RestSearchHub,
    UpdateSearchHubParams,
    UpdateSearchHubBucketParams,
    ListSearchHubsParams,
    ListSearchHubs,
} from './SearchHubsInterface.js';

export default class SearchHubs extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/hubs/`;

    list(params?: ListSearchHubsParams) {
        return this.api.get<ListSearchHubs>(
            this.buildPath(SearchHubs.baseUrl, {filter: params?.filter, pageSize: params?.perPage, page: params?.page, minimumQueries: params?.minimumQueries})
        );
    }

    create(params: RestSearchHub) {
        return this.api.post<void>(SearchHubs.baseUrl, params);
    }

    get({hubName}: SearchHubNameParams) {
        return this.api.get<RestSearchHub>(`${SearchHubs.baseUrl}${hubName}`);
    }

    delete({hubName}: SearchHubNameParams) {
        return this.api.delete<void>(`${SearchHubs.baseUrl}${hubName}`);
    }

    update({hubName, hub}: UpdateSearchHubParams) {
        return this.api.put<void>(`${SearchHubs.baseUrl}${hubName}`, hub);
    }

    updateBucket({hubName, bucket}: UpdateSearchHubBucketParams) {
        return this.api.put<void>(
            this.buildPath(`${SearchHubs.baseUrl}${hubName}/bucket`, {
                bucket,
            })
        );
    }
}
