import API from '../../APICore';
import Resource from '../Resource';
import {
    ApplyOptions,
    CreateFromFileOptions,
    CreateFromOrganizationOptions,
    DryRunOptions,
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

    get(snapshotId: string) {
        return this.api.get<ResourceSnapshotsModel>(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
    }

    validateAccess(snapshotId: string, options: ValidateAccessOptions) {
        return this.api.get<SnapshotAccessModel>(
            this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/access`, options)
        );
    }

    async getContent(snapshotId: string) {
        const {url} = await this.generateUrl(snapshotId);
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

        const form: FormData = new FormData();
        form.set('file', file);

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

    generateUrl(snapshotId: string) {
        return this.api.get<ResourceSnapshotUrlModel>(`${ResourceSnapshots.baseUrl}/${snapshotId}/url`);
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
