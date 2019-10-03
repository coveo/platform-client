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
