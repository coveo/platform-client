export interface ResourceSnapshotsModel {
    createdBy: string;
    createdDate: number;
    developerNote?: string;
    id: string;
    originId?: string;
    targetId?: string;
    reports?: ResourceSnapshotsReportModel[];
    synchronizationReports?: ResourceSnapshotsSynchronizationReportModel[];
}

export enum SnapshotAccessType {
    Read = 'READ',
    Write = 'WRITE',
}

export enum ResourceSnapshotsReportResultCode {
    AccessDenied = 'ACCESS_DENIED',
    ResourcesInError = 'RESOURCES_IN_ERROR',
    Success = 'SUCCESS',
    UnexpectedError = 'UNEXPECTED_ERROR',
    UnableToPushToOrganization = 'UNABLE_TO_PUSH_TO_ORGANIZATION',
    NoResourceRetrieved = 'NO_RESOURCE_RETRIEVED',
    UnableToRetrieveResources = 'UNABLE_TO_RETRIEVE_RESOURCES',
    ResourceDependencyCyle = 'RESOURCE_DEPENDENCY_CYCLE',
    ExternalServiceCommunicationError = 'EXTERNAL_SERVICE_COMMUNICATION_ERROR',
}

export enum ResourceSnapshotsReportStatus {
    Pending = 'PENDING',
    InProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
    Aborted = 'ABORTED',
}

export enum ResourceSnapshotsSynchronizationPlanStatus {
    Creating = 'CREATING',
    Created = 'CREATED',
    InError = 'IN_ERROR',
}

export enum ResourceSnapshotsReportType {
    CreateSnapshot = 'CREATE_SNAPSHOT',
    DryRun = 'DRY_RUN',
    Apply = 'APPLY',
    CreateSynchronizationPlan = 'CREATE_SYNCHRONIZATION_PLAN',
    ApplySynchronizationPlan = 'APPLY_SYNCHRONIZATION_PLAN',
}

export enum ResourceSnapshotSupportedFileTypes {
    ZIP = 'ZIP',
    JSON = 'JSON',
}

export interface ResourceSnapshotsReportModel {
    id: string;
    resourceOperationResults?: Record<string, unknown>;
    resourceOperations?: Record<string, unknown>;
    resourcesProcessed?: number;
    resultCode: ResourceSnapshotsReportResultCode;
    status: ResourceSnapshotsReportStatus;
    type: ResourceSnapshotsReportType;
    updatedDate: number;
}

export interface ResourceSnapshotsSynchronizationReportModel {
    id: string;
    synchronizationPlanId: string;
    linkOperations?: Record<string, unknown>;
    linkOperationDetails?: Record<string, unknown>;
    resourcesProcessed?: number;
    resultCode: ResourceSnapshotsReportResultCode;
    status: ResourceSnapshotsReportStatus;
    type: ResourceSnapshotsReportType;
    updatedDate: number;
}

export interface ResourceSnapshotsSynchronizationPlanModel {
    id: string;
    snapshotId: string;
    status: ResourceSnapshotsSynchronizationPlanStatus;
    alreadyLinkedResources?: Record<string, ResourceSnapshotsAlreadyLinkedResourcesModel[]>;
    resourceSynchronizationOperations?: Record<string, ResourceSnapshotsSynchronizationOperationsModel[]>;
}

export interface ResourceSnapshotsSynchronizationOperationsModel {
    resourceName: string;
    matches: ResourceSnapshotsSynchronizationMatchModel[];
}

export interface ResourceSnapshotsAlreadyLinkedResourcesModel {
    resourceName: string;
    linkModel: ResourceSnapshotsLinkModel;
}

export interface ResourceSnapshotsSynchronizationMatchModel {
    associateScore: number;
    linkModel: ResourceSnapshotsLinkModel[];
}

export interface ResourceSnapshotsLinkModel {
    id: string;
    organizationId: string;
    resourceId: string;
    resourceName: string;
    resourceType: string;
}

export interface ResourceSnapshotExportConfigurationModel {
    resourcesToExport: Record<string, unknown>;
}

export interface ResourceSnapshotUrlModel {
    url: string;
    urlExpiration: number;
}

export interface SnapshotAccessModel {
    allowed: boolean;
}

export interface PushSnapshotOptions {
    targetOrganizationId: string;
    developerNotes?: string;
}

export interface CreateFromFileOptions {
    developerNotes?: string;
}

export interface ValidateAccessOptions {
    snapshotAccessType: SnapshotAccessType;
}

export interface CreateFromOrganizationOptions {
    developerNotes?: string;
    targetOrganizationId?: string;
    includeChildrenResources?: boolean;
}

export interface DryRunOptions {
    deleteMissingResources: boolean;
}

export interface ApplyOptions {
    deleteMissingResources: boolean;
}

export interface ApplyOptions {
    deleteMissingResources: boolean;
}
