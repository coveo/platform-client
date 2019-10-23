import {ClusterNodeStatusModel} from '../ClusterInterfaces';

export interface ClusterNodeModel {
    adminURI: string;
    agentId: string;
    componentName: string;
    id: string;
    indexId: string;
    instanceType: string;
    isCustom: boolean;
    latestVersion: string;
    name: string;
    params?: any;
    status: ClusterNodeStatusModel;
    version: string;
}

export interface ClusterNodeUpgradeModel {
    name: string;
    platform: string;
    version: string;
}
