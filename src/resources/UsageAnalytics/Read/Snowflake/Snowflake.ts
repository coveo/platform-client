import ReadServiceResource from '../ReadServiceResource.js';
import {
    GetCreditUsageParams,
    SnowflakeCreditUsageModel,
    SnowflakeNetworkPolicyModel,
    SnowflakeReaderAccountEndpointModel,
    SnowflakeReaderAccountStatusModel,
    SnowflakeUserModel,
    SnowflakeUsersModel,
} from './SnowflakeInterfaces.js';

export default class Snowflake extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/admin/snowflake';

    /**
     * Get the details for all users from a Snowflake reader account.
     */
    listUsers() {
        return this.api.get<SnowflakeUsersModel>(this.buildPathWithOrg(`${Snowflake.baseUrl}/users`));
    }

    /**
     * Create a new user within a Snowflake reader account.
     */
    createUser(model: SnowflakeUserModel) {
        return this.api.post<SnowflakeUserModel>(this.buildPathWithOrg(`${Snowflake.baseUrl}/users`), model);
    }

    /**
     * Delete a user from a Snowflake reader account.
     *
     * @param snowflakeUser The login name for the Snowflake user.
     */
    deleteUser(snowflakeUser: string) {
        return this.api.delete<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/users/${snowflakeUser}`));
    }

    /**
     * Get the details for a specific user from a Snowflake reader account.
     *
     * @param snowflakeUser The login name for the Snowflake user.
     */
    getUser(snowflakeUser: string) {
        return this.api.get<SnowflakeUserModel>(this.buildPathWithOrg(`${Snowflake.baseUrl}/users/${snowflakeUser}`));
    }

    /**
     * Reset a user's password in a Snowflake reader account.
     *
     * @param snowflakeUser The login name for the Snowflake user.
     */
    resetPassword(snowflakeUser: string) {
        return this.api.post<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/users/${snowflakeUser}/passwordreset`));
    }

    /**
     * Get the details of the active network policy for a Snowflake reader account.
     */
    getNetworkPolicy() {
        return this.api.get<SnowflakeNetworkPolicyModel>(this.buildPathWithOrg(`${Snowflake.baseUrl}/networkpolicy`));
    }

    /**
     * Set the details of the active network policy for a Snowflake reader account.
     */
    updateNetworkPolicy(model: SnowflakeNetworkPolicyModel) {
        return this.api.put<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/networkpolicy`), model);
    }

    /**
     * Get the amount of compute credits used by a Snowflake reader account within a date range.
     */
    getCreditUsage(params: GetCreditUsageParams) {
        return this.api.get<SnowflakeCreditUsageModel>(
            this.buildPathWithOrg(`${Snowflake.baseUrl}/creditusage`, params),
        );
    }

    /**
     * Retrieve Snowflake reader account state.
     */
    getSnowflakeReaderAccount() {
        return this.api.get<SnowflakeReaderAccountStatusModel>(
            this.buildPathWithOrg(`${Snowflake.baseUrl}/readeraccount`),
        );
    }

    /**
     * Retrieve Snowflake reader account endpoint.
     */
    getSnowflakeReaderAccountEndpoint() {
        return this.api.get<SnowflakeReaderAccountEndpointModel>(
            this.buildPathWithOrg(`${Snowflake.baseUrl}/readeraccount/endpoint`),
        );
    }

    /**
     * Create a reader account.
     */
    createSnowflakeReaderAccount() {
        return this.api.post<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/readeraccounts`));
    }
}
