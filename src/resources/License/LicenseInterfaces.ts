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
