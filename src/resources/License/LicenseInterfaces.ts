export interface LicenseConnectorScheduleModel {
    refreshType: string;
    scheduleFrequencies: string[];
}

export interface LicenseConnectorModel {
    allowed: boolean;
    allowedSchedules: LicenseConnectorScheduleModel[];
    sourceVisibilities: string[];
    type: string;
}

export interface LicenseModel {
    accountId: string;
    accountName: string;
    connectors: LicenseConnectorModel[];
    department: string;
    indexBackupType: string;
    indexType: string;
    monitoringLevel: string;
    productEdition: string;
    productName: string;
    productType: string;
    properties: any;
    expirationDate: number;
    type: string;
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
    /**
     * Read access to Tableau data
     */
    TABLEAU_READ = 'TABLEAU_READ',
    /**
     * Write access to Tableau data
     */
    TABLEAU_WRITE = 'TABLEAU_WRITE',
}
