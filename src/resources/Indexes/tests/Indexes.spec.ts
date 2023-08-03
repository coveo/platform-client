import API from '../../../APICore.js';
import Indexes from '../Indexes.js';
import {CreateCoveoIndexModel} from '../IndexesInterface.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Cluster', () => {
    let indexes: Indexes;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        indexes = new Indexes(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', () => {
            indexes.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Indexes.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call for specific index', () => {
            const indexId = 'ABC123';
            indexes.get(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call for specific index', () => {
            const indexId = 'ABC123';
            indexes.delete(indexId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('create', () => {
        it('should make a CREATE call with no arguments', () => {
            indexes.create({});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Indexes.baseUrl, {});
        });

        it('should make a CREATE call to mimick COPY_INDEX', () => {
            const indexToBeCopied: CreateCoveoIndexModel = {
                copyFromId: 'originalIndexID',
                machineSpec: {
                    architecture: 'T3_MEDIUM_UNLIMITED',
                    storageSpec: {
                        numberOfIops: 0,
                        sizeInGibibytes: 45,
                        storageType: 'SSD',
                        throughputInMebibytes: 0,
                    },
                },
            };

            indexes.create(indexToBeCopied);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Indexes.baseUrl, indexToBeCopied);
        });
    });

    describe('backup', () => {
        it('should make a BACKUP call for specified index', () => {
            const indexId = 'ABC123';
            indexes.backup(indexId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/backup`, {});
        });
    });

    describe('get all backups', () => {
        it('should make a GETBACKUPS call', () => {
            const options = {
                backupId: 'backupId',
                from: 0,
                indexId: 'indexId',
                order: 'asc',
                page: 100,
                perPage: 10,
                sortBy: 'name',
                to: 20,
            };

            indexes.getBackups(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Indexes.indexBackupUrl}?backupId=backupId&from=0&indexId=indexId&order=asc&page=100&perPage=10&sortBy=name&to=20`,
            );
        });
    });

    describe('forceCommit', () => {
        it('should make a FORCECOMMIT call for specified index', () => {
            const indexId = 'ABC123';
            indexes.forceCommit(indexId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/commit`, {});
        });
    });

    describe('readOnly', () => {
        it('should make a READONLY call for specified index', () => {
            const isReadOnly = true;
            const indexId = 'ABC123';
            indexes.readOnly(indexId, isReadOnly);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/readonly?isReadOnly=true`, {});
        });
    });

    describe('resize', () => {
        it('should make a RESIZE call for specified index', () => {
            const sizeInGibibytes = 100;
            const indexId = 'ABC123';
            indexes.resize(indexId, sizeInGibibytes);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/resize`, {sizeInGibibytes});
        });
    });

    describe('stats', () => {
        it('should make a RESIZE call for specified index', () => {
            const indexId = 'ABC123';
            indexes.stats(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/stats`);
        });
    });

    describe('isOnline', () => {
        it('should make a ISONLINE call for specified index', () => {
            const isOnline = true;
            const indexId = 'ABC123';
            indexes.isOnline(indexId, isOnline);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/online?isOnline=true`, {});
        });
    });

    describe('restore', () => {
        it('should make a RESTORE call for specified index', () => {
            const backupId = 'backUpID';
            const indexId = 'ABC123';
            indexes.restore(indexId, backupId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/restore?backupId=backUpID`, {});
        });
    });

    describe('getJason', () => {
        it('should make a GETJSON call for specified index', () => {
            const indexId = 'ABC123';
            indexes.getJson(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/configuration`);
        });
    });

    describe('editJason', () => {
        it('should make a EDITJSON call for specified index', () => {
            const indexId = 'ABC123';
            const indexConfig: any = {};
            indexes.editJson(indexId, indexConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/configuration`, indexConfig);
        });
    });

    describe('editJasonAll', () => {
        it('should make a EDITJSONALL call for specified index', () => {
            const indexConfig: any = {};
            indexes.editJsonAll(indexConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/raw`, indexConfig);
        });
    });
});
