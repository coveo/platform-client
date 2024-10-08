import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    ApplyOptions,
    CreateFromFileOptions,
    CreateFromOrganizationOptions,
    DryRunOptions,
    ExportSnapshotContentOptions,
    GenerateUrlOptions,
    GetSnapshotOptions,
    PushSnapshotOptions,
    ResourceSnapshotExportConfigurationModel,
    ResourceSnapshotsModel,
    ResourceSnapshotsReportModel,
    ResourceSnapshotsSynchronizationPlanModel,
    ResourceSnapshotsSynchronizationReportModel,
    ResourceSnapshotSupportedFileTypes,
    ResourceSnapshotType,
    ResourceSnapshotUrlModel,
    SnapshotAccessModel,
    SnapshotDiffModel,
    SnapshotListParams,
    UpdateChildrenOptions,
    ValidateAccessOptions,
} from './ResourceSnapshotsInterfaces.js';

export default class ResourceSnapshots extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/snapshots`;

    list(params?: SnapshotListParams) {
        return this.api.get<ResourceSnapshotsModel[]>(this.buildPath(`${ResourceSnapshots.baseUrl}`, params));
    }

    get(snapshotId: string, options?: GetSnapshotOptions) {
        return this.api.get<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}`, options),
        );
    }

    /**
     * Lists the resources that the authenticated user can leverage in snapshots in the target organization.
     */
    listResourceAccess() {
        return this.api.get<ResourceSnapshotType[]>(`${ResourceSnapshots.baseUrl}/access/resource`);
    }

    /**
     * Shows whether the authenticated user has the specified access level (i.e., read or write) to the content of the target snapshot.
     * @param snapshotId
     * @param options
     */
    validateAccess(snapshotId: string, options: ValidateAccessOptions) {
        return this.api.get<SnapshotAccessModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/access`, options),
        );
    }

    /**
     * Retrieves a ZIP file holding the content of the target snapshot, in the target format.
     * @param snapshotId The unique identifier of the target snapshot.
     * @param [options]
     * @returns A newly created Blob object which contains the zipped snapshot
     */
    export(snapshotId: string, options?: ExportSnapshotContentOptions): Promise<Blob> {
        return this.api.get(this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/content`, options), {
            headers: {accept: 'application/zip'},
            responseBodyFormat: 'blob',
        });
    }

    async getContent(snapshotId: string, options: GenerateUrlOptions) {
        const {url} = await this.generateUrl(snapshotId, options);
        return fetch(url, {method: 'get'});
    }

    /**
     * Creates a snapshot from a file containing the configuration.
     * @param file The file containing the configuration.
     * @param options
     */
    createFromFile(file: File, options?: CreateFromFileOptions) {
        const computedOptions = {
            developerNotes: options?.developerNotes,
            snapshotFileType: this.getSnapshotFileType(file),
        };
        const form = new FormData();
        form.append('file', file);

        return this.api.postForm<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/file`, computedOptions),
            form,
        );
    }

    createFromOrganization(
        exportConfigurationModel: ResourceSnapshotExportConfigurationModel,
        options: CreateFromOrganizationOptions,
    ) {
        return this.api.post<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/self`, options),
            exportConfigurationModel,
        );
    }

    generateUrl(snapshotId: string, options: GenerateUrlOptions) {
        return this.api.get<ResourceSnapshotUrlModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/url`, options),
        );
    }

    dryRun(snapshotId: string, options: DryRunOptions) {
        return this.api.put<ResourceSnapshotsReportModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/dryrun`, options),
        );
    }

    apply(snapshotId: string, options: ApplyOptions) {
        return this.api.put<ResourceSnapshotsReportModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/apply`, options),
        );
    }

    push(snapshotId: string, options: PushSnapshotOptions) {
        return this.api.put(this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/push`, options));
    }

    delete(snapshotId: string) {
        return this.api.delete(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
    }

    createSynchronizationPlan(snapshotId: string) {
        return this.api.post<ResourceSnapshotsSynchronizationPlanModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization`,
        );
    }

    getSynchronizationPlan(snapshotId: string, synchronizationPlanId: string) {
        return this.api.get<ResourceSnapshotsSynchronizationPlanModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
        );
    }

    updateSynchronizationPlan(
        snapshotId: string,
        synchronizationPlanId: string,
        synchronizationPlanModel: ResourceSnapshotsSynchronizationPlanModel,
    ) {
        return this.api.put<ResourceSnapshotsSynchronizationPlanModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
            synchronizationPlanModel,
        );
    }

    applySynchronizationPlan(snapshotId: string, synchronizationPlanId: string) {
        return this.api.put<ResourceSnapshotsSynchronizationReportModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/apply`,
        );
    }

    updateSynchronizationPlanForChildren(
        snapshotId: string,
        synchronizationPlanId: string,
        options: UpdateChildrenOptions,
    ) {
        return this.api.put<ResourceSnapshotsSynchronizationPlanModel>(
            this.buildPath(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/children`,
                options,
            ),
        );
    }

    private getSnapshotFileType(file: File) {
        switch (file.type) {
            case 'application/x-zip-compressed':
            case 'application/zip':
                return ResourceSnapshotSupportedFileTypes.ZIP;
            case 'application/json':
                return ResourceSnapshotSupportedFileTypes.JSON;
            default:
                throw new Error('The uploaded file must be either a ZIP or a JSON file.');
        }
    }

    /**
     * @description Shows the diff report for the target snapshot and dry-run report
     * @experimental
     * @param snapshotId - The unique identifier of the target snapshot.
     * @param relativeReportId - The unique identifier of the dry-run operation report associated with the target diff report.
     * @param [numberOfLinesMax] - Maximum number of lines before the diff is downloaded to a file.
     */
    diff(snapshotId: string, relativeReportId: string, numberOfLinesMax?: number) {
        return this.api.get<SnapshotDiffModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/diff`, {
                relativeReportId,
                numberOfLinesMax,
            }),
        );
    }
}
