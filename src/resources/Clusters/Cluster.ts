import API from '../../APICore.js';
import Resource from '../Resource.js';
import ClusterAgent from './Agents/ClusterAgent.js';
import {ClusterModel, ClusterStatusModel} from './ClusterInterfaces.js';
import ClusterNode from './Nodes/ClusterNode.js';

export default class Cluster extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/clusters`;

    nodes: ClusterNode;
    agents: ClusterAgent;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.nodes = new ClusterNode(api, serverlessApi);
        this.agents = new ClusterAgent(api, serverlessApi);
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
        return this.api.post(`${Cluster.baseUrl}/${id}/synchronize`);
    }
}
