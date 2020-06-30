import API from '../../../APICore';
import ResourceSnapshots from '../ResourceSnapshots';
import {
    ApplyOptions,
    CreateFromFileOptions,
    DryRunOptions,
    PushSnapshotOptions,
    ResourceSnapshotUrlModel,
} from '../ResourceSnapshotsInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ResourceSnapshots', () => {
    let resourceSnapshots: ResourceSnapshots;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        resourceSnapshots = new ResourceSnapshots(api);
    });

    describe('list', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            resourceSnapshots.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ResourceSnapshots.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            resourceSnapshots.get(snapshotToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}`);
        });
    });

    describe('getContent', () => {
        it('should make a GET call to the specific Resource Snapshots url and then make a get call to the url', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const urlReturned: ResourceSnapshotUrlModel = {
                url: 'https://google.com',
                urlExpiration: 1,
            };

            jest.spyOn(resourceSnapshots, 'generateUrl').mockResolvedValue(urlReturned);
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify({test: 'hello'}));

            await resourceSnapshots.getContent(snapshotToGetId);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock).toHaveBeenCalledWith(urlReturned.url, {method: 'get'});
        });
    });

    describe('createFromFile', () => {
        const mockedFormData = {
            set: jest.fn(),
        };
        const mockedFile = {
            type: 'application/zip',
        };

        beforeEach(() => {
            (global as any).FormData = jest.fn(() => mockedFormData);
            (global as any).File = jest.fn(() => mockedFile);
        });

        it('should make a post call to the specific Resource Snapshots url if zip file', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            resourceSnapshots.createFromFile(file, createFromFileOptions);
            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&fileType=ZIP`,
                mockedFormData
            );
        });

        it('should make a post call to the specific Resource Snapshots url if json file', () => {
            const mockedFileJSON = {
                type: 'application/json',
            };
            (global as any).File = jest.fn(() => mockedFileJSON);

            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            resourceSnapshots.createFromFile(file, createFromFileOptions);
            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&fileType=JSON`,
                mockedFormData
            );
        });

        it('should throw an error if unsupported file type', () => {
            const unsupportedMockedFile = {
                type: 'image/png',
            };
            (global as any).File = jest.fn(() => unsupportedMockedFile);

            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            expect(() => resourceSnapshots.createFromFile(file, createFromFileOptions)).toThrowError(Error);
        });
    });

    describe('generateUrl', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';

            resourceSnapshots.generateUrl(snapshotId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}/url`);
        });
    });

    describe('push', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const pushSnapshotOptions: PushSnapshotOptions = {targetOrganizationId: '🎯', developerNotes: '🧘'};

            resourceSnapshots.push(snapshotId, pushSnapshotOptions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/push?targetOrganizationId=%F0%9F%8E%AF&developerNotes=%F0%9F%A7%98`
            );
        });
    });

    describe('dryrun', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const dryRunOptions: DryRunOptions = {deleteMissingResources: true};

            resourceSnapshots.dryRun(snapshotId, dryRunOptions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/dryrun?deleteMissingResources=true`
            );
        });
    });

    describe('apply', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const applyOptions: ApplyOptions = {deleteMissingResources: true};

            resourceSnapshots.apply(snapshotId, applyOptions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/apply?deleteMissingResources=true`
            );
        });
    });

    describe('delete a snapshot', () => {
        it('should make a DELETE call to the specific Resource Snapshots url', () => {
            const snapshotId = 'BossHoss';
            resourceSnapshots.delete(snapshotId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
        });
    });
});
