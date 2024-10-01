import {ClusterNodeStatusModel} from '../ClusterInterfaces.js';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
    status: ClusterNodeStatusModel;
    version: string;
}

export interface ClusterNodeUpgradeModel {
    name: string;
    platform: string;
    version: string;
}
