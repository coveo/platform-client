import {GranularResource} from '../BaseInterfaces';

export interface PipelineBackendVersion {
    version: '1' | '2';
}

interface PipelineShared {
    name: string;
    description?: string;
    isDefault?: boolean;
    condition?: ConditionModel;
    splitTestEnabled?: boolean;
    splitTestName?: string;
    splitTestRatio?: number;
    splitTestTarget?: string;
    filter?: string;
}

export interface PipelineModel extends PipelineShared {
    id: string;
    position?: number;
    created_by?: string;
    last_modified_by?: string;
}

export interface NewPipelineModel extends PipelineShared, GranularResource {}
export interface UpdatePipelineModel extends PipelineModel, GranularResource {}

export interface ConditionModel {
    id: string;
    description: string;
    definition: string;
    detailed: any;
    childrenCount?: number;
    feature?: string;
    parent?: string;
    condition?: string;
    position?: number;
    ready?: boolean;
}

export interface ListPipelinesOptions {
    isOrderAscending?: boolean;
    filter?: string;
    sortby?: string;
    page?: number;
    perPage?: number;
    feature?: string;
    organizationId?: string;
}
