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
