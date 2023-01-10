import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {ClusterNodeUpgradeDataModel} from '../ClusterInterfaces.js';
import {ClusterNodeUpgradeModel} from '../Nodes/index.js';
import {ClusterAgentModel} from './ClusterAgentInterfaces.js';

export default class ClusterAgent extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/clusters/${id}/agents`;

    list(clusterId: string) {
        return this.api.get<ClusterAgentModel[]>(ClusterAgent.getBaseUrl(clusterId));
    }

    upgrade(clusterId: string, id: string, data: ClusterNodeUpgradeDataModel) {
        return this.api.put<ClusterNodeUpgradeModel[]>(`${ClusterAgent.getBaseUrl(clusterId)}/${id}/upgrade`, data);
    }
}
