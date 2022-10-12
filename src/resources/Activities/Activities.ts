import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Indexes from '../Indexes/Indexes';
import Resource from '../Resource';
import {ActivityModel, ListActivitiesParams} from './ActivitiesInterfaces';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }
    getResourceTypes() {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/resourcetypes`);
    }

    /**
     * @deprecated list(params?: ListFieldsParams) is kept for backward compatibility, you should now use `search(params?: FieldListingOptions)`.
     */
    list(params?: ListActivitiesParams) {
        return this.api.post<PageModel<ActivityModel>>(this.buildPath(`${Indexes.baseUrl}/public`, params));
    }

    listFacets(params?: ListActivitiesParams) {
        return this.api.post<PageModel<ActivityModel>>(this.buildPath(`${Indexes.baseUrl}/facets/public`, params));
    }

    search(params?: ListActivitiesParams) {
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(`${Activity.getBaseUrl()}/public/search`, params)
        );
    }

    searchFacets(params?: ListActivitiesParams) {
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(`${Activity.getBaseUrl()}/facets/public/search`, params)
        );
    }

    cancelActivity(activityId: string, options: ActivityModel) {
        return this.api.put(`${Activity.getBaseUrl()}/${activityId}`, options);
    }
}
