import API from '../../../../APICore.js';
import UserActionHistoryConfiguration from '../UserActionHistoryConfiguration.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('UserActionHistoryConfiguration', () => {
    let userActionHistoryConfiguration: UserActionHistoryConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        userActionHistoryConfiguration = new UserActionHistoryConfiguration(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the User Action History Configuration base url to enable', () => {
            userActionHistoryConfiguration.create();

            expect(api.post).toHaveBeenCalledTimes(1);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the User Action History Configuration base url', () => {
            userActionHistoryConfiguration.delete();

            expect(api.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('get', () => {
        it('should make a GET call to the User Action History Configuration base url', () => {
            userActionHistoryConfiguration.get();

            expect(api.get).toHaveBeenCalledTimes(1);
        });
    });
});
