export interface ResourceSnapshotsModel {
    /**
     * The username of the snapshot creator.
     */
    createdBy: string;
    /**
     * The date of creation of the snapshot in number of milliseconds since UNIX epoch.
     */
    createdDate: number;
    /**
     * A note you can attach to your snapshot.
     */
    developerNote?: string;
    /**
     * The unique identifier of the target snapshot.
     */
    id: string;
    /**
     * The unique identifier of the organization from whichthe snapshot originates, if it differs from the current organization.
     */
    originId?: string;
    /**
     * The unique identifier of the organization in which the snapshot applies.
     */
    targetId: string;
    /**
     * The list of reports of events on the snapshot.
     */
    reports?: ResourceSnapshotsReportModel[];
    /**
     * The list of synchronization reports on the snapshot.
     */
    synchronizationReports?: ResourceSnapshotsSynchronizationReportModel[];
    /**
     * A summary of the contents of the snapshot.
     */
    contentSummary?: Record<string, number>;
}

/*
 * 'Resource' is defined as anything uniquely identified on the platform's domain that can be created, updated or deleted
 */
export enum ResourceType {
    apiKey = 'API_KEY',
    catalog = 'CATALOG',
    extension = 'EXTENSION',
    featuredResult = 'FEATURED_RESULT',
    field = 'FIELD',
    filter = 'FILTER',
    group = 'GROUP',
    mapping = 'MAPPING',
    mlModel = 'ML_MODEL',
    mlModelAssociation = 'ML_MODEL_ASSOCIATION',
    queryParameter = 'QUERY_PARAMETER',
    queryPipeline = 'QUERY_PIPELINE',
    queryPipelineCondition = 'QUERY_PIPELINE_CONDITION',
    rankingExpression = 'RANKING_EXPRESSION',
    rankingWeight = 'RANKING_WEIGHT',
    searchInterface = 'SEARCH_INTERFACE',
    searchPage = 'SEARCH_PAGE',
    securityProvider = 'SECURITY_PROVIDER',
    source = 'SOURCE',
    stopWord = 'STOP_WORD',
    statementGroup = 'STATEMENT_GROUP',
    subscription = 'SUBSCRIPTION',
    thesaurus = 'THESAURUS',
    trigger = 'TRIGGER',
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

export enum ResourceSnapshotContentType {
    PRIMARY = 'PRIMARY',
    CURRENT_STATE = 'CURRENT_STATE',
}

export interface ResourceSnapshotsReportOperationModel {
    /**
     * The number of resources created by the operation.
     */
    resourcesCreated: number
    /**
     * The number of resources deleted by the operation.
     */
    resourcesDeleted: number
    /**
     * The number of resources for which an error occurred during the operation.
     */
    resourcesInError: number
    /**
     * The number of pre-existing resources recreated by the operation. This happens when a resource cannot be updated. For example, it is not possible to rename a query pipeline, so in such a case the pipeline would be deleted and created again with the desired name. This operation counts as one recreation.
     */
    resourcesRecreated: number
    /**
     * The number of resources unchanged by the operation.
     */
    resourcesUnchanged: number
    /**
     * The number of resources updated by the operation.
     */
    resourcesUpdated: number
}


export type ResourceSnapshotsReportOperationResults = Record<string, string[]>

export interface ResourceSnapshotsReportModel {
    /**
     * The unique identifier of the report.
     */
    id: string;
    /**
     * For each type of resource, an object containing failure details, if applicable.
     */
    resourceOperationResults: Record<string, ResourceSnapshotsReportOperationResults>;
    /**
     * For each type of resource, a breakdown of the number of resources per operation.
     */
    resourceOperations: Record<string, ResourceSnapshotsReportOperationModel>;
    /**
     * The number of resources processed by the event.
     */
    resourcesProcessed: number;
    /**
     * The result code of the snapshot event, if applicable.
     */
    resultCode: ResourceSnapshotsReportResultCode;
    /**
     * The status of the snapshot.
     */
    status: ResourceSnapshotsReportStatus;
    /**
     * The type of snapshot event.
     */
    type: ResourceSnapshotsReportType;
    /**
     * The report creation date in number of milliseconds since UNIX epoch.
     */
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
    displayName: string;
    matches: ResourceSnapshotsSynchronizationMatchModel[];
}

export interface ResourceSnapshotsAlreadyLinkedResourcesModel {
    resourceName: string;
    linkModel: ResourceSnapshotsLinkModel;
}

export interface ResourceSnapshotsSynchronizationMatchModel {
    associationScore?: number;
    displayName?: string;
    linkModel: ResourceSnapshotsLinkModel;
}

export interface ResourceSnapshotsLinkModel {
    id?: string;
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

export interface GetSnapshotOptions {
    /**
     * Whether to include reports with the snapshot.
     * @default false
     */
    includeReports?: boolean;
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

export interface GenerateUrlOptions {
    contentType: ResourceSnapshotContentType;
}

export interface UpdateChildrenOptions {
    snapshotParentResourceName: string;
    parentResourceType: string;
    targetParentId: string;
}
