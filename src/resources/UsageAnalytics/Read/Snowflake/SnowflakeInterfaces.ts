import {SnowflakeReaderAccountStatus} from '../../../Enums';

export interface SnowflakeUsersModel {
    snowflakeUsers: SnowflakeUserModel[];
}

export interface SnowflakeUserModel {
    /**
     * The username of the user
     */
    username: string;
    /**
     * The email of the user
     */
    email: string;
    /**
     * The number of days that the user has access to the reader account, ranging from 0 (indefinitely) to 90 days)
     */
    daysToExpiry?: number;
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

export interface SnowflakeReaderAccountEndpointModel {
    /**
     * The endpoint of the reader account
     */
    endpoint: string;
}
