import API from '../../../APICore';
import Indexes from '../../Indexes/Indexes';
import Activity from '../Activities';
import {ActivityListingOptions, ActivityModel, ListActivitiesParams} from '../ActivitiesInterfaces';

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

    describe('list', () => {
        it('should make a GET call to the specific Activity url', () => {
            const params: ListActivitiesParams = {};

            activity.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/activities`);
        });

        it('should make a GET call to the specific Activity url with the facetsOnly param set as true', () => {
            const params: ListActivitiesParams = {facetsOnly: true};

            activity.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/activities?facetsOnly=true`);
        });
    });
    // to fix
    describe('search', () => {
        it.skip('should make a GET call to the specific Activity url', () => {
            const params: ActivityListingOptions = {};

            activity.search(params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/search`);
        });
    });

    describe('cancelActivity', () => {
        it('should make a PUT call to the specific Activity url', () => {
            const activityId = 'gimli';
            const activityModel: ActivityModel = {
                operation: '',
                result: '',
                state: '',
                triggeredBy: undefined,
            };

            activity.cancelActivity(activityId, activityModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Activity.getBaseUrl()}/${activityId}`, activityModel);
        });
    });
});
