import {ClusterNodeStatusModel} from '../ClusterInterfaces.js';

export interface ClusterAgentModel {
    id: string;
    name: string;
    description: string;
    platform: string;
    version: string;
    status: ClusterNodeStatusModel;
}
