import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Indexes from '../Indexes/Indexes';
import Resource from '../Resource';
import {ActivityModel, ListActivitiesParams, ActivityFacetModel} from './ActivitiesInterfaces';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }
    getResourceTypes() {
        return this.api.get<string[]>(`${Activity.getBaseUrl()}/resourcetypes`);
    }

    list(params?: ListActivitiesParams) {
        return this.api.post<PageModel<ActivityModel>>(this.buildPath(`${Indexes.baseUrl}/public`, params));
    }

    listFacets(params?: ListActivitiesParams) {
        return this.api.post<ActivityFacetModel>(this.buildPath(`${Indexes.baseUrl}/facets/public`, params));
    }

    cancelActivity(activityId: string, options: ActivityModel) {
        return this.api.put(`${Activity.getBaseUrl()}/${activityId}`, options);
    }
}
