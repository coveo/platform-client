export interface DatasetModel {
    /*
     * Whether or not to include data in the created sources
     */
    hasStaticContent: boolean;
    /*
     * Name of the dataset
     */
    name: string;
    /*
     * Metadata about the dataset
     */
    note: string;
}

export enum DatasetType {
    /*
     * Dataset for web search
     */
    web = 'WEB',
    /*
     * Dataset for ecommerce search
     */
    ecommerce = 'ecommerce',
}

export enum DatasetResult {
    error = 'ERROR',
    success = 'SUCCESS',
}

export enum DatasetStatus {
    /*
     * The dataset import is completed and the rebuilt of the sources is started
     */
    completed = 'COMPLETED',
    /*
     * The dataset import is currently ongoing
     */
    inProgress = 'IN_PROGRESS',
    /*
     * The dataset import is waiting
     */
    pending = 'PENDING',
}
export interface DatasetImportProgressModel {
    errorCode: string;
    /*
     * The request ID returned from /rest/organizations/{organizationId}/sources/datasets/import
     */
    requestId: string;
    /*
     * Result after dataset import completion
     */
    result: DatasetResult;
    /*
     * Status of the current dataset import
     */
    status: DatasetStatus;
}
