import Resource from '../../../Resource';
import {
    FilterParams,
    UsersFiltersModel,
    ListUsersFiltersParams,
    ListUsersReportsParams,
    UsersReportsModel,
    UserModel,
    UsersStatusModel,
} from './UsersInterfaces';

export default class Users extends Resource {
    static baseUrl = '/rest/ua/v15/users';

    listUserFilters(userId: string, params?: ListUsersFiltersParams) {
        return this.api.get<UsersFiltersModel>(
            this.buildPath(`${Users.baseUrl}/${userId}/filters`, {...params, org: this.api.organizationId})
        );
    }

    updateUserFilters(userId: string, filters: FilterParams[]) {
        return this.api.put<void>(
            this.buildPath(`${Users.baseUrl}/${userId}/filters`, {org: this.api.organizationId}),
            filters
        );
    }

    listUsersReports(userId: string, params?: ListUsersReportsParams) {
        return this.api.get<UsersReportsModel>(
            this.buildPath(`${Users.baseUrl}/${userId}/reports`, {...params, org: this.api.organizationId})
        );
    }

    updateUsersReports(userId: string, reportsIDs: string[]) {
        return this.api.put<void>(
            this.buildPath(`${Users.baseUrl}/${userId}/reports`, {org: this.api.organizationId}),
            reportsIDs
        );
    }

    getUsersServiceHealth() {
        return this.api.get<UsersStatusModel>(`${Users.baseUrl}/monitoring/health`);
    }

    getUsersServiceStatus() {
        return this.api.get<UsersStatusModel>(`${Users.baseUrl}/status`);
    }

    getUser(userId: string) {
        return this.api.get<UserModel>(this.buildPath(`${Users.baseUrl}/${userId}`, {org: this.api.organizationId}));
    }
}
