import {UpdateStatusCategory} from '../Enums';

export interface MaestroVersionOptions {
    crawlingModuleVersion: string;
}

export interface CrawlingModuleStatus {
    /**
     * Whether the Crawling Module is using a proxy or not.
     */
    usingProxy: boolean;
    /**
     * Whether auto-updates are enabled or not on this setup.
     */
    autoUpdateEnable: boolean;
    /**
     * Whether remote log requests are enabled or not.
     * This enables the client to query logs directly from the platform.
     */
    logRequestEnable: boolean;
    /**
     * Frequency at which the setup polls for updates.
     */
    autoUpdateFrequency: number;
    /**
     * The number of crawler workers set in the configuration of the Crawling Module.
     */
    numberOfCrawlerWorkers: number;
    /**
     * The number of security provider set in the configuration of the Crawling Module.
     */
    numberOfSecurityWorkers: number;
}

export interface CrawlingModuleEntity {
    /**
     * Creation date.
     */
    createdDate: number;
    /**
     * @deprecated Should not be used.
     */
    databaseVersion?: string;
    /**
     * After a given period, a Crawling Module that doesn't report to the
     * platform is going be disabled. It is considered unable to process job.
     */
    disabled: boolean;
    /**
     * Id of the Crawling Module.
     */
    id: string;
    /**
     * The last time the Crawling Module sent its status to the platform.
     */
    lastHeartbeat: number;
    /**
     * The latest date at which the Crawling Module update itself.
     */
    lastVersionUpgrade: number;
    /**
     * The version of the Crawling Module.
     */
    maestroVersion: string;
    /**
     * The name of the Crawling Module.
     */
    name: string;
    /**
     * Organization id with which the Crawling Module is linked.
     */
    organizationId: string;
    /**
     * @deprecated Should not be used.
     */
    securityWorkerVersion?: string;
    /**
     * Latest updated date.
     */
    updatedDate: number;
    /**
     * @deprecated Should not be used.
     */
    workerVersion?: string;
    /**
     * Advanced information about a crawling module, see @type {CrawlingModuleStatus}.
     */
    status?: CrawlingModuleStatus;
}

export interface ComponentVersion {
    /**
     * @deprecated Should not be used.
     */
    databaseVersion: string;
    /**
     * The version of the Crawling Module.
     */
    maestroVersion: string;
    /**
     * @deprecated Should not be used.
     */
    securityWorkerVersion: string;
    /**
     * @deprecated Should not be used.
     */
    workerVersion: string;
}

export interface UpdateStatus {
    /**
     * Whether an update is available.
     */
    updateAvailable: boolean;
    /**
     * If an update is available, the category of update.
     * See @type {UpdateStatusCategory}.
     */
    updateCategory?: UpdateStatusCategory;
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
    EMPTY = 'EMPTY',
}

export interface CrawlingModuleLogRequestModel {
    /**
     * Creation date for the log request.
     */
    createdDate: number;
    /**
     * Id of the log request.
     */
    id: string;
    /**
     * InstanceId for the log request.
     */
    instanceId: string;
    /**
     * The type of log requested, see @type {CrawlingModuleLogRequestLogType}
     */
    logType: CrawlingModuleLogRequestLogType;
    /**
     * Operation for which we want to get the logs.
     */
    operationId: string;
    /**
     * The state of the request, see @enum {CrawlingModuleLogRequestState}
     */
    state: CrawlingModuleLogRequestState;
}

export interface CreateCrawlingModuleLogRequestModel {
    /**
     * InstanceId for the log request.
     */
    instanceId: string;
    /**
     * The type of log requested, see @type {CrawlingModuleLogRequestLogType}
     */
    logType: CrawlingModuleLogRequestLogType;
    /**
     * Operation for which we want to get the logs.
     */
    operationId: string;
}

export interface CrawlingModuleLogRequestDownloadModel {
    /**
     * Information about the request. Typically contains error messages.
     */
    info: string;
    /**
     * The state of the request, see @enum {CrawlingModuleLogRequestState}
     */
    state: CrawlingModuleLogRequestState;
    /**
     * Url to download the log.
     */
    url: string;
}
