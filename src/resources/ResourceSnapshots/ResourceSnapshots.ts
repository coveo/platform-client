import API from '../../APICore';
import Resource from '../Resource';
import {
    ApplyOptions,
    DryRunOptions,
    PushSnapshotOptions,
    ResourceSnapshotsModel,
    ResourceSnapshotsReportModel,
    ResourceSnapshotUrlModel,
} from './ResourceSnapshotsInterfaces';

export default class ResourceSnapshots extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/snapshots`;

    list() {
        return this.api.get<ResourceSnapshotsModel[]>(ResourceSnapshots.baseUrl);
    }

    get(snapshotId: string) {
        return this.api.get<ResourceSnapshotsModel>(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
    }

    async getContent(snapshotId: string) {
        const {url} = await this.generateUrl(snapshotId);
        return await fetch(url, {method: 'get'});
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
}
