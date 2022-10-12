import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Indexes from '../Indexes/Indexes';
import Resource from '../Resource';
import {ActivityListingOptions, ActivityModel, ListActivitiesParams} from './ActivitiesInterfaces';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }

    /**
     * @deprecated list(params?: ListFieldsParams) is kept for backward compatibility, you should now use `search(params?: FieldListingOptions)`.
     */
    list(params?: ListActivitiesParams) {
        return this.api.get<PageModel<ActivityModel>>(this.buildPath(`${Indexes.baseUrl}/page/activities`, params));
    }

    search(params?: ActivityListingOptions) {
        return this.api.post<PageModel<ActivityModel>>(this.buildPath(`${Activity.baseUrl}/search`, params));
    }

    cancelActivity(activityId: string, options: ActivityModel) {
        return this.api.put(`${Activity.getBaseUrl()}/${activityId}`, options);
    }
}
