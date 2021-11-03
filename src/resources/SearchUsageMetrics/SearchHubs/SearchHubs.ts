import API from '../../../APICore';
import Resource from '../../Resource';
import {
    SearchHubsList,
    SearchHubNameParams,
    RestSearchHub,
    SearchHubModel,
    UpdateSearchHubParams,
    DeleteSearchHubParams,
    UpdateSearchHubBucketParams,
} from './SearchHubsInterface';

export default class SearchHubs extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/hubs`;

    list() {
        return this.api.get<SearchHubsList>(
            this.buildPath(SearchHubs.baseUrl, {organizationId: this.api.organizationId})
        );
    }

    create(params: SearchHubModel) {
        return this.api.post<void>(this.buildPath(SearchHubs.baseUrl, {organizationId: this.api.organizationId}), {
            ...params,
        });
    }

    get({hubName}: SearchHubNameParams) {
        return this.api.get<RestSearchHub>(
            this.buildPath(`${SearchHubs.baseUrl}/${hubName}`, {organizationId: this.api.organizationId})
        );
    }

    delete({hubName}: DeleteSearchHubParams) {
        return this.api.delete<void>(
            this.buildPath(`${SearchHubs.baseUrl}/${hubName}`, {organizationId: this.api.organizationId})
        );
    }

    update({hubName, hub}: UpdateSearchHubParams) {
        return this.api.put<void>(
            this.buildPath(`${SearchHubs.baseUrl}/${hubName}`, {organizationId: this.api.organizationId}),
            {hub}
        );
    }

    updateBucket({hubName, bucket}: UpdateSearchHubBucketParams) {
        return this.api.put<void>(
            this.buildPath(`${SearchHubs.baseUrl}/${hubName}`, {
                bucket,
                organizationId: this.api.organizationId,
            })
        );
    }
}
