import API from '../../../../../APICore.js';
import Users from '../Users.js';
import {FilterParams, ListUsersReportsParams} from '../UsersInterfaces.js';

jest.mock('../../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Statistics', () => {
    let users: Users;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        users = new Users(api, serverlessApi);
    });

    describe('ListUserFilters', () => {
        it('should make a GET call to the user filters url', () => {
            const userId = 'CouliliZazou';
            users.listUserFilters('CouliliZazou');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Users.baseUrl}/${userId}/filters`);
        });
    });

    describe('UpdateUserFilters', () => {
        it('should make a PUT call to the specific user filters url', () => {
            const userId = 'Jida';
            const filters: FilterParams[] = [
                {
                    value: 'tuna-durgod',
                    id: true,
                },
            ];
            users.updateUserFilters(userId, filters);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Users.baseUrl}/${userId}/filters`, filters);
        });
    });

    describe('ListUsersReports', () => {
        it('should make a GET call to the specific Users url', () => {
            const userId = 'Jida';
            const params: ListUsersReportsParams = {
                includeConfig: false,
                includeGroups: false,
            };
            users.listUsersReports(userId, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Users.baseUrl}/${userId}/reports?includeConfig=false&includeGroups=false`,
            );
        });
    });

    describe('updateUsersReports', () => {
        it('should make a PUT call to the specific Users url', () => {
            const userId = 'Jida';
            const reportsIds = ['a', 'b', 'c'];

            users.updateUsersReports(userId, reportsIds);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Users.baseUrl}/${userId}/reports`, reportsIds);
        });
    });

    describe('getUser', () => {
        it('should make a GET call to /v15/users/:userId', () => {
            const userId = 'Jida';
            users.getUser(userId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Users.baseUrl}/${userId}`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to /v15/users/monitoring/health', () => {
            users.checkHealth();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Users.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to /v15/users/status with specific options', () => {
            users.checkStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Users.baseUrl}/status`);
        });
    });
});
