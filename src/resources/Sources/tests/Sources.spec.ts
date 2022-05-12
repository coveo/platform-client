import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import {ActivityOperation} from '../../Enums';
import {ScheduleModel} from '../../SecurityCache';
import Sources from '../Sources';
import SourcesFields from '../SourcesFields/SourcesFields';
import {CreateSourceModel, RawSourceConfig} from '../SourcesInterfaces';
import SourcesMappings from '../SourcesMappings/SourcesMappings';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Sources', () => {
    let source: Sources;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        source = new Sources(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the Sources base url', () => {
            const sourceModel: New<CreateSourceModel> = {};

            source.create(sourceModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Sources.baseUrl, sourceModel);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Sources url', () => {
            source.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/pages`);
        });
    });

    describe('listOperationalStatus', () => {
        it('should make a GET call to the specific Sources url', () => {
            source.listOperationalStatus();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/sourceoperationalstatus`);
        });
    });

    describe('createFromRaw', () => {
        it('should make a POST call to the specific Sources url', () => {
            const rawSource: RawSourceConfig = {};

            source.createFromRaw(rawSource);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/raw`, rawSource);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Sources url', () => {
            const sourceId = '🐱';

            source.delete(sourceId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = '😽';

            source.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Sources url', () => {
            const sourceId = '🙀';
            const sourceModel: CreateSourceModel = {};

            source.update(sourceId, sourceModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}`, sourceModel);
        });
    });

    describe('applyChanges', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '😾';

            source.applyChanges(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/applyChanges`);
        });
    });

    describe('isDedicated', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = '😼';

            source.isDedicated(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dedicated`);
        });
    });

    describe('setDedicated', () => {
        it('should make a PUT call to the specific Sources url', () => {
            const sourceId = '😹';

            source.setDedicated(sourceId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dedicated`, {});
        });
    });

    describe('dumpRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '😿';

            source.dumpRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/dump`);
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐾';
            const newSourceName = 'half-new';

            source.duplicate(sourceId, newSourceName);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/duplicate?newSourceName=half-new`);
        });
    });

    describe('evictCachedCrawlerConfig', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '😸';

            source.evictCachedCrawlerConfig(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/evictCachedCrawlerConfig`);
        });
    });

    describe('fullRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '😺';

            source.fullRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/fullRefresh`);
        });
    });

    describe('incrementalRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '😻';

            source.incrementalRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/incrementalRefresh`);
        });
    });

    describe('listSourceItemTypes', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = '🦊';

            source.listSourceItemTypes(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/itemTypes`);
        });
    });

    describe('getLightSource', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = 'not-enough-cats';

            source.getLightSource(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/light`);
        });
    });

    describe('pauseRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐺';

            source.pauseRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/pauseRefresh`);
        });
    });

    describe('setPushRefreshStatus', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐶';
            const activityOperation = ActivityOperation.REBUILD;

            source.setPushRefreshStatus(sourceId, activityOperation);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/pushRefresh?activityOperation=REBUILD`
            );
        });
    });

    describe('getRawSource', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = '🐕';

            source.getRawSource(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/raw`);
        });
    });

    describe('updateRawSource', () => {
        it('should make a PUT call to the specific Sources url', () => {
            const sourceId = '🦮';
            const config = {} as RawSourceConfig;

            source.updateRawSource(sourceId, config);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/raw`, config);
        });
    });

    describe('rebuild', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐕‍🦺';

            source.rebuild(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/rebuild`);
        });
    });

    describe('resumeRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐩';

            source.resumeRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/resumeRefresh`);
        });
    });

    describe('retryCreation', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🌭';

            source.retryCreation(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/retryCreation`);
        });
    });

    describe('listSchedules', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = 'not-enough-dogs';

            source.listSchedules(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules`);
        });
    });

    describe('createSchedule', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = 'some-other-animals';
            const schedule = {} as ScheduleModel;

            source.createSchedule(sourceId, schedule);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules`, schedule);
        });
    });

    describe('deleteSchedule', () => {
        it('should make a DELETE call to the specific Sources url', () => {
            const sourceId = '🐉';
            const scheduleId = '🐲';

            source.deleteSchedule(sourceId, scheduleId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`);
        });
    });

    describe('updateSchedule', () => {
        it('should make a PUT call to the specific Sources url', () => {
            const sourceId = '🐍';
            const scheduleId = '🐇';
            const sourceSchedule = {} as ScheduleModel;

            source.updateSchedule(sourceId, scheduleId, sourceSchedule);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/schedules/${scheduleId}`,
                sourceSchedule
            );
        });
    });

    describe('startRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐰';

            source.startRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/startRefresh`);
        });
    });

    describe('stopRefresh', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐨';

            source.stopRefresh(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/stopRefresh`);
        });
    });

    describe('abortTaskForActivity', () => {
        it('should make a POST call to the specific Sources url', () => {
            const sourceId = '🐼';
            const activityId = 'not-enough-emoji';

            source.abortTaskForActivity(sourceId, activityId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Sources.baseUrl}/${sourceId}/tasks/abort?activityId=not-enough-emoji`
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
    });
});
