import API from '../../APICore';
import Resource from '../Resource';
import ClusterAgent from './Agents/ClusterAgent';
import {ClusterModel, ClusterStatusModel} from './ClusterInterfaces';
import ClusterNode from './Nodes/ClusterNode';

export default class Cluster extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/clusters`;

    nodes: ClusterNode;
    agents: ClusterAgent;

    constructor(protected api: API) {
        super(api);

        this.nodes = new ClusterNode(api);
        this.agents = new ClusterAgent(api);
    }

    list() {
        return this.api.get<ClusterModel[]>(Cluster.baseUrl);
    }

    // @deprecated use cluster.agents.list instead
    listAgents(id: string) {
        return this.agents.list(id);
    }

    live() {
        return this.api.get<ClusterModel>(`${Cluster.baseUrl}/live`);
    }

    status(id: string) {
        return this.api.get<ClusterStatusModel>(`${Cluster.baseUrl}/${id}/status`);
    }

    synchronize(id: string) {
        return this.api.post<{}>(`${Cluster.baseUrl}/${id}/synchronize`);
    }
}
