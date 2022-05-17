import {GranularResource, Paginated} from '../BaseInterfaces';
import {ConditionModel} from './Conditions';

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
    statementComposition?: {
        totalCount?: number;
        [key: string]: number;
    };
}

export interface NewPipelineModel extends PipelineShared, GranularResource {}
export interface UpdatePipelineModel extends PipelineModel, GranularResource {}

export interface ListPipelinesOptions extends Paginated {
    isOrderAscending?: boolean;
    filter?: string;
    sortby?: string;
    feature?: string;
    organizationId?: string;
}
