import ReadServiceResource from '../ReadServiceResource.js';
import {
    SnowflakeAccountDataSharingParams,
    SnowflakeAccountDataSharingAccountModel,
    SnowflakeAccountDataSharingRegionsModel,
} from './DataShareInterfaces.js';

export default class DataShare extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/admin/snowflake/securedatasharing';

    /**
     * Retrieve Snowflake accounts currently associated in Secure Data Sharing.
     */
    listSnowflakeAccount() {
        return this.api.get<SnowflakeAccountDataSharingAccountModel[]>(
            this.buildPathWithOrg(`${DataShare.baseUrl}/accounts`),
        );
    }

    /**
     * Add a Snowflake account to Secure Data Sharing.
     */
    addSnowflakeAccount(params: SnowflakeAccountDataSharingParams) {
        return this.api.post<void>(this.buildPathWithOrg(`${DataShare.baseUrl}/accounts`), params);
    }

    /**
     * Removes a Snowflake account from Secure Data Sharing.
     */
    deleteSnowflakeAccount(params: SnowflakeAccountDataSharingParams) {
        return this.api.delete<void>(this.buildPathWithOrg(`${DataShare.baseUrl}/accounts`, params));
    }

    /**
     * Retrieve allowed Snowflake regions for Secure Data Sharing.
     */
    listAllowedSnowflakeRegions() {
        return this.api.get<SnowflakeAccountDataSharingRegionsModel>(
            this.buildPathWithOrg(`${DataShare.baseUrl}/regions`),
        );
    }
}
