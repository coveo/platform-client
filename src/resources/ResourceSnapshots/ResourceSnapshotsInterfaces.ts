export interface ResourceSnapshotsModel {
    createdBy: string;
    createdDate: number;
    developerNote?: string;
    id: string;
    originId?: string;
    targetId?: string;
    reports?: ResourceSnapshotsReportModel[];
}

export enum ResourceSnapshotsReportResultCode {
    Success = 'SUCCESS',
    UnexpectedError = 'UNEXPECTED_ERROR',
    UnableToPushToOrganization = 'UNABLE_TO_PUSH_TO_ORGANIZATION',
    NoResourceRetrieved = 'NO_RESOURCE_RETRIEVED',
    UnableToRetrieveResources = 'UNABLE_TO_RETRIEVE_RESOURCES',
}

export enum ResourceSnapshotsReportStatus {
    Pending = 'PENDING',
    InProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
    Aborted = 'ABORTED',
}

export enum ResourceSnapshotsReportType {
    CreateSnapshot = 'CREATE_SNAPSHOT',
    DryRun = 'DRY_RUN',
    Apply = 'APPLY',
}

export interface ResourceSnapshotsReportModel {
    id: string;
    resourceOperationResults?: object;
    resourceOperations?: object;
    resourcesProcessed?: number;
    resultCode: ResourceSnapshotsReportResultCode;
    status: ResourceSnapshotsReportStatus;
    type: ResourceSnapshotsReportType;
    updatedDate: number;
}

export interface ResourceSnapshotUrlModel {
    url: string;
    urlExpiration: number;
}

export interface PushSnapshotOptions {
    targetOrganizationId: string;
    developerNotes?: string;
}

export interface DryRunOptions {
    deleteMissingResources: boolean;
}
