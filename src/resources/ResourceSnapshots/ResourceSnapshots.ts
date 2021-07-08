import API from '../../APICore';
import {getFormData} from '../../utils/FormData';
import Resource from '../Resource';
import {
    ApplyOptions,
    CreateFromFileOptions,
    CreateFromOrganizationOptions,
    DryRunOptions,
    GenerateUrlOptions,
    ExportSnapshotContentOptions,
    GetSnapshotOptions,
    PushSnapshotOptions,
    ResourceSnapshotExportConfigurationModel,
    ResourceSnapshotsModel,
    ResourceSnapshotsReportModel,
    ResourceSnapshotsSynchronizationPlanModel,
    ResourceSnapshotsSynchronizationReportModel,
    ResourceSnapshotSupportedFileTypes,
    ResourceSnapshotUrlModel,
    SnapshotAccessModel,
    UpdateChildrenOptions,
    ValidateAccessOptions,
} from './ResourceSnapshotsInterfaces';

export default class ResourceSnapshots extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/snapshots`;

    list() {
        return this.api.get<ResourceSnapshotsModel[]>(ResourceSnapshots.baseUrl);
    }

    get(snapshotId: string, options?: GetSnapshotOptions) {
        return this.api.get<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}`, options)
        );
    }

    validateAccess(snapshotId: string, options: ValidateAccessOptions) {
        return this.api.get<SnapshotAccessModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/access`, options)
        );
    }

    /**
     * Retrieves a ZIP file holding the content of the target snapshot, in the target format.
     *
     * @param {string} snapshotId The unique identifier of the target snapshot.
     * @param {ExportSnapshotContentOptions} [options]
     * @returns
     */
    async export(snapshotId: string, options?: ExportSnapshotContentOptions) {
        return this.api.getFile(this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/content`, options), {
            headers: {accept: 'application/zip'},
        });
    }

    async getContent(snapshotId: string, options: GenerateUrlOptions) {
        const {url} = await this.generateUrl(snapshotId, options);
        return await fetch(url, {method: 'get'});
    }

    createFromFile(file: File, options: CreateFromFileOptions) {
        const computedOptions = {developerNotes: options.developerNotes, snapshotFileType: undefined};

        if (file.type === 'application/zip') {
            computedOptions.snapshotFileType = ResourceSnapshotSupportedFileTypes.ZIP;
        } else if (file.type === 'application/json') {
            computedOptions.snapshotFileType = ResourceSnapshotSupportedFileTypes.JSON;
        } else {
            throw new Error('The uploaded file must be either a ZIP or a JSON file.');
        }

        const form: FormData = getFormData();
        form.append('file', file);

        return this.api.postForm<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/file`, computedOptions),
            form
        );
    }

    createFromOrganization(
        exportConfigurationModel: ResourceSnapshotExportConfigurationModel,
        options: CreateFromOrganizationOptions
    ) {
        return this.api.post<ResourceSnapshotsModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/self`, options),
            exportConfigurationModel
        );
    }

    generateUrl(snapshotId: string, options: GenerateUrlOptions) {
        return this.api.get<ResourceSnapshotUrlModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/url`, options)
        );
    }

    dryRun(snapshotId: string, options: DryRunOptions) {
        return this.api.put<ResourceSnapshotsReportModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/dryrun`, options)
        );
    }

    apply(snapshotId: string, options: ApplyOptions) {
        return this.api.put<ResourceSnapshotsReportModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/apply`, options)
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
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization`
        );
    }

    getSynchronizationPlan(snapshotId: string, synchronizationPlanId: string) {
        return this.api.get<ResourceSnapshotsSynchronizationPlanModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`
        );
    }

    updateSynchronizationPlan(
        snapshotId: string,
        synchronizationPlanId: string,
        synchronizationPlanModel: ResourceSnapshotsSynchronizationPlanModel
    ) {
        return this.api.put<ResourceSnapshotsSynchronizationPlanModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
            synchronizationPlanModel
        );
    }

    applySynchronizationPlan(snapshotId: string, synchronizationPlanId: string) {
        return this.api.put<ResourceSnapshotsSynchronizationReportModel>(
            `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/apply`
        );
    }

    updateSynchronizationPlanForChildren(
        snapshotId: string,
        synchronizationPlanId: string,
        options: UpdateChildrenOptions
    ) {
        return this.api.put<ResourceSnapshotsSynchronizationPlanModel>(
            this.buildPath(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/children`,
                options
            )
        );
    }
}
