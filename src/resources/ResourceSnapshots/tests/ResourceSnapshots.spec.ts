import API from '../../../APICore';
import {SortingOrder, SnapshotSortingType} from '../../Enums';
import ResourceSnapshots from '../ResourceSnapshots';
import {
    ApplyOptions,
    CreateFromFileOptions,
    CreateFromOrganizationOptions,
    DryRunOptions,
    ExportSnapshotContentOptions,
    PushSnapshotOptions,
    ResourceSnapshotContentType,
    ResourceSnapshotExportConfigurationModel,
    ResourceSnapshotsSynchronizationPlanModel,
    ResourceSnapshotsSynchronizationPlanStatus,
    ResourceSnapshotSupportedFileTypes,
    ResourceSnapshotUrlModel,
    ResourceSnapshotType,
    SnapshotAccessType,
    SnapshotExportContentFormat,
    UpdateChildrenOptions,
    ValidateAccessOptions,
} from '../ResourceSnapshotsInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ResourceSnapshots', () => {
    let resourceSnapshots: ResourceSnapshots;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        resourceSnapshots = new ResourceSnapshots(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            resourceSnapshots.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ResourceSnapshots.baseUrl);
        });

        it('should make a GET call to the specific Resource Snapshots url with parameters', () => {
            const filter = 'filter';
            const sortingOrder = SortingOrder.ASC;
            const sortingType = SnapshotSortingType.CREATED_DATE;
            resourceSnapshots.list({filter, sortingOrder, sortingType});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}?filter=${filter}&sortingOrder=${sortingOrder}&sortingType=${sortingType}`
            );
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            resourceSnapshots.get(snapshotToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}`);
        });

        it('should make a GET call to the specific Resource Snapshots url with the includeReports query param', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            resourceSnapshots.get(snapshotToGetId, {includeReports: true});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}?includeReports=true`);
        });
    });

    describe('validateAccess', () => {
        it('should make a GET call to the specific Resource Snapshots url and proper access type when READ', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const options: ValidateAccessOptions = {
                snapshotAccessType: SnapshotAccessType.Read,
            };

            resourceSnapshots.validateAccess(snapshotToGetId, options);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/access?snapshotAccessType=READ`
            );
        });

        it('should make a GET call to the specific Resource Snapshots url and proper access type when WRITE', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const options: ValidateAccessOptions = {
                snapshotAccessType: SnapshotAccessType.Write,
            };

            resourceSnapshots.validateAccess(snapshotToGetId, options);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/access?snapshotAccessType=WRITE`
            );
        });
    });

    describe('export', () => {
        it('should make a post call to the specific Resource Snapshots url and get snapshot content with default content format', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            resourceSnapshots.export(snapshotToGetId);

            expect(api.getFile).toHaveBeenCalledTimes(1);
            expect(api.getFile).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}/content`, {
                headers: {accept: 'application/zip'},
            });
        });

        it('should make a post call to the specific Resource Snapshots url and get snapshot content with specific content format', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const exportSnapshotContentOptions: ExportSnapshotContentOptions = {
                contentFormat: SnapshotExportContentFormat.SplitPerType,
            };

            resourceSnapshots.export(snapshotToGetId, exportSnapshotContentOptions);

            expect(api.getFile).toHaveBeenCalledTimes(1);
            expect(
                api.getFile
            ).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/content?contentFormat=SPLIT_PER_TYPE`,
                {headers: {accept: 'application/zip'}}
            );
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

            await resourceSnapshots.getContent(snapshotToGetId, {contentType: ResourceSnapshotContentType.PRIMARY});

            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock).toHaveBeenCalledWith(urlReturned.url, {method: 'get'});
        });
    });

    describe('createFromFile', () => {
        const mockedAppendToFormData = jest.fn();
        const mockedFormData = {
            append: mockedAppendToFormData,
        };
        const mockedFile = {
            type: 'application/zip',
        };

        beforeEach(() => {
            (global as any).FormData = jest.fn(() => mockedFormData);
            (global as any).File = jest.fn(() => mockedFile);
        });

        it('should make a post call to the specific Resource Snapshots url if JSON buffer', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = Buffer.from('');

            resourceSnapshots.createFromBuffer(file, ResourceSnapshotSupportedFileTypes.JSON, createFromFileOptions);

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=JSON`,
                mockedFormData
            );
        });

        it('should append the JSON buffer content to the formData', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = Buffer.from('file-data-content');

            resourceSnapshots.createFromBuffer(file, ResourceSnapshotSupportedFileTypes.JSON, createFromFileOptions);

            expect(mockedAppendToFormData).toHaveBeenCalledWith(
                'file',
                Buffer.from('file-data-content'),
                'snapshot.json'
            );
        });

        it('should append the ZIP buffer content to the formData', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = Buffer.from('file-data-content');

            resourceSnapshots.createFromBuffer(file, ResourceSnapshotSupportedFileTypes.ZIP, createFromFileOptions);

            expect(mockedAppendToFormData).toHaveBeenCalledWith(
                'file',
                Buffer.from('file-data-content'),
                'snapshot.zip'
            );
        });

        it('should make a post call to the specific Resource Snapshots url if ZIP buffer', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = Buffer.from('');

            resourceSnapshots.createFromBuffer(file, ResourceSnapshotSupportedFileTypes.ZIP, createFromFileOptions);

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=ZIP`,
                mockedFormData
            );
        });

        it('should make a post call to the specific Resource Snapshots url if zip file', () => {
            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            resourceSnapshots.createFromFile(file, createFromFileOptions);

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=ZIP`,
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
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=JSON`,
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

    describe('createFromOrganization', () => {
        it('should make a POST call to the specific Resource Snapshots url', () => {
            const exportConfigurationModel: ResourceSnapshotExportConfigurationModel = {
                resourcesToExport: {FIELD: ['*'], EXTENSION: ['🤖']},
            };
            const createFromOrganizationOptions: CreateFromOrganizationOptions = {
                developerNotes: 'Cut my life into pieces! 🎵🎵🎵',
                includeChildrenResources: false,
            };

            resourceSnapshots.createFromOrganization(exportConfigurationModel, createFromOrganizationOptions);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(
                api.post
            ).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/self?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&includeChildrenResources=false`,
                {resourcesToExport: {EXTENSION: ['🤖'], FIELD: ['*']}}
            );
        });
    });

    describe('generateUrl', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';

            resourceSnapshots.generateUrl(snapshotId, {contentType: ResourceSnapshotContentType.PRIMARY});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}/url?contentType=PRIMARY`);
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

    describe('get synchronization plan', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            resourceSnapshots.getSynchronizationPlan(snapshotId, synchronizationPlanId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`
            );
        });
    });

    describe('create synchronization plan', () => {
        it('should make a POST call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';

            resourceSnapshots.createSynchronizationPlan(snapshotId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization`);
        });
    });

    describe('update synchronization plan', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            const synchronizationPlan: ResourceSnapshotsSynchronizationPlanModel = {
                id: '😨',
                snapshotId: snapshotId,
                status: ResourceSnapshotsSynchronizationPlanStatus.Created,
            };

            resourceSnapshots.updateSynchronizationPlan(snapshotId, synchronizationPlanId, synchronizationPlan);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
                synchronizationPlan
            );
        });
    });

    describe('apply synchronization plan', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            resourceSnapshots.applySynchronizationPlan(snapshotId, synchronizationPlanId);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/apply`
            );
        });
    });

    describe('update synchronization plan children', () => {
        it('should make a PUT call to the specific Resource Snapshots url', () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';
            const updateChildrenOptions: UpdateChildrenOptions = {
                snapshotParentResourceName: 'GME',
                targetParentId: 'AMC',
                parentResourceType: ResourceSnapshotType.featuredResult,
            };

            resourceSnapshots.updateSynchronizationPlanForChildren(
                snapshotId,
                synchronizationPlanId,
                updateChildrenOptions
            );

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/children?snapshotParentResourceName=GME&targetParentId=AMC&parentResourceType=FEATURED_RESULT`
            );
        });
    });

    describe('diff', () => {
        it('should make a GET call to the specific Resource Snapshots url', () => {
            const snapshotId = 'my-snapshot-id';
            const reportId = 'my-report-id';

            resourceSnapshots.diff(snapshotId, reportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/diff?relativeReportId=${reportId}`
            );
        });

        it('should make a GET call to the specific Resource Snapshots url with "numberOfLinesMax" parameter', () => {
            const snapshotId = 'my-snapshot-id';
            const reportId = 'my-report-id';
            const numberOfLinesMax = 10000;

            resourceSnapshots.diff(snapshotId, reportId, numberOfLinesMax);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/diff?relativeReportId=${reportId}&numberOfLinesMax=${numberOfLinesMax}`
            );
        });
    });
});
