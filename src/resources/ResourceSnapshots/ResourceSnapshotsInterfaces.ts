import {SortingOrder, SnapshotSortingType} from '../Enums.js';

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
     * The unique identifier of the organization from which the snapshot originates if it differs from the current organization.
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
     * The list of diff generation reports on the snapshot.
     */
    diffGenerationReports?: SnapshotDiffModel[];
    /**
     * A summary of the contents of the snapshot.
     */
    contentSummary?: Record<string, number>;
}

/*
 * 'Resource' is defined as anything uniquely identified on the platform's domain that can be created, updated or deleted
 */
export enum ResourceSnapshotType {
    extension = 'EXTENSION',
    featuredResult = 'FEATURED_RESULT',
    field = 'FIELD',
    filter = 'FILTER',
    insightPanelConfiguration = 'INSIGHT_PANEL_CONFIGURATION',
    insightPanelInterface = 'INSIGHT_PANEL_INTERFACE',
    mapping = 'MAPPING',
    mlModel = 'ML_MODEL',
    mlModelAssociation = 'ML_MODEL_ASSOCIATION',
    queryParameter = 'QUERY_PARAMETER',
    queryPipeline = 'QUERY_PIPELINE',
    queryPipelineCondition = 'QUERY_PIPELINE_CONDITION',
    rankingExpression = 'RANKING_EXPRESSION',
    rankingWeight = 'RANKING_WEIGHT',
    searchPage = 'SEARCH_PAGE',
    securityProvider = 'SECURITY_PROVIDER',
    source = 'SOURCE',
    stopWord = 'STOP_WORD',
    subscription = 'SUBSCRIPTION',
    thesaurus = 'THESAURUS',
    trigger = 'TRIGGER',
}

export enum SnapshotAccessType {
    Read = 'READ',
    Write = 'WRITE',
}

export enum SnapshotExportContentFormat {
    Flat = 'FLAT',
    SplitPerType = 'SPLIT_PER_TYPE',
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
    AutoSynchronizationFailure = 'AUTO_SYNCHRONIZATION_FAILURE',
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
    resourcesCreated: number;
    /**
     * The number of resources deleted by the operation.
     */
    resourcesDeleted: number;
    /**
     * The number of resources for which an error occurred during the operation.
     */
    resourcesInError: number;
    /**
     * The number of pre-existing resources recreated by the operation. This happens when a resource cannot be updated. For example, it is not possible to rename a query pipeline, so in such a case the pipeline would be deleted and created again with the desired name. This operation counts as one recreation.
     */
    resourcesRecreated: number;
    /**
     * The number of resources unchanged by the operation.
     */
    resourcesUnchanged: number;
    /**
     * The number of resources updated by the operation.
     */
    resourcesUpdated: number;
}

export interface ResourceSnapshotsReportOperationResult {
    /**
     * The code of the error that occured.
     */
    resultCode: string;
    /**
     * A human-friendly message about the error.
     */
    message: string;
}

export type ResourceSnapshotsReportOperationResults = Record<string, ResourceSnapshotsReportOperationResult[]>;

export enum SnapshotsReportStages {
    COMPUTING_OPERATIONS = 'COMPUTING_OPERATIONS',
    CREATING_SNAPSHOT = 'CREATING_SNAPSHOT',
    INITIAL_PROCESSING = 'INITIAL_PROCESSING',
    PERFORMING_OPERATIONS = 'PERFORMING_OPERATIONS',
    SYNCHRONIZING = 'SYNCHRONIZING',
    VALIDATING_OPERATIONS = 'VALIDATING_OPERATIONS',
}

export interface ResourceSnapshotsReportModel {
    /**
     * Current stage of the report
     */
    currentStage?: {
        /**
         * The progress type of the current step
         */
        progressType: 'BINARY' | 'PERCENTAGE';
        /**
         * The progress value of the current step
         * The value can be percentage type (from 0 to 100) binary type (0 or 1)
         */
        progressValue: number;
        /**
         * Current step name
         */
        stage: SnapshotsReportStages;
    };
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
     * The ordered stages the migration operation has to go through in order to complete.
     */
    stagesToExecute: SnapshotsReportStages[];
    /**
     * The start date ot the report in number of milliseconds since UNIX epoch.
     */
    startDate: number;
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
    resourcesToExport: Partial<Record<ResourceSnapshotType, string[] | null>>;
}

export interface ResourceSnapshotUrlModel {
    url: string;
    urlExpiration: number;
}

export interface SnapshotAccessModel {
    allowed: boolean;
}

export interface SnapshotListParams {
    filter?: string;
    sortingOrder?: SortingOrder;
    sortingType?: SnapshotSortingType;
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
     *
     * @default false
     */
    includeReports?: boolean;
}

export interface ExportSnapshotContentOptions {
    /**
     * The format of the snapshot content.
     * - FLAT: Content unified into a single file
     * - SPLIT_PER_TYPE: Content split into one file per resource type
     *
     * @default SnapshotExportContentFormat.Flat
     */
    contentFormat?: SnapshotExportContentFormat;
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

export enum ApplyOptionsDeletionScope {
    AllManagedResources = 'ALL_MANAGED_RESOURCES',
    OnlyTypesFromSnapshot = 'ONLY_TYPES_FROM_SNAPSHOT',
}

export interface ApplyOptions {
    /**
     * Whether to delete organization resources not present in the snapshot.
     *
     * @default false
     */
    deleteMissingResources?: boolean;
    /**
     * The scope of the resources on which to calculate deletions.
     * **Note:** only applies when `deleteMissingResources` is set to `true`.
     *
     * @default ApplyOptionsDeletionScope.AllManagedResources
     *
     */
    deletionScope?: ApplyOptionsDeletionScope;
}

export interface GenerateUrlOptions {
    contentType: ResourceSnapshotContentType;
}

export interface UpdateChildrenOptions {
    snapshotParentResourceName: string;
    parentResourceType: string;
    targetParentId: string;
}

export interface SnapshotDiffFileModel extends ResourceSnapshotUrlModel {
    numberOfLines: number;
}

export interface SnapshotDiffModel {
    id: string;
    snapshotId: string;
    relativeReportId: string;
    updatedDate: number;
    status: ResourceSnapshotsReportStatus;
    files: Partial<Record<ResourceSnapshotType, SnapshotDiffFileModel>>;
}
