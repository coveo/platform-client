import API from '../../APICore';
import Resource from '../Resource';
import {ClusterAgentModel, ClusterModel, ClusterStatusModel} from './ClusterInterfaces';

export default class Cluster extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/clusters`;

    list() {
        return this.api.get<ClusterStatusModel[]>(Cluster.baseUrl);
    }

    listAgents(id: string) {
        return this.api.get<ClusterAgentModel[]>(`${Cluster.baseUrl}/${id}/agents`);
    }

    live() {
        return this.api.get<ClusterModel>(`${Cluster.baseUrl}/live`);
    }

    status(id: string) {
        return this.api.get<ClusterStatusModel>(`${Cluster.baseUrl}/${id}/status`);
    }

    synchronize(id: string) {
        return this.api.post<{}>(`${Cluster.baseUrl}/${id}/synchronize`, {});
    }
}
