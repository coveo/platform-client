import {UpdateStatusCategory} from '../Enums';

export interface MaestroVersionOptions {
    crawlingModuleVersion: string;
}

export interface CrawlingModuleEntity {
    createdDate: number;
    databaseVersion?: string;
    disabled: boolean;
    id: string;
    lastHeartbeat: number;
    lastVersionUpgrade: number;
    maestroVersion: string;
    name: string;
    organizationId: string;
    securityWorkerVersion?: string;
    updatedDate: number;
    workerVersion?: string;
}

export interface ComponentVersion {
    databaseVersion: string;
    maestroVersion: string;
    securityWorkerVersion: string;
    workerVersion: string;
}

export interface UpdateStatus {
    updateAvailable: boolean;
    updateCategory: UpdateStatusCategory;
}
