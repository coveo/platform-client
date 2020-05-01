import {UpdateStatusCategory} from '../Enums';

export interface MaestroVersionOptions {
    crawlingModuleVersion: string;
}

export interface CrawlingModule {
    createdDate: 0;
    databaseVersion?: string;
    disabled: true;
    id: string;
    lastHeartbeat: 0;
    lastVersionUpgrade: 0;
    maestroVersion: string;
    name: string;
    organizationId: string;
    securityWorkerVersion?: string;
    updatedDate: 0;
    workerVersion?: string;
}

export interface ComponentVersion {
    databaseVersion: string;
    maestroVersion: string;
    securityWorkerVersion: string;
    workerVersion: string;
}

export interface UpdateStatus {
    updateAvailable: true;
    updateCategory: UpdateStatusCategory;
}
