import API from '../../../../../APICore.js';
import UAUsers from '../UAUsers.js';
import {UAUserFilterParams, ListUAUsersReportsParams} from '../UAUsersInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Statistics', () => {
    let users: UAUsers;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        users = new UAUsers(api, serverlessApi);
    });

    describe('ListUserFilters', () => {
        it('should make a GET call to the user filters url', async () => {
            const userId = 'CouliliZazou';
            await users.listUserFilters('CouliliZazou');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${UAUsers.baseUrl}/${userId}/filters`);
        });
    });

    describe('UpdateUserFilters', () => {
        it('should make a PUT call to the specific user filters url', async () => {
            const userId = 'Jida';
            const filters: UAUserFilterParams[] = [
                {
                    value: 'tuna-durgod',
                    id: true,
                },
            ];
            await users.updateUserFilters(userId, filters);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${UAUsers.baseUrl}/${userId}/filters`, filters);
        });
    });

    describe('ListUsersReports', () => {
        it('should make a GET call to the specific Users url', async () => {
            const userId = 'Jida';
            const params: ListUAUsersReportsParams = {
                includeConfig: false,
                includeGroups: false,
            };
            await users.listUsersReports(userId, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${UAUsers.baseUrl}/${userId}/reports?includeConfig=false&includeGroups=false`,
            );
        });
    });

    describe('updateUsersReports', () => {
        it('should make a PUT call to the specific Users url', async () => {
            const userId = 'Jida';
            const reportsIds = ['a', 'b', 'c'];

            await users.updateUsersReports(userId, reportsIds);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${UAUsers.baseUrl}/${userId}/reports`, reportsIds);
        });
    });

    describe('getUser', () => {
        it('should make a GET call to /v15/users/:userId', async () => {
            const userId = 'Jida';
            await users.getUser(userId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${UAUsers.baseUrl}/${userId}`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to /v15/users/monitoring/health', async () => {
            await users.checkHealth();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${UAUsers.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to /v15/users/status with specific options', async () => {
            await users.checkStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${UAUsers.baseUrl}/status`);
        });
    });
});
