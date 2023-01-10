import API from '../../../../../APICore.js';
import Snowflake from '../Snowflake.js';
import {GetCreditUsageParams, SnowflakeNetworkPolicyModel, SnowflakeUserModel} from '../SnowflakeInterfaces.js';

jest.mock('../../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Snowflake', () => {
    let snowflake: Snowflake;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        snowflake = new Snowflake(api, serverlessApi);
    });

    describe('listUsers', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            snowflake.listUsers();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users`);
        });
    });

    describe('createUser', () => {
        it('makes a POST call to the specific Snowflake url', () => {
            const model: SnowflakeUserModel = {
                username: 'ross.blais',
                email: 'ross.blais@gmail.com',
                daysToExpiry: 66,
            };
            snowflake.createUser(model);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users`, model);
        });
    });

    describe('deleteUser', () => {
        it('makes a DELETE call to the specific Snowflake url', () => {
            const snowflakeUser = 'ross.blais';
            snowflake.deleteUser(snowflakeUser);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}`);
        });
    });

    describe('getUser', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            const snowflakeUser = 'ross.blais';
            snowflake.getUser(snowflakeUser);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}`);
        });
    });

    describe('resetPassword', () => {
        it('makes a POST call to the specific Snowflake url', () => {
            const snowflakeUser = 'ross.blais';
            snowflake.resetPassword(snowflakeUser);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/users/${snowflakeUser}/passwordreset`);
        });
    });

    describe('getNetworkPolicy', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            snowflake.getNetworkPolicy();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/networkpolicy`);
        });
    });

    describe('updateNetworkPolicy', () => {
        it('makes a PUT call to the specific Snowflake url', () => {
            const model: SnowflakeNetworkPolicyModel = {
                allowedIpAddresses: ['coulilizazou'],
                blockedIpAddresses: ['ross'],
            };
            snowflake.updateNetworkPolicy(model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Snowflake.baseUrl}/networkpolicy`, model);
        });
    });

    describe('getCreditUsage', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            const model: GetCreditUsageParams = {
                from: 'coulilizazou',
                to: 'ross',
            };
            snowflake.getCreditUsage(model);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/creditusage?from=coulilizazou&to=ross`);
        });
    });

    describe('getSnowflakeReaderAccount', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            snowflake.getSnowflakeReaderAccount();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccount`);
        });
    });

    describe('getSnowflakeReaderAccountEndpoint', () => {
        it('makes a GET call to the specific Snowflake url', () => {
            snowflake.getSnowflakeReaderAccountEndpoint();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccount/endpoint`);
        });
    });

    describe('putSnowflakeReaderAccount', () => {
        it('makes a PUT call to the specific Snowflake url', () => {
            snowflake.createSnowflakeReaderAccount();

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Snowflake.baseUrl}/readeraccounts`);
        });
    });
});
