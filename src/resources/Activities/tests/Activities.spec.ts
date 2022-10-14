import API from '../../../APICore';
import Activity from '../Activities';
import {
    ActivityListingFilters,
    ActivityModel,
    ListActivitiesParams,
    ListActivitiesFacetsParams,
} from '../ActivitiesInterfaces';

jest.mock('../../../APICore.ts');
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

    describe('list', () => {
        it('should make a POST call to the specific Activity url', () => {
            const params: ListActivitiesParams = {};
            const activityFacet: ActivityListingFilters = {};

            activity.list(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/public`, activityFacet);
        });

        it('should make a POST call to the specific Activity url with the facetsOnly param set as true', () => {
            const params: ListActivitiesFacetsParams = {};
            const activityFacet: ActivityListingFilters = {};

            activity.listFacets(params, activityFacet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/facets/public`, activityFacet);
        });
    });

    describe('cancelActivity', () => {
        it('should make a POST call to the specific Activity url', () => {
            const activityId = 'gimli';
            const abortActivityModel: ActivityModel = {
                operation: '',
                result: '',
                state: '',
                triggeredBy: undefined,
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
