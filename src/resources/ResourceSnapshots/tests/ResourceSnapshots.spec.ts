import fetchMock, {enableFetchMocks, FetchMock} from 'jest-fetch-mock';
import API from '../../../APICore.js';
import {SnapshotSortingType, SortingOrder} from '../../Enums.js';
import ResourceSnapshots from '../ResourceSnapshots.js';
import {
    ApplyOptions,
    ApplyOptionsDeletionScope,
    CreateFromFileOptions,
    CreateFromOrganizationOptions,
    DryRunOptions,
    ExportSnapshotContentOptions,
    PushSnapshotOptions,
    ResourceSnapshotContentType,
    ResourceSnapshotExportConfigurationModel,
    ResourceSnapshotsSynchronizationPlanModel,
    ResourceSnapshotsSynchronizationPlanStatus,
    ResourceSnapshotType,
    ResourceSnapshotUrlModel,
    SnapshotAccessType,
    SnapshotExportContentFormat,
    UpdateChildrenOptions,
    ValidateAccessOptions,
} from '../ResourceSnapshotsInterfaces.js';

jest.mock('../../../APICore.js');

describe('ResourceSnapshots', () => {
    let resourceSnapshots: ResourceSnapshots;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        resourceSnapshots = new ResourceSnapshots(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            await resourceSnapshots.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ResourceSnapshots.baseUrl);
        });

        it('should make a GET call to the specific Resource Snapshots url with parameters', async () => {
            const filter = 'filter';
            const sortingOrder = SortingOrder.ASC;
            const sortingType = SnapshotSortingType.CREATED_DATE;
            await resourceSnapshots.list({filter, sortingOrder, sortingType});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}?filter=${filter}&sortingOrder=${sortingOrder}&sortingType=${sortingType}`,
            );
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            await resourceSnapshots.get(snapshotToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}`);
        });

        it('should make a GET call to the specific Resource Snapshots url with the includeReports query param', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            await resourceSnapshots.get(snapshotToGetId, {includeReports: true});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}?includeReports=true`);
        });
    });

    describe('listResourceAccess', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            await resourceSnapshots.listResourceAccess();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/access/resource`);
        });

        it('should make a GET call to the specific Resource Snapshots url and proper access type when WRITE', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const options: ValidateAccessOptions = {
                snapshotAccessType: SnapshotAccessType.Write,
            };

            await resourceSnapshots.validateAccess(snapshotToGetId, options);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/access?snapshotAccessType=WRITE`,
            );
        });
    });

    describe('validateAccess', () => {
        it('should make a GET call to the specific Resource Snapshots url and proper access type when READ', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const options: ValidateAccessOptions = {
                snapshotAccessType: SnapshotAccessType.Read,
            };

            await resourceSnapshots.validateAccess(snapshotToGetId, options);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/access?snapshotAccessType=READ`,
            );
        });

        it('should make a GET call to the specific Resource Snapshots url and proper access type when WRITE', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const options: ValidateAccessOptions = {
                snapshotAccessType: SnapshotAccessType.Write,
            };

            await resourceSnapshots.validateAccess(snapshotToGetId, options);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/access?snapshotAccessType=WRITE`,
            );
        });
    });

    describe('export', () => {
        it('should make a post call to the specific Resource Snapshots url and get snapshot content with default content format', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            await resourceSnapshots.export(snapshotToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotToGetId}/content`, {
                headers: {accept: 'application/zip'},
                responseBodyFormat: 'blob',
            });
        });

        it('should make a post call to the specific Resource Snapshots url and get snapshot content with specific content format', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const exportSnapshotContentOptions: ExportSnapshotContentOptions = {
                contentFormat: SnapshotExportContentFormat.SplitPerType,
            };

            await resourceSnapshots.export(snapshotToGetId, exportSnapshotContentOptions);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotToGetId}/content?contentFormat=SPLIT_PER_TYPE`,
                {headers: {accept: 'application/zip'}, responseBodyFormat: 'blob'},
            );
        });
    });

    describe('getContent', () => {
        it('should make a GET call to the specific Resource Snapshots url and then make a get call to the url', async () => {
            enableFetchMocks();
            const snapshotToGetId = 'snapshot-to-be-fetched';
            const urlReturned: ResourceSnapshotUrlModel = {
                url: 'https://google.com',
                urlExpiration: 1,
            };

            jest.spyOn(resourceSnapshots, 'generateUrl').mockResolvedValue(urlReturned);
            (fetchMock as unknown as FetchMock).mockResponseOnce(JSON.stringify({test: 'hello'}));

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
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (global as any).FormData = jest.fn(() => mockedFormData);
        });

        it.each(['application/zip', 'application/x-zip-compressed'])(
            'should make a post call to the specific Resource Snapshots url if zip file',
            async (fileType: string) => {
                const mockedFileZIP = {
                    type: fileType,
                } as unknown as File;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (global as any).File = jest.fn(() => mockedFileZIP);
                const createFromFileOptions: CreateFromFileOptions = {
                    developerNotes: 'Cut my life into pieces! 🎵🎵🎵',
                };
                const file = new File([''], 'mock.zip', {type: fileType});

                await resourceSnapshots.createFromFile(file, createFromFileOptions);

                expect(api.postForm).toHaveBeenCalledTimes(1);
                expect(api.postForm).toHaveBeenCalledWith(
                    `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=ZIP`,
                    mockedFormData,
                );
            },
        );

        it('should make a post call to the specific Resource Snapshots url if json file', async () => {
            const mockedFileJSON = {
                type: 'application/json',
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (global as any).File = jest.fn(() => mockedFileJSON);

            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            await resourceSnapshots.createFromFile(file, createFromFileOptions);

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/file?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&snapshotFileType=JSON`,
                mockedFormData,
            );
        });

        it('should throw an error if unsupported file type', () => {
            const unsupportedMockedFile = {
                type: 'image/png',
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (global as any).File = jest.fn(() => unsupportedMockedFile);

            const createFromFileOptions: CreateFromFileOptions = {developerNotes: 'Cut my life into pieces! 🎵🎵🎵'};
            const file = new File([''], 'mock.zip', {type: 'application/zip'});

            expect(() => resourceSnapshots.createFromFile(file, createFromFileOptions)).toThrow(Error);
        });
    });

    describe('createFromOrganization', () => {
        it('should make a POST call to the specific Resource Snapshots url', async () => {
            const exportConfigurationModel: ResourceSnapshotExportConfigurationModel = {
                resourcesToExport: {FIELD: ['*'], EXTENSION: ['🤖']},
            };
            const createFromOrganizationOptions: CreateFromOrganizationOptions = {
                developerNotes: 'Cut my life into pieces! 🎵🎵🎵',
                includeChildrenResources: false,
            };

            await resourceSnapshots.createFromOrganization(exportConfigurationModel, createFromOrganizationOptions);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/self?developerNotes=Cut%20my%20life%20into%20pieces%21%20%F0%9F%8E%B5%F0%9F%8E%B5%F0%9F%8E%B5&includeChildrenResources=false`,
                {resourcesToExport: {EXTENSION: ['🤖'], FIELD: ['*']}},
            );
        });
    });

    describe('generateUrl', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';

            await resourceSnapshots.generateUrl(snapshotId, {contentType: ResourceSnapshotContentType.PRIMARY});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}/url?contentType=PRIMARY`);
        });
    });

    describe('push', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const pushSnapshotOptions: PushSnapshotOptions = {targetOrganizationId: '🎯', developerNotes: '🧘'};

            await resourceSnapshots.push(snapshotId, pushSnapshotOptions);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/push?targetOrganizationId=%F0%9F%8E%AF&developerNotes=%F0%9F%A7%98`,
            );
        });
    });

    describe('dryrun', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const dryRunOptions: DryRunOptions = {deleteMissingResources: true};

            await resourceSnapshots.dryRun(snapshotId, dryRunOptions);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/dryrun?deleteMissingResources=true`,
            );
        });
    });

    describe('apply', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const applyOptions: ApplyOptions = {
                deleteMissingResources: true,
                deletionScope: ApplyOptionsDeletionScope.OnlyTypesFromSnapshot,
            };

            await resourceSnapshots.apply(snapshotId, applyOptions);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/apply?deleteMissingResources=true&deletionScope=ONLY_TYPES_FROM_SNAPSHOT`,
            );
        });
    });

    describe('delete a snapshot', () => {
        it('should make a DELETE call to the specific Resource Snapshots url', async () => {
            const snapshotId = 'BossHoss';

            await resourceSnapshots.delete(snapshotId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}`);
        });
    });

    describe('get synchronization plan', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            await resourceSnapshots.getSynchronizationPlan(snapshotId, synchronizationPlanId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
            );
        });
    });

    describe('create synchronization plan', () => {
        it('should make a POST call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';

            await resourceSnapshots.createSynchronizationPlan(snapshotId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization`);
        });
    });

    describe('update synchronization plan', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            const synchronizationPlan: ResourceSnapshotsSynchronizationPlanModel = {
                id: '😨',
                snapshotId: snapshotId,
                status: ResourceSnapshotsSynchronizationPlanStatus.Created,
            };

            await resourceSnapshots.updateSynchronizationPlan(snapshotId, synchronizationPlanId, synchronizationPlan);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}`,
                synchronizationPlan,
            );
        });
    });

    describe('apply synchronization plan', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';

            await resourceSnapshots.applySynchronizationPlan(snapshotId, synchronizationPlanId);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/apply`,
            );
        });
    });

    describe('update synchronization plan children', () => {
        it('should make a PUT call to the specific Resource Snapshots url', async () => {
            const snapshotId = '🤖';
            const synchronizationPlanId = '🥱';
            const updateChildrenOptions: UpdateChildrenOptions = {
                snapshotParentResourceName: 'GME',
                targetParentId: 'AMC',
                parentResourceType: ResourceSnapshotType.featuredResult,
            };

            await resourceSnapshots.updateSynchronizationPlanForChildren(
                snapshotId,
                synchronizationPlanId,
                updateChildrenOptions,
            );

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/synchronization/${synchronizationPlanId}/children?snapshotParentResourceName=GME&targetParentId=AMC&parentResourceType=FEATURED_RESULT`,
            );
        });
    });

    describe('diff', () => {
        it('should make a GET call to the specific Resource Snapshots url', async () => {
            const snapshotId = 'my-snapshot-id';
            const reportId = 'my-report-id';

            await resourceSnapshots.diff(snapshotId, reportId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/diff?relativeReportId=${reportId}`,
            );
        });

        it('should make a GET call to the specific Resource Snapshots url with "numberOfLinesMax" parameter', async () => {
            const snapshotId = 'my-snapshot-id';
            const reportId = 'my-report-id';
            const numberOfLinesMax = 10000;

            await resourceSnapshots.diff(snapshotId, reportId, numberOfLinesMax);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/${snapshotId}/diff?relativeReportId=${reportId}&numberOfLinesMax=${numberOfLinesMax}`,
            );
        });
    });

    describe('listMissingPrivileges', () => {
        it('calls the /snapshots/access/resources endpoint with the provided parameters', async () => {
            await resourceSnapshots.listMissingPrivileges('snapshot-id', {
                snapshotAccessType: SnapshotAccessType.Write,
            });

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ResourceSnapshots.baseUrl}/snapshot-id/access/resources?snapshotAccessType=WRITE`,
            );
        });
    });
});
