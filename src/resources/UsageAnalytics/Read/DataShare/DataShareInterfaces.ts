export interface SnowflakeAccountDataSharingAccountModel {
    /**
     * The Snowflake account locator.
     */
    locator: string;
    /**
     * The region the Snowflake account resides in.
     */
    region: string;
    /**
     * The date and time at which the share was initiated.
     */
    createdAt?: string;
}

export interface SnowflakeAccountDataSharingParams {
    /**
     * The snowflake account locator.
     */
    accountLocator: string;
    /**
     * The region of the snowflake account.
     */
    snowflakeRegion: string;
}

export interface SnowflakeAccountDataSharingRegionsModel {
    /**
     * The primary Snowflake region.
     */
    primaryRegion: string;
    /**
     * Other supported Snowflake regions.
     */
    secondaryRegions: string[];
}
