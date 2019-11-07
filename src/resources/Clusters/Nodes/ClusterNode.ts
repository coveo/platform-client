import API from '../../../APICore';
import Resource from '../../Resource';
import {ClusterNodeUpgradeDataModel} from '../ClusterInterfaces';
import {ClusterNodeModel, ClusterNodeUpgradeModel} from './ClusterNodeInterfaces';

export default class ClusterNode extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/clusters/${id}/nodes`;

    list(clusterId: string) {
        return this.api.get<ClusterNodeModel[]>(ClusterNode.getBaseUrl(clusterId));
    }

    listUpgrades(clusterId: string, id: string) {
        return this.api.get<ClusterNodeUpgradeModel[]>(`${ClusterNode.getBaseUrl(clusterId)}/${id}/upgrades`);
    }

    start(clusterId: string, id: string) {
        return this.api.post(`${ClusterNode.getBaseUrl(clusterId)}/${id}/start`);
    }

    stop(clusterId: string, id: string) {
        return this.api.post(`${ClusterNode.getBaseUrl(clusterId)}/${id}/stop`);
    }

    dump(clusterId: string, id: string) {
        return this.api.post(`${ClusterNode.getBaseUrl(clusterId)}/${id}/dumps`);
    }

    upgrade(clusterId: string, id: string, data: ClusterNodeUpgradeDataModel) {
        return this.api.put<ClusterNodeUpgradeModel[]>(`${ClusterNode.getBaseUrl(clusterId)}/${id}/upgrade`, data);
    }
}
