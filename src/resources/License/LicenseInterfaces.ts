import {
    IndexBackupTypes,
    IndexType,
    ProductEdition,
    ProductName,
    ProductType,
    ScheduleType,
    SourceType,
    SourceVisibility,
} from '../Enums.js';

export interface LicenseConnectorScheduleModel {
    /**
     * The refresh type of use for a given connector.
     */
    refreshType: string;
    /**
     * The frequency at which to refresh the connector.
     */
    scheduleFrequencies: ScheduleType[];
}

export interface LicenseConnectorModel {
    /**
     * Whether the connector is allowed to execute.
     */
    allowed: boolean;
    /**
     * A set of schedule models that are allowed to refresh the connector
     */
    allowedSchedules: LicenseConnectorScheduleModel[];
    /**
     * The visibility level of the connector
     */
    sourceVisibilities: SourceVisibility[];
    /**
     * The type of connector
     */
    type: SourceType;
}

export interface LicenseModel {
    /**
     * The unique identifier of the account that created the organization.
     */
    accountId: string;
    /**
     * The name of the account.
     */
    accountName: string;
    /**
     * A set of connectors that the license has access to.
     */
    connectors: LicenseConnectorModel[];
    /**
     * The department the organization was created for.
     */
    department: string;
    /**
     * A set of entitlements describing what the organization has access to.
     */
    entitlements: EntitlementModel[];
    /**
     * The date at which the license will expire in number of milliseconds since UNIX epoch.
     */
    expirationDate: number;
    /**
     * The index backup type in Coveo Cloud V2.
     */
    indexBackupType: IndexBackupTypes;
    /**
     * The type of index that is used for all sources in an organization.
     */
    indexType: IndexType;
    /**
     * The level of monitoring to apply to the license
     */
    monitoringLevel: LicenseMonitoringLevel;
    /**
     * The edition of Coveo Cloud in which the organization is registered as.
     */
    productEdition: ProductEdition;
    /**
     * The product integration of which the organization has been registered.
     */
    productName: ProductName;
    /**
     * The type of product integration in which the organization has been registered.
     */
    productType: ProductType;
    /**
     * Various properties/configurations settings that apply to the organization.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: any;
    /**
     * The type of the license
     */
    type: string;
}

export interface EntitlementModel {
    itemLimit: number;
    lrpmLimit: number;
    id: string;
    productId: string;
    productName: string;
    pricingUnit: string;
    displayName: string;
    qpmLimit: number;
    recommendationLimit: number;
    status: string;
    unlimitedQPM: boolean;
    unlimitedRecommendations: boolean;
    unlimitedUsers: boolean;
    useCase: string;
    userLimit: number;
}

/**
 * Simplified version of a License's LicenseConnectorModel
 * Mostly used to list what's possible, compared to a license who will itself only list what's enabled
 */
export interface LicenseSourceTypeModel {
    /**
     * Type of Source, e.g.CATALOG, PUSH, WEB, SALESFORCE etc.
     */
    type: string;
}

/**
 * Request parameters when updating an organization's expiration date
 */
export interface LicenseExpirationDateOptions {
    /**
     * Expiration date in epoch in milliseconds, e.g. 1625518417000
     */
    expirationDate: number;
}

/**
 * Monitoring level determines the alerts raised when a problem is detected on an organization
 */
export enum LicenseMonitoringLevel {
    /**
     * The organization is completely ignored, no one will be alerted or try to save it if the search is down
     */
    NO_MONITORING = 'NO_MONITORING',
    /**
     * The organization is monitored but problems are raised as low level alerts
     * People on maintenance will try to fix the organization if they happen to look at the low-level alerting channels
     */
    BASIC_MONITORING = 'BASIC_MONITORING',
    /**
     * The organization is actively monitored and problems raise pagers that would wake up on-duty developers at night
     */
    REGULAR_MONITORING = 'REGULAR_MONITORING',
    /**
     * The organization is actively monitored with an aggressive schedule so any potential problem
     * is identified under a minute
     */
    STRATEGIC_MONITORING = 'STRATEGIC_MONITORING',
}

/**
 * Back-up type determines which index data is backed-up periodically
 */
export enum LicenseIndexBackType {
    /**
     * The organization's index is not backed-up. If the organization is deleted all the data must be crawled again.
     */
    NONE = 'NONE',
    /**
     * The organization's index is backed-up periodically. If the organization is deleted all the data can be restored.
     */
    REGULAR = 'REGULAR',
    /**
     * The organization's index is backed-up periodically. If the organization is deleted all the data can be restored.
     * Equivalent to REGULAR
     */
    FULL = 'FULL',
}

/**
 * Configurability level of ML models
 */
export enum LicenseMlModelConfigurability {
    /**
     * No advanced configurability available
     */
    NONE = 'NONE',
    /**
     * All advanced configurability options available
     */
    FULL = 'FULL',
}

/**
 * Usage analytics visualization levels
 */
export enum LicenseDataVisualizationAccessLevel {
    /**
     * Basic access
     */
    BASIC = 'BASIC',
}
