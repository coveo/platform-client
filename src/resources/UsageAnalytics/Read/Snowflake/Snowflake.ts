import ReadServiceResource from '../ReadServiceResource.js';
import {
    GetCreditUsageParams,
    ReactivateUserModel,
    ReactivateUserParams,
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
     *
     * @param model The user to create.
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
     * Reactivate and set a user's expiration in a Snowflake reader account.
     *
     * @param snowflakeUser The login name for the Snowflake user.
     * @param params The number of days until the user's expiration date.
     */
    reactivateUser(snowflakeUser: string, params: ReactivateUserParams) {
        return this.api.put<ReactivateUserModel>(
            this.buildPathWithOrg(`${Snowflake.baseUrl}/users/${snowflakeUser}/expiration`),
            params,
        );
    }

    /**
     * Get the details of the active network policy for a Snowflake reader account.
     */
    getNetworkPolicy() {
        return this.api.get<SnowflakeNetworkPolicyModel>(this.buildPathWithOrg(`${Snowflake.baseUrl}/networkpolicy`));
    }

    /**
     * Set the details of the active network policy for a Snowflake reader account.
     *
     * @param model The network policy to create.
     */
    updateNetworkPolicy(model: SnowflakeNetworkPolicyModel) {
        return this.api.put<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/networkpolicy`), model);
    }

    /**
     * Get the amount of compute credits used by a Snowflake reader account within a date range.
     *
     * @param params The time range to get the amount of compute credits.
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

    /**
     * Delete a reader acocunt.
     */
    deleteSnowflakeReaderAccount() {
        return this.api.delete<void>(this.buildPathWithOrg(`${Snowflake.baseUrl}/readeraccount`));
    }
}
