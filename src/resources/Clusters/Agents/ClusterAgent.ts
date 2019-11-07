import API from '../../../APICore';
import Resource from '../../Resource';
import {ClusterNodeUpgradeDataModel} from '../ClusterInterfaces';
import {ClusterNodeUpgradeModel} from '../Nodes';
import {ClusterAgentModel} from './ClusterAgentInterfaces';

export default class ClusterAgent extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/clusters/${id}/agents`;

    list(clusterId: string) {
        return this.api.get<ClusterAgentModel[]>(ClusterAgent.getBaseUrl(clusterId));
    }

    upgrade(clusterId: string, id: string, data: ClusterNodeUpgradeDataModel) {
        return this.api.put<ClusterNodeUpgradeModel[]>(`${ClusterAgent.getBaseUrl(clusterId)}/${id}/upgrade`, data);
    }
}
