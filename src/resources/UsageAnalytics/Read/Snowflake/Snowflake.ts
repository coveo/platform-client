import {SnowflakeReaderAccountStatus} from '../../../Enums';
import Resource from '../../../Resource';
import {
    GetCreditUsageParams,
    SnowflakeCreditUsageModel,
    SnowflakeNetworkPolicyModel,
    SnowflakeReaderAccountEndpointModel,
    SnowflakeReaderAccountStatusModel,
    SnowflakeUserModel,
    SnowflakeUsersModel,
} from './SnowflakeInterfaces';

export default class Snowflake extends Resource {
    static baseUrl = '/rest/ua/v15/admin/snowflake';

    listUsers() {
        return this.api.get<SnowflakeUsersModel>(
            this.buildPath(`${Snowflake.baseUrl}/users`, {org: this.api.organizationId})
        );
    }

    createUser(model: SnowflakeUserModel) {
        return this.api.post<SnowflakeUserModel>(
            this.buildPath(`${Snowflake.baseUrl}/users`, {org: this.api.organizationId}),
            model
        );
    }

    deleteUser(snowflakeUser: string) {
        return this.api.delete<void>(
            this.buildPath(`${Snowflake.baseUrl}/users/${snowflakeUser}`, {org: this.api.organizationId})
        );
    }

    getUser(snowflakeUser: string) {
        return this.api.get<SnowflakeUserModel>(
            this.buildPath(`${Snowflake.baseUrl}/users/${snowflakeUser}`, {org: this.api.organizationId})
        );
    }

    resetPassword(snowflakeUser: string) {
        return this.api.post<void>(
            this.buildPath(`${Snowflake.baseUrl}/users/${snowflakeUser}/passwordreset`, {org: this.api.organizationId})
        );
    }

    getNetworkPolicy() {
        return this.api.get<SnowflakeNetworkPolicyModel>(
            this.buildPath(`${Snowflake.baseUrl}/networkpolicy`, {org: this.api.organizationId})
        );
    }

    updateNetworkPolicy(model: SnowflakeNetworkPolicyModel) {
        return this.api.put<void>(
            this.buildPath(`${Snowflake.baseUrl}/networkpolicy`, {org: this.api.organizationId}),
            model
        );
    }

    getCreditUsage(params: GetCreditUsageParams) {
        return this.api.get<SnowflakeCreditUsageModel>(
            this.buildPath(`${Snowflake.baseUrl}/creditusage`, {...params, org: this.api.organizationId})
        );
    }

    getSnowflakeReaderAccount() {
        return this.api.get<SnowflakeReaderAccountStatusModel>(
            this.buildPath(`${Snowflake.baseUrl}/readeraccount`, {org: this.api.organizationId})
        );
    }

    getSnowflakeReaderAccountEndpoint() {
        return this.api.get<SnowflakeReaderAccountEndpointModel>(
            this.buildPath(`${Snowflake.baseUrl}/readeraccount/endpoint`, {org: this.api.organizationId})
        );
    }

    createSnowflakeReaderAccount() {
        return new Promise<SnowflakeReaderAccountStatusModel>((resolve) =>
            resolve({snowflakeReaderAccountStatus: SnowflakeReaderAccountStatus.creating})
        );
        /*
         * TODO uncomment when the API call is public
         */
        // return this.api.put<SnowflakeReaderAccountStatusModel>(
        //     this.buildPath(`${Snowflake.baseUrl}/readeraccount`, {org: this.api.organizationId})
        // );
    }
}
