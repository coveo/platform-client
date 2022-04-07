import Resource from '../../../Resource';
import {
    SnowflakeAccountDataSharingParams,
    SnowflakeAccountDataSharingAccountModel,
    SnowflakeAccountDataSharingRegionsModel,
} from './DataShareInterfaces';

export default class DataShare extends Resource {
    static baseUrl = '/rest/ua/v15/admin/snowflake/securedatasharing';

    listSnowflakeAccount() {
        return this.api.get<SnowflakeAccountDataSharingAccountModel[]>(
            this.buildPath(`${DataShare.baseUrl}/accounts`, {org: this.api.organizationId})
        );
    }

    addSnowflakeAccount(snowflakeAccount: SnowflakeAccountDataSharingParams) {
        return this.api.post<void>(
            this.buildPath(`${DataShare.baseUrl}/accounts`, {org: this.api.organizationId}),
            snowflakeAccount
        );
    }

    deleteSnowflakeAccount(params: SnowflakeAccountDataSharingParams) {
        return this.api.delete<void>(
            this.buildPath(`${DataShare.baseUrl}/accounts`, {...params, org: this.api.organizationId})
        );
    }

    listAllowedSnowflakeRegions() {
        return this.api.get<SnowflakeAccountDataSharingRegionsModel>(
            this.buildPath(`${DataShare.baseUrl}/regions`, {org: this.api.organizationId})
        );
    }
}
