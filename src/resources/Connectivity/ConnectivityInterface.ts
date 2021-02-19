export interface LogRequestResult {
    state: string;
    url?: string;
    error?: string;
}

export interface LogRequest {
    resourceId: string;
    activityId: string;
}
