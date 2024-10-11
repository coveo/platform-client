import API from '../../../APICore.js';
import Indexes from '../Indexes.js';
import {CreateCoveoIndexModel, RawIndexConfig} from '../IndexesInterface.js';

jest.mock('../../../APICore.js');

describe('Cluster', () => {
    let indexes: Indexes;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        indexes = new Indexes(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', async () => {
            await indexes.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Indexes.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call for specific index', async () => {
            const indexId = 'ABC123';
            await indexes.get(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call for specific index', async () => {
            const indexId = 'ABC123';
            await indexes.delete(indexId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('create', () => {
        it('should make a CREATE call with no arguments', async () => {
            await indexes.create({});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Indexes.baseUrl, {});
        });

        it('should make a CREATE call to mimick COPY_INDEX', async () => {
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

            await indexes.create(indexToBeCopied);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Indexes.baseUrl, indexToBeCopied);
        });
    });

    describe('backup', () => {
        it('should make a BACKUP call for specified index', async () => {
            const indexId = 'ABC123';
            await indexes.backup(indexId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/backup`, {});
        });
    });

    describe('get all backups', () => {
        it('should make a GETBACKUPS call', async () => {
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

            await indexes.getBackups(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Indexes.indexBackupUrl}?backupId=backupId&from=0&indexId=indexId&order=asc&page=100&perPage=10&sortBy=name&to=20`,
            );
        });
    });

    describe('forceCommit', () => {
        it('should make a FORCECOMMIT call for specified index', async () => {
            const indexId = 'ABC123';
            await indexes.forceCommit(indexId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/commit`, {});
        });
    });

    describe('readOnly', () => {
        it('should make a READONLY call for specified index', async () => {
            const isReadOnly = true;
            const indexId = 'ABC123';
            await indexes.readOnly(indexId, isReadOnly);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/readonly?isReadOnly=true`, {});
        });
    });

    describe('resize', () => {
        it('should make a RESIZE call for specified index', async () => {
            const sizeInGibibytes = 100;
            const indexId = 'ABC123';
            await indexes.resize(indexId, sizeInGibibytes);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/resize`, {sizeInGibibytes});
        });
    });

    describe('stats', () => {
        it('should make a RESIZE call for specified index', async () => {
            const indexId = 'ABC123';
            await indexes.stats(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/stats`);
        });
    });

    describe('isOnline', () => {
        it('should make a ISONLINE call for specified index', async () => {
            const isOnline = true;
            const indexId = 'ABC123';
            await indexes.isOnline(indexId, isOnline);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/online?isOnline=true`, {});
        });
    });

    describe('restore', () => {
        it('should make a RESTORE call for specified index', async () => {
            const backupId = 'backUpID';
            const indexId = 'ABC123';
            await indexes.restore(indexId, backupId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/restore?backupId=backUpID`, {});
        });
    });

    describe('getJason', () => {
        it('should make a GETJSON call for specified index', async () => {
            const indexId = 'ABC123';
            await indexes.getJson(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/configuration`);
        });
    });

    describe('editJason', () => {
        it('should make a EDITJSON call for specified index', async () => {
            const indexId = 'ABC123';
            const indexConfig: any = {};
            await indexes.editJson(indexId, indexConfig as unknown as RawIndexConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}/configuration`, indexConfig);
        });
    });

    describe('editJasonAll', () => {
        it('should make a EDITJSONALL call for specified index', async () => {
            const indexConfig: any = {};
            await indexes.editJsonAll(indexConfig as unknown as RawIndexConfig);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Indexes.baseUrl}/raw`, indexConfig);
        });
    });
});
