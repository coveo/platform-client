export interface LogRequestResult {
    state: string;
    url?: string;
    error?: string;
}

export interface LogRequestId {
    value: string;
}

export interface LogRequest {
    resourceId: string;
    activityId: string;
}

export enum LogRequestResourceType {
    SOURCE = 'SOURCE',
    SECURITY_PROVIDER = 'SECURITY_PROVIDER',
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
