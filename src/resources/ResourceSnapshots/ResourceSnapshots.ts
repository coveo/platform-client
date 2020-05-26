import API from '../../APICore';
import Resource from '../Resource';
import {PushSnapshotOptions, ResourceSnapshotsModel, ResourceSnapshotUrlModel} from './ResourceSnapshotsInterfaces';

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

        return this.api.get<string>(url, undefined, true);
    }

    generateUrl(snapshotId: string) {
        return this.api.get<ResourceSnapshotUrlModel>(`${ResourceSnapshots.baseUrl}/${snapshotId}/url`);
    }

    push(snapshotId: string, options: PushSnapshotOptions) {
        return this.api.put(this.buildPath(`${ResourceSnapshots.baseUrl}/${snapshotId}/push`, options));
    }

    delete(snapshotId: string) {
        return this.api.delete(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
    }
}
