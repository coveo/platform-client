import API from '../../../../APICore.js';
import UserActionHistoryConfiguration from '../UserActionHistoryConfiguration.js';

jest.mock('../../../../APICore.js');

describe('UserActionHistoryConfiguration', () => {
    let userActionHistoryConfiguration: UserActionHistoryConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        userActionHistoryConfiguration = new UserActionHistoryConfiguration(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the User Action History Configuration base url to enable', async () => {
            await userActionHistoryConfiguration.create();

            expect(api.post).toHaveBeenCalledTimes(1);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the User Action History Configuration base url', async () => {
            await userActionHistoryConfiguration.delete();

            expect(api.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('get', () => {
        it('should make a GET call to the User Action History Configuration base url', async () => {
            await userActionHistoryConfiguration.get();

            expect(api.get).toHaveBeenCalledTimes(1);
        });
    });
});
