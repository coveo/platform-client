import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {ActivityModel, ListActivitiesParams, ActivityFacetModel, ActivityListingFilters} from './ActivitiesInterfaces';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }
    getResourceTypes() {
        return this.api.get<string[]>(`${Activity.getBaseUrl()}/resourcetypes`);
    }

    list(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(`${Activity.getBaseUrl()}/public`, params),
            activityFacet
        );
    }

    listFacets(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        return this.api.post<ActivityFacetModel>(
            this.buildPath(`${Activity.getBaseUrl()}/facets/public`, params),
            activityFacet
        );
    }

    abortActivity(activityId: string, abortActivityModel: ActivityModel, params?: ListActivitiesParams) {
        return this.api.post(
            this.buildPath(`${Activity.getBaseUrl()}/${activityId}/abort`, params),
            abortActivityModel
        );
    }
}
