import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import {ActivityOperation} from '../Enums.js';
import Resource from '../Resource.js';
import {ScheduleModel} from '../SecurityCache/index.js';
import SourcesDatasets from './SourcesDatasets/SourcesDatasets.js';
import SourcesFields from './SourcesFields/SourcesFields.js';
import {
    CreateSourceModel,
    CreateSourceOptions,
    LightSourceModel,
    ListOperationalStatusSourcesParams,
    ListSourcesParams,
    RawSourceConfig,
    SourceModel,
} from './SourcesInterfaces.js';
import SourcesMappings from './SourcesMappings/SourcesMappings.js';
import SourcesMetadata from './SourcesMetadata/SourcesMetadata.js';

export default class Sources extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    field: SourcesFields;
    mappings: SourcesMappings;
    datasets: SourcesDatasets;
    metadata: SourcesMetadata;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.field = new SourcesFields(api, serverlessApi);
        this.mappings = new SourcesMappings(api, serverlessApi);
        this.datasets = new SourcesDatasets(api, serverlessApi);
        this.metadata = new SourcesMetadata(api, serverlessApi);
    }

    create(source: New<CreateSourceModel, 'resourceId'>, options?: CreateSourceOptions) {
        return this.api.post<{id: string}>(this.buildPath(Sources.baseUrl, options), source);
    }

    list(params?: ListSourcesParams) {
        return this.api.get<PageModel<SourceModel, 'sourceModels'>>(this.buildPath(`${Sources.baseUrl}/pages`, params));
    }

    /**
     * @description New API resource for the list of sources
     * @experimental
     */
    listOperationalStatus(params?: ListOperationalStatusSourcesParams) {
        return this.api.get<PageModel<SourceModel, 'sourceModels'>>(
            this.buildPath(`${Sources.baseUrl}/sourceoperationalstatus`, params),
        );
    }

    /**
     * Returns a list of sources according to an operational status and a list of source IDs
     *
     * @param {ListOperationalStatusSourcesParams} params
     * @returns {Promise<PageModel<SourceModel, 'sourceModels'>>} A paginated list of IDs
     */
    listOperationalStatusBySourceIds(
        params?: ListOperationalStatusSourcesParams,
        sourceIds?: string[],
    ): Promise<PageModel<SourceModel, 'sourceModels'>> {
        return this.api.post<PageModel<SourceModel, 'sourceModels'>>(
            this.buildPath(`${Sources.baseUrl}/sourceoperationalstatus/ids`, params),
            sourceIds,
        );
    }

    createFromRaw(rawSourceConfig: RawSourceConfig, options?: CreateSourceOptions) {
        return this.api.post<{id: string}>(this.buildPath(`${Sources.baseUrl}/raw`, options), rawSourceConfig);
    }

    delete(sourceId: string) {
        return this.api.delete(`${Sources.baseUrl}/${sourceId}`);
    }

    get(sourceId: string) {
        return this.api.get<SourceModel>(`${Sources.baseUrl}/${sourceId}`);
    }

    update(sourceId: string, source: CreateSourceModel, options?: CreateSourceOptions) {
        return this.api.put<{id: string}>(this.buildPath(`${Sources.baseUrl}/${sourceId}`, options), source);
    }

    applyChanges(sourceId: string) {
        return this.api.post(`${Sources.baseUrl}/${sourceId}/applyChanges`);
    }

    isDedicated(sourceId: string) {
        return this.api.get<{value: boolean}>(`${Sources.baseUrl}/${sourceId}/dedicated`);
    }

    setDedicated(sourceId: string, enabled?: boolean) {
        return this.api.put(this.buildPath(`${Sources.baseUrl}/${sourceId}/dedicated`, {enabled}), {});
    }

    dumpRefresh(sourceId: string) {
        return this.api.post<{value: boolean}>(`${Sources.baseUrl}/${sourceId}/dump`);
    }

    duplicate(sourceId: string, newSourceName: string, logicalIndexId?: string) {
        return this.api.post<SourceModel>(
            this.buildPath(`${Sources.baseUrl}/${sourceId}/duplicate`, {newSourceName, logicalIndexId}),
        );
    }

    evictCachedCrawlerConfig(sourceId: string) {
        return this.api.post(`${Sources.baseUrl}/${sourceId}/evictCachedCrawlerConfig`);
    }

    fullRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/fullRefresh`);
    }

    incrementalRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/incrementalRefresh`);
    }

    listSourceItemTypes(sourceId: string) {
        return this.api.get<string[]>(`${Sources.baseUrl}/${sourceId}/itemTypes`);
    }

    getLightSource(sourceId: string) {
        return this.api.get<LightSourceModel>(`${Sources.baseUrl}/${sourceId}/light`);
    }

    pauseRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/pauseRefresh`);
    }

    setPushRefreshStatus(sourceId: string, activityOperation: ActivityOperation) {
        return this.api.post(this.buildPath(`${Sources.baseUrl}/${sourceId}/pushRefresh`, {activityOperation}));
    }

    getRawSource(sourceId: string) {
        return this.api.get<RawSourceConfig>(`${Sources.baseUrl}/${sourceId}/raw`);
    }

    updateRawSource(sourceId: string, platformSourceConfig: RawSourceConfig, options?: CreateSourceOptions) {
        return this.api.put<{id: string}>(
            this.buildPath(`${Sources.baseUrl}/${sourceId}/raw`, options),
            platformSourceConfig,
        );
    }

    rebuild(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/rebuild`);
    }

    resumeRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/resumeRefresh`);
    }

    retryCreation(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/retryCreation`);
    }

    listSchedules(sourceId: string) {
        return this.api.get<ScheduleModel[]>(`${Sources.baseUrl}/${sourceId}/schedules`);
    }

    createSchedule(sourceId: string, sourceSchedule: ScheduleModel) {
        return this.api.post<ScheduleModel>(`${Sources.baseUrl}/${sourceId}/schedules`, sourceSchedule);
    }

    deleteSchedule(sourceId: string, scheduleId: string) {
        return this.api.delete(`${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`);
    }

    updateSchedule(sourceId: string, scheduleId: string, sourceSchedule: ScheduleModel) {
        return this.api.put<ScheduleModel>(`${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`, sourceSchedule);
    }

    startRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/startRefresh`);
    }

    stopRefresh(sourceId: string) {
        return this.api.post<SourceModel>(`${Sources.baseUrl}/${sourceId}/stopRefresh`);
    }

    abortTaskForActivity(sourceId: string, activityId: string) {
        return this.api.post(this.buildPath(`${Sources.baseUrl}/${sourceId}/tasks/abort`, {activityId}));
    }
}
