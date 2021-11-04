import API from '../../../APICore';
import Resource from '../../Resource';
import {
    SearchHubNameParams,
    RestSearchHub,
    SearchHubModel,
    UpdateSearchHubParams,
    UpdateSearchHubBucketParams,
} from './SearchHubsInterface';

export default class SearchHubs extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/hubs/`;

    list() {
        return this.api.get<{hubs: RestSearchHub[]}>(SearchHubs.baseUrl);
    }

    create(params: SearchHubModel) {
        return this.api.post<void>(SearchHubs.baseUrl, params);
    }

    get({hubName}: SearchHubNameParams) {
        return this.api.get<RestSearchHub>(`${SearchHubs.baseUrl}${hubName}`);
    }

    delete({hubName}: SearchHubNameParams) {
        return this.api.delete<void>(`${SearchHubs.baseUrl}${hubName}`);
    }

    update({hubName, hub}: UpdateSearchHubParams) {
        return this.api.put<void>(`${SearchHubs.baseUrl}${hubName}`, {hub});
    }

    updateBucket({hubName, bucket}: UpdateSearchHubBucketParams) {
        return this.api.put<void>(
            this.buildPath(`${SearchHubs.baseUrl}${hubName}/bucket`, {
                bucket,
            })
        );
    }
}
