import {SnowflakeReaderAccountStatus} from '../../../Enums.js';
import {TimeRangeParamParts} from '../CommonParamParts.js';

export interface SnowflakeUsersModel {
    snowflakeUsers: SnowflakeUserModel[];
}

export interface SnowflakeUserModel {
    /**
     * The username of the user.
     */
    username: string;
    /**
     * The email of the user.
     */
    email: string;
    /**
     * The number of days that the user has access to the reader account.
     * Ranging from 0 (indefinitely) to 90 days.
     */
    daysToExpiry?: number;
}

export interface ReactivateUserParams {
    daysToExpiry?: number;
}

export interface ReactivateUserModel {
    name: string;
    email: string;
    daysToExpiry?: number | null;
}

export interface SnowflakeNetworkPolicyModel {
    allowedIpAddresses: string[];
    blockedIpAddresses: string[];
}

export interface GetCreditUsageParams extends TimeRangeParamParts {}

export interface SnowflakeCreditUsageModel {
    creditsUsed: number;
}

export interface SnowflakeReaderAccountStatusModel {
    /**
     * The status of the create reader account request.
     */
    snowflakeReaderAccountStatus: SnowflakeReaderAccountStatus;
}

export interface SnowflakeReaderAccountEndpointModel {
    /**
     * The endpoint of the reader account.
     */
    endpoint: string;
}
