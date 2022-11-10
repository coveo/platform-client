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

export enum CrawlingModuleLogRequestLogType {
    MAESTRO = 'MAESTRO',
    WORKER = 'WORKER',
}

export enum CrawlingModuleLogRequestState {
    CREATED = 'CREATED',
    ERROR = 'ERROR',
    RUNNING = 'RUNNING',
    SUCCESSFUL = 'SUCCESSFUL',
    TIMEOUT = 'TIMEOUT',
}

export interface CrawlingModuleLogRequestModel {
    createdDate: number;
    id: string;
    instanceId: string;
    logType: CrawlingModuleLogRequestLogType;
    operationId: string;
    state: CrawlingModuleLogRequestState;
}

export interface CreateCrawlingModuleLogRequestModel {
    instanceId: string;
    logType: CrawlingModuleLogRequestLogType;
    operationId: string;
}

export interface CrawlingModuleLogRequestDownloadModel {
    info: string;
    state: CrawlingModuleLogRequestState;
    url: string;
}
