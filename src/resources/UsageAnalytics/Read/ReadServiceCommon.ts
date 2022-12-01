/**
 * Represents the health of the service.
 */
export enum ReadServiceHealthEnum {
    UP = 'up',
    UNAVAILABLE = 'unavailable',
    DEGRADED = 'degraded',
}

export interface ReadServiceHealthResponse {
    /** The health status of the service. */
    status: ReadServiceHealthEnum;
}

/**
 * Represents the status of the service.
 */
export enum ReadServiceStatusEnum {
    ONLINE = 'online',
    UNAVAILABLE = 'unavailable',
    DEGRADED = 'degraded',
}

export interface ReadServiceStatusResponse {
    /** The status of the service. */
    status: ReadServiceStatusEnum;
}

export interface ReadServiceHealthApi {
    /**
     * Health check for the service.
     */
    checkHealth(): Promise<ReadServiceHealthResponse>;

    /**
     * Get the service status.
     */
    checkStatus(): Promise<ReadServiceStatusResponse>;
}
