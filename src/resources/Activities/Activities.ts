import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    ActivityModel,
    ListActivitiesParams,
    ListActivitiesFacetsParams,
    ActivityFacetModel,
    ActivityListingFilters,
} from './ActivitiesInterfaces';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;
    static getBaseUrlAllOrgs = () => `/rest/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }
    getResourceTypes() {
        return this.api.get<string[]>(`${Activity.getBaseUrl()}/resourcetypes`);
    }

    list(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        const isPublic = activityFacet.sections?.includes('INTERNAL');
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(isPublic ? `${Activity.getBaseUrl()}/public` : `${Activity.getBaseUrl()}`, params),
            activityFacet
        );
    }

    listFacets(params?: ListActivitiesFacetsParams, activityFacet?: ActivityListingFilters) {
        const isPublic = activityFacet.sections?.includes('INTERNAL');
        return this.api.post<ActivityFacetModel>(
            this.buildPath(
                isPublic ? `${Activity.getBaseUrl()}/facets/public` : `${Activity.getBaseUrl()}/facets`,
                params
            ),
            activityFacet
        );
    }

    listAll(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(Activity.getBaseUrlAllOrgs(), params),
            activityFacet
        );
    }

    abortActivity(activityId: string, abortActivityModel: ActivityModel) {
        return this.api.post(`${Activity.getBaseUrl()}/${activityId}/abort`, abortActivityModel);
    }
}
