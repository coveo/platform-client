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
const APIMock: jest.Mock<API> = API as any;

describe('Activity', () => {
    let activity: Activity;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        activity = new Activity(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific Activity url', () => {
            const activityId = 'gandalf';
            activity.get(activityId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/${activityId}`);
        });
    });

    describe('getResourceTypes', () => {
        it('should make a GET call to the specific Activity url', () => {
            activity.getResourceTypes();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/resourcetypes`);
        });
    });

    describe('getOperationTypes', () => {
        it('should make a GET call to return non internal operation types', () => {
            activity.getOperationTypes();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/operationtypes`);
        });

        it('should make a GET call to return all operation types', () => {
            activity.getOperationTypes(true);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/operationtypes/all`);
        });
    });

    describe('list', () => {
        it('should make a POST call to the specific Activity url to fetch activities of an organization', () => {
            const params: ListActivitiesParams = {};
            const activityFacet: ActivityListingFilters = {sections: ['INTERNAL']};
            activity.list(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Activity.getBaseUrl(), activityFacet);
        });

        it('should make a POST call to the specific Activity url to fetch public activities of an organization', () => {
            const params: ListActivitiesParams = {};
            const activityFacet: ActivityListingFilters = {};
            activity.list(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/public`, activityFacet);
        });
    });

    describe('listFacets', () => {
        it('should make a POST call to the specific Activity url to fetch the facets', () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {sections: ['INTERNAL']};
            activity.listFacets(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/facets`, activityFacet);
        });

        it('should make a POST call to the specific Activity url to fetch the public facets', () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {};
            activity.listFacets(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/facets/public`, activityFacet);
        });
    });

    describe('listAll', () => {
        it('should make a POST call to the specific Activity url to fetch activities of all organizations', () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {};
            activity.listAll(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Activity.getBaseUrlAllOrgs(), activityFacet);
        });
    });

    describe('abortActivity', () => {
        it('should make a POST call to the specific Activity url', () => {
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

            activity.abortActivity(activityId, abortActivityModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/${activityId}/abort`, abortActivityModel);
        });
    });
});
