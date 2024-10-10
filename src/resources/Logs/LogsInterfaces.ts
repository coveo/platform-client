import {Paginated} from '../BaseInterfaces.js';
import {IndexingPipelineLogOperations, IndexingPipelineLogResults, IndexingPipelineLogTasks} from '../Enums.js';

export interface GetLogsParams extends GetFacetsParams, Paginated {}

export interface GetFacetsParams {
    from: string;
    to: string;
    documentId?: string;
}

export interface GetLogsOrFacetsRequestBodyModel extends FacetsModel {
    excludeOperations?: IndexingPipelineLogOperations[];
    excludeResourceIds?: string[];
    excludeResults?: IndexingPipelineLogResults[];
    excludeSourceIds?: string[];
    excludeTasks?: IndexingPipelineLogTasks[];
}

export interface FacetsModel {
    operations?: IndexingPipelineLogOperations[];
    resourceIds?: string[];
    results?: IndexingPipelineLogResults[];
    sourceIds?: string[];
    tasks?: IndexingPipelineLogTasks[];
}

export interface LogsModel {
    documentLogEntries: IndexingPipelineLogEntry[];
    hasNextPage: boolean;
}

export interface IndexingPipelineLogEntry {
    datetime: string;
    guid: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: Record<string, any>;
    operation: IndexingPipelineLogOperations;
    organizationId: string;
    requestId: string;
    resourceId: string;
    result: IndexingPipelineLogResults;
    sourceId: string;
    task: IndexingPipelineLogTasks;
}

export interface FacetsWithCountsModel {
    operations: Record<IndexingPipelineLogOperations, number>;
    resourceIds: Record<string, number>;
    results: Record<IndexingPipelineLogResults, number>;
    sourceIds: Record<string, number>;
    tasks: Record<IndexingPipelineLogTasks, number>;
}
