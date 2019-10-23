import {ClusterNodeStatusModel} from '../ClusterInterfaces';

export interface ClusterAgentModel {
    id: string;
    name: string;
    description: string;
    platform: string;
    version: string;
    status: ClusterNodeStatusModel;
}
