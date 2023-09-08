import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    ActivityModel,
    ListActivitiesParams,
    ListActivitiesFacetsParams,
    ActivityFacetModel,
    ActivityListingFilters,
    ActivitiesResourceAndOperations,
} from './ActivitiesInterfaces.js';
import {ActivityOperation} from '../Enums.js';

export default class Activity extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/activities`;
    static getBaseUrlAllOrgs = () => `/rest/activities`;

    get(activityId: string) {
        return this.api.get<ActivityModel>(`${Activity.getBaseUrl()}/${activityId}`);
    }
    getResourceTypes() {
        return this.api.get<string[]>(`${Activity.getBaseUrl()}/resourcetypes`);
    }

    /**
     * Retrieves a list of ActivityOperation for a given organization.
     *
     * @param {boolean} includeInternal Whether or not to include internal operations.
     * @returns {Promise<ActivityOperation[]>} A list of activity operations.
     */
    getOperationTypes(includeInternal = false) {
        const operationTypesUrl = `${Activity.getBaseUrl()}/operationtypes`;
        return this.api.get<ActivityOperation[]>(includeInternal ? `${operationTypesUrl}/all` : operationTypesUrl);
    }

    getListOfResourcesAndOperations() {
        return this.api.get<ActivitiesResourceAndOperations>(`${Activity.getBaseUrl()}/resourcesandoperations`);
    }

    list(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        const isPublic = !Boolean(activityFacet?.sections?.includes('INTERNAL'));
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(isPublic ? `${Activity.getBaseUrl()}/public` : Activity.getBaseUrl(), params),
            activityFacet,
        );
    }

    listFacets(params?: ListActivitiesFacetsParams, activityFacet?: ActivityListingFilters) {
        const isPublic = !Boolean(activityFacet?.sections?.includes('INTERNAL'));
        return this.api.post<ActivityFacetModel>(
            this.buildPath(
                isPublic ? `${Activity.getBaseUrl()}/facets/public` : `${Activity.getBaseUrl()}/facets`,
                params,
            ),
            activityFacet,
        );
    }

    listAll(params?: ListActivitiesParams, activityFacet?: ActivityListingFilters) {
        return this.api.post<PageModel<ActivityModel>>(
            this.buildPath(Activity.getBaseUrlAllOrgs(), params),
            activityFacet,
        );
    }

    abortActivity(activityId: string, abortActivityModel: ActivityModel) {
        return this.api.post(`${Activity.getBaseUrl()}/${activityId}/abort`, abortActivityModel);
    }
}
