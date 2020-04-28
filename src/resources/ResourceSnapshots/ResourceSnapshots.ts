import API from '../../APICore';
import Resource from '../Resource';
import {ResourceSnapshotsModel} from './ResourceSnapshotsInterfaces';

export default class ResourceSnapshots extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/snapshots`;

    constructor(protected api: API) {
        super(api);
    }

    list() {
        return this.api.get<ResourceSnapshotsModel[]>(`${ResourceSnapshots.baseUrl}`);
    }
}
