import API from '../../../../../APICore.js';
import Snowflake from '../Snowflake.js';
import {
    GetCreditUsageParams,
    ReactivateUserParams,
    SnowflakeNetworkPolicyModel,
    SnowflakeUserModel,
} from '../SnowflakeInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Snowflake', () => {
    let snowflake: Snowflake;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        snowflake = new Snowflake(api, serverlessApi);
    });

    describe('listUsers', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            await snowflake.listUsers();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users`);
        });
    });

    describe('createUser', () => {
        it('makes a POST call to the specific Snowflake url', async () => {
            const model: SnowflakeUserModel = {
                username: 'ross.blais',
                email: 'ross.blais@gmail.com',
                daysToExpiry: 66,
            };
            await snowflake.createUser(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users`, model);
        });
    });

    describe('deleteUser', () => {
        it('makes a DELETE call to the specific Snowflake url', async () => {
            const snowflakeUser = 'ross.blais';
            await snowflake.deleteUser(snowflakeUser);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}`);
        });
    });

    describe('getUser', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            const snowflakeUser = 'ross.blais';
            await snowflake.getUser(snowflakeUser);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}`);
        });
    });

    describe('reactivateUser', () => {
        it('makes a PUT call to the specific Snowflake url', async () => {
            const snowflakeUser = 'ross.blais';
            const params: ReactivateUserParams = {
                daysToExpiry: 66,
            };
            await snowflake.reactivateUser(snowflakeUser, params);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}/expiration`, params);
        });
    });

    describe('resetPassword', () => {
        it('makes a POST call to the specific Snowflake url', async () => {
            const snowflakeUser = 'ross.blais';
            await snowflake.resetPassword(snowflakeUser);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}/passwordreset`);
        });
    });

    describe('getNetworkPolicy', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            await snowflake.getNetworkPolicy();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/networkpolicy`);
        });
    });

    describe('updateNetworkPolicy', () => {
        it('makes a PUT call to the specific Snowflake url', async () => {
            const model: SnowflakeNetworkPolicyModel = {
                allowedIpAddresses: ['coulilizazou'],
                blockedIpAddresses: ['ross'],
            };
            await snowflake.updateNetworkPolicy(model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Snowflake.baseUrl}/networkpolicy`, model);
        });
    });

    describe('getCreditUsage', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            const model: GetCreditUsageParams = {
                from: 'coulilizazou',
                to: 'ross',
            };
            await snowflake.getCreditUsage(model);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/creditusage?from=coulilizazou&to=ross`);
        });
    });

    describe('getSnowflakeReaderAccount', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            await snowflake.getSnowflakeReaderAccount();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccount`);
        });
    });

    describe('getSnowflakeReaderAccountEndpoint', () => {
        it('makes a GET call to the specific Snowflake url', async () => {
            await snowflake.getSnowflakeReaderAccountEndpoint();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccount/endpoint`);
        });
    });

    describe('createSnowflakeReaderAccount', () => {
        it('makes a POST call to the specific Snowflake url', async () => {
            await snowflake.createSnowflakeReaderAccount();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccounts`);
        });
    });

    describe('deleteSnowflakeReaderAccount', () => {
        it('makes a DELETE call to the specific Snowflake url', async () => {
            await snowflake.deleteSnowflakeReaderAccount();

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccount`);
        });
    });
});
