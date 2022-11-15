import {UpdateStatusCategory} from '../Enums';

export interface MaestroVersionOptions {
    crawlingModuleVersion: string;
}

export interface CrawlingModuleStatus {
    /**
     * Whether the crawling module is using a proxy or not.
     */
    usingProxy: boolean;
    /**
     * Whether the auto update is enable or not.
     */
    autoUpdateEnable: boolean;
    /**
     * Whether the log request is enable or not.
     * This enables the client to query logs directly from the platform.
     */
    logRequestEnable: boolean;
    /**
     * Frequency at which the setup look for update.
     */
    autoUpdateFrequency: number;
    /**
     * The number for crawler set in the configuration of the crawling module.
     */
    numberOfCrawlerWorkers: number;
    /**
     * The number for security provider set in the configuration of the crawling module.
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
     * After a given period, a crawling module that doesn't report to the
     * platform is going be disabled. It won't be able to process job.
     */
    disabled: boolean;
    /**
     * Id of the crawling module.
     */
    id: string;
    /**
     * The last time the crawling module report itself to the platform.
     */
    lastHeartbeat: number;
    /**
     * The latest date at which the crawling module update itself.
     */
    lastVersionUpgrade: number;
    /**
     * The version of the crawling module.
     */
    maestroVersion: string;
    /**
     * The name of the crawling module.
     */
    name: string;
    /**
     * Organization id on which the crawling module is linked.
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
     * Advance information about a crawling module, see @type {CrawlingModuleStatus}.
     */
    status?: CrawlingModuleStatus;
}

export interface ComponentVersion {
    /**
     * @deprecated Should not be used.
     */
    databaseVersion: string;
    /**
     * The version of the crawling module.
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
     * Operation on for which we want to get the logs.
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
     * Operation on for which we want to get the logs.
     */
    operationId: string;
}

export interface CrawlingModuleLogRequestDownloadModel {
    /**
     * Information about the request, mostly error message.
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
