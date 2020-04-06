import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import {ActivityOperation} from '../Enums';
import Resource from '../Resource';
import {ScheduleModel} from '../SecurityCache';
import SourcesFields from './SourcesFields/SourcesFields';
import {
    CreateSourceOptions,
    LightSourceModel,
    ListSourcesParams,
    RawSourceConfig,
    SourceModel,
} from './SourcesInterfaces';

export default class Sources extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    field: SourcesFields;

    constructor(protected api: API) {
        super(api);

        this.field = new SourcesFields(api);
    }

    create(source: New<SourceModel, 'resourceId'>, options?: CreateSourceOptions) {
        return this.api.post<{id: string}>(this.buildPath(Sources.baseUrl, options), source);
    }

    list(params?: ListSourcesParams) {
        return this.api.get<PageModel<SourceModel>>(this.buildPath(`${Sources.baseUrl}/pages`, params));
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

    update(sourceId: string, source: SourceModel, options?: CreateSourceOptions) {
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

    duplicate(sourceId: string, newSourceName: string, logicalIndex?: string) {
        return this.api.post<SourceModel>(
            this.buildPath(`${Sources.baseUrl}/${sourceId}/duplicate`, {newSourceName, logicalIndex})
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
            platformSourceConfig
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
