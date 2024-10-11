import API from '../../../APICore.js';
import Activity from '../Activities.js';
import {
    ActivityListingFilters,
    ActivityModel,
    ListActivitiesParams,
    ListActivitiesFacetsParams,
    TriggeredByAttributes,
} from '../ActivitiesInterfaces.js';

jest.mock('../../../APICore.ts.js');

describe('Activity', () => {
    let activity: Activity;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        activity = new Activity(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific Activity url', async () => {
            const activityId = 'gandalf';
            await activity.get(activityId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/${activityId}`);
        });
    });

    describe('getResourceTypes', () => {
        it('should make a GET call to the specific Activity url', async () => {
            await activity.getResourceTypes();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/resourcetypes`);
        });
    });

    describe('getOperationTypes', () => {
        it('should make a GET call to return non internal operation types', async () => {
            await activity.getOperationTypes();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/operationtypes`);
        });

        it('should make a GET call to return all operation types', async () => {
            await activity.getOperationTypes(true);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/operationtypes/all`);
        });
    });

    describe('getListOfResourcesAndOperations', () => {
        it('should make a GET call to return all resources and their operation types', async () => {
            await activity.getListOfResourcesAndOperations();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/resourcesandoperations`);
        });
    });

    describe('list', () => {
        it('should make a POST call to the specific Activity url to fetch activities of an organization', async () => {
            const params: ListActivitiesParams = {};
            const activityFacet: ActivityListingFilters = {sections: ['INTERNAL']};
            await activity.list(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Activity.getBaseUrl(), activityFacet);
        });

        it('should make a POST call to the specific Activity url to fetch public activities of an organization', async () => {
            const params: ListActivitiesParams = {};
            const activityFacet: ActivityListingFilters = {};
            await activity.list(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/public`, activityFacet);
        });
    });

    describe('listFacets', () => {
        it('should make a POST call to the specific Activity url to fetch the facets', async () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {sections: ['INTERNAL']};
            await activity.listFacets(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/facets`, activityFacet);
        });

        it('should make a POST call to the specific Activity url to fetch the public facets', async () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {};
            await activity.listFacets(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/facets/public`, activityFacet);
        });
    });

    describe('listAll', () => {
        it('should make a POST call to the specific Activity url to fetch activities of all organizations', async () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {};
            await activity.listAll(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Activity.getBaseUrlAllOrgs(), activityFacet);
        });
    });

    describe('abortActivity', () => {
        it('should make a POST call to the specific Activity url', async () => {
            const activityId = 'gimli';
            const triggeredBy: TriggeredByAttributes = {
                type: 'randomType',
            };
            const abortActivityModel: ActivityModel = {
                operation: '',
                result: '',
                state: '',
                triggeredBy,
                abortReason: '',
                resourceId: '',
                resourceType: '',
            };

            await activity.abortActivity(activityId, abortActivityModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/${activityId}/abort`, abortActivityModel);
        });
    });
});
