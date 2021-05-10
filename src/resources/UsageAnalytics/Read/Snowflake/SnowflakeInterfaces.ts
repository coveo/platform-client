import {SnowflakeReaderAccountStatus} from '../../../Enums';

export interface SnowflakeUsersModel {
    snowflakeUsers: SnowflakeUserModel[];
}

export interface SnowflakeUserModel {
    username: string;
    email: string;
}

export interface SnowflakeNetworkPolicyModel {
    allowedIpAddresses: string[];
    blockedIpAddresses: string[];
}

export interface GetCreditUsageParams {
    /**
     * The beginning date of the date range.
     * ISO8601 format 'YYYY-MM-DDThh:mm:ss.sssZ'
     */
    from: string;
    /**
     * The end date of the date range.
     * ISO8601 format 'YYYY-MM-DDThh:mm:ss.sssZ'
     */
    to: string;
}

export interface SnowflakeCreditUsageModel {
    creditsUsed: number;
}

export interface SnowflakeReaderAccountStatusModel {
    /**
     * The status of the create reader account request
     */
    snowflakeReaderAccountStatus: SnowflakeReaderAccountStatus;
}
