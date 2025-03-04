import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import {ActivityOperation, DocumentConfigurationType} from '../../Enums.js';
import {ScheduleModel} from '../../SecurityCache/index.js';
import Sources from '../Sources.js';
import SourcesDatasets from '../SourcesDatasets/SourcesDatasets.js';
import SourcesFeedback from '../SourcesFeedback/SourcesFeedback.js';
import SourcesFields from '../SourcesFields/SourcesFields.js';
import {
    CreateSourceModel,
    GetDefaultDocumentConfigurationParams,
    ListSourcesParams,
    RawSourceConfig,
} from '../SourcesInterfaces.js';
import SourcesMappings from '../SourcesMappings/SourcesMappings.js';
import SourcesMetadata from '../SourcesMetadata/SourcesMetadata.js';

jest.mock('../../../APICore.js');

describe('Sources', () => {
    let source: Sources;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        source = new Sources(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the Sources base url', async () => {
            const sourceModel: New<CreateSourceModel> = {};

            await source.create(sourceModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Sources.baseUrl, sourceModel);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Sources url', async () => {
            await source.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/pages`);
        });
    });

    describe('listOperationalStatus', () => {
        it('should make a GET call to the specific Sources url', async () => {
            await source.listOperationalStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/sourceoperationalstatus`);
        });

        it('should make a GET call with the correct stringFilterType', async () => {
            const params = {
                stringFilterType: 'EXACTMATCH',
            } as ListSourcesParams;
            await source.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/pages?stringFilterType=EXACTMATCH`);
        });
    });

    describe('createFromRaw', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const rawSource: RawSourceConfig = {};

            await source.createFromRaw(rawSource);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/raw`, rawSource);
        });
    });

    describe('getDefaultDocumentConfiguration', () => {
        it('should make a GET call to the default document configuration url', async () => {
            await source.getDefaultDocumentConfiguration();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/document/configuration/default`);
        });

        it('should make a GET call to the default document configuration url for a PUSH document', async () => {
            const params: GetDefaultDocumentConfigurationParams = {
                defaultDocumentConfigurationType: DocumentConfigurationType.PUSH,
            };

            await source.getDefaultDocumentConfiguration(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Sources.baseUrl}/document/configuration/default?defaultDocumentConfigurationType=PUSH`,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Sources url', async () => {
            const sourceId = '🐱';

            await source.delete(sourceId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = '😽';

            await source.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Sources url', async () => {
            const sourceId = '🙀';
            const sourceModel: CreateSourceModel = {};

            await source.update(sourceId, sourceModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`, sourceModel);
        });
    });

    describe('applyChanges', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '😾';

            await source.applyChanges(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/applyChanges`);
        });
    });

    describe('isDedicated', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = '😼';

            await source.isDedicated(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dedicated`);
        });
    });

    describe('setDedicated', () => {
        it('should make a PUT call to the specific Sources url', async () => {
            const sourceId = '😹';

            await source.setDedicated(sourceId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dedicated`, {});
        });
    });

    describe('dumpRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '😿';

            await source.dumpRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dump`);
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐾';
            const newSourceName = 'half-new';

            await source.duplicate(sourceId, newSourceName);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/duplicate?newSourceName=half-new`);
        });
    });

    describe('evictCachedCrawlerConfig', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '😸';

            await source.evictCachedCrawlerConfig(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/evictCachedCrawlerConfig`);
        });
    });

    describe('fullRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '😺';

            await source.fullRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/fullRefresh`);
        });
    });

    describe('incrementalRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '😻';

            await source.incrementalRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/incrementalRefresh`);
        });
    });

    describe('listSourceItemTypes', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = '🦊';

            await source.listSourceItemTypes(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/itemTypes`);
        });
    });

    describe('getLightSource', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = 'not-enough-cats';

            await source.getLightSource(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/light`);
        });
    });

    describe('pauseRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐺';

            await source.pauseRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/pauseRefresh`);
        });
    });

    describe('setPushRefreshStatus', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐶';
            const activityOperation = ActivityOperation.REBUILD;

            await source.setPushRefreshStatus(sourceId, activityOperation);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/pushRefresh?activityOperation=REBUILD`,
            );
        });
    });

    describe('getRawSource', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = '🐕';

            await source.getRawSource(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/raw`);
        });
    });

    describe('updateRawSource', () => {
        it('should make a PUT call to the specific Sources url', async () => {
            const sourceId = '🦮';
            const config = {} as RawSourceConfig;

            await source.updateRawSource(sourceId, config);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/raw`, config);
        });
    });

    describe('rebuild', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐕‍🦺';

            await source.rebuild(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/rebuild`);
        });
    });

    describe('resumeRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐩';

            await source.resumeRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/resumeRefresh`);
        });
    });

    describe('retryCreation', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🌭';

            await source.retryCreation(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/retryCreation`);
        });
    });

    describe('listSchedules', () => {
        it('should make a GET call to the specific Sources url', async () => {
            const sourceId = 'not-enough-dogs';

            await source.listSchedules(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules`);
        });
    });

    describe('createSchedule', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = 'some-other-animals';
            const schedule = {} as ScheduleModel;

            await source.createSchedule(sourceId, schedule);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules`, schedule);
        });
    });

    describe('deleteSchedule', () => {
        it('should make a DELETE call to the specific Sources url', async () => {
            const sourceId = '🐉';
            const scheduleId = '🐲';

            await source.deleteSchedule(sourceId, scheduleId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`);
        });
    });

    describe('updateSchedule', () => {
        it('should make a PUT call to the specific Sources url', async () => {
            const sourceId = '🐍';
            const scheduleId = '🐇';
            const sourceSchedule = {} as ScheduleModel;

            await source.updateSchedule(sourceId, scheduleId, sourceSchedule);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`,
                sourceSchedule,
            );
        });
    });

    describe('startRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐰';

            await source.startRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/startRefresh`);
        });
    });

    describe('stopRefresh', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐨';

            await source.stopRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/stopRefresh`);
        });
    });

    describe('abortTaskForActivity', () => {
        it('should make a POST call to the specific Sources url', async () => {
            const sourceId = '🐼';
            const activityId = 'not-enough-emoji';

            await source.abortTaskForActivity(sourceId, activityId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/tasks/abort?activityId=not-enough-emoji`,
            );
        });
    });

    describe('clients', () => {
        it('should have a fields client', () => {
            expect(source.field).toBeInstanceOf(SourcesFields);
        });

        it('should have a mappings client', () => {
            expect(source.mappings).toBeInstanceOf(SourcesMappings);
        });

        it('should have a datasets client', () => {
            expect(source.datasets).toBeInstanceOf(SourcesDatasets);
        });

        it('should have a metadata client', () => {
            expect(source.metadata).toBeInstanceOf(SourcesMetadata);
        });

        it('should have a feedback client', () => {
            expect(source.feedback).toBeInstanceOf(SourcesFeedback);
        });
    });
});
