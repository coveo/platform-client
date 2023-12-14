import {ReadServiceHealthApi, ReadServiceHealthResponse, ReadServiceStatusResponse} from '../ReadServiceCommon.js';
import ReadServiceResource from '../ReadServiceResource.js';
import {
    UAUserFilterParams,
    UAUsersFiltersModel,
    ListUAUsersFiltersParams,
    ListUAUsersReportsParams,
    UAUsersReportsModel,
    UAUserModel,
} from './UAUsersInterfaces.js';

export default class UAUsers extends ReadServiceResource implements ReadServiceHealthApi {
    static baseUrl = '/rest/ua/v15/users';

    /**
     * Get the data level filters that apply to a user.
     *
     * @param userId The unique identifier of a user.
     */
    listUserFilters(userId: string, params?: ListUAUsersFiltersParams) {
        return this.api.get<UAUsersFiltersModel>(this.buildPathWithOrg(`${UAUsers.baseUrl}/${userId}/filters`, params));
    }

    /**
     * Set the filters that will be applied to a user query.
     *
     * @param userId The unique identifier of a user.
     */
    updateUserFilters(userId: string, filters: UAUserFilterParams[]) {
        return this.api.put<void>(this.buildPathWithOrg(`${UAUsers.baseUrl}/${userId}/filters`), filters);
    }

    /**
     * Get the reports that a user can access.
     *
     * @param userId The unique identifier of a user.
     */
    listUsersReports(userId: string, params?: ListUAUsersReportsParams) {
        return this.api.get<UAUsersReportsModel>(this.buildPathWithOrg(`${UAUsers.baseUrl}/${userId}/reports`, params));
    }

    /**
     * Set which reports a user can access.
     *
     * @param userId The unique identifier of a user.
     */
    updateUsersReports(userId: string, reportsIDs: string[]) {
        return this.api.put<void>(this.buildPathWithOrg(`${UAUsers.baseUrl}/${userId}/reports`), reportsIDs);
    }

    /**
     * Get a user.
     *
     * @param userId The unique identifier of a user.
     */
    getUser(userId: string) {
        return this.api.get<UAUserModel>(this.buildPathWithOrg(`${UAUsers.baseUrl}/${userId}`));
    }

    checkHealth() {
        return this.api.get<ReadServiceHealthResponse>(`${UAUsers.baseUrl}/monitoring/health`);
    }

    checkStatus() {
        return this.api.get<ReadServiceStatusResponse>(`${UAUsers.baseUrl}/status`);
    }
}
