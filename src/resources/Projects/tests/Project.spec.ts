import API from '../../../APICore.js';
import Project from '../Project.js';
import {BaseProjectModel, ProjectModel, ProjectType} from '../ProjectInterfaces.js';

jest.mock('../../../APICore.js');

describe('Project', () => {
    let project: Project;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const mockProjectId = 'randomProjectId';
    const mockRandomResourceType = 'CATALOG';

    const mockNewProject: BaseProjectModel = {
        name: 'Pokemon Project',
        description: 'Project about pokemons',
        type: ProjectType.Commerce,
    };

    const mockProject: ProjectModel = {
        id: mockProjectId,
        name: 'Pokemon Project',
        description: 'Project about pokemons',
        type: ProjectType.Commerce,
        createdBy: 'jdoe@example.com',
        updatedBy: 'jdoe@example.com',
        createdDate: '2023-07-19T02:37:23.399Z',
        updatedDate: '2023-07-22T21:52:22.588Z',
    };

    beforeEach(() => {
        project = new Project(api, serverlessApi);

        jest.resetAllMocks();
    });

    describe('list', () => {
        it('should make a GET call to the correct Project url', async () => {
            await project.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Project.baseUrl);
        });

        it('should use the passed parameters as its query paramaters', async () => {
            await project.list({page: 1, perPage: 50});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Project.baseUrl}?page=1&perPage=50`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the correct Project url', async () => {
            await project.create(mockNewProject);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Project.baseUrl, {
                name: 'Pokemon Project',
                description: 'Project about pokemons',
                type: ProjectType.Commerce,
            });
        });
    });

    describe('update', () => {
        it('should make a PUT call to the correct Project url', async () => {
            await project.update(mockProjectId, mockProject);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Project.baseUrl}/randomProjectId`, {
                id: mockProjectId,
                name: 'Pokemon Project',
                description: 'Project about pokemons',
                type: ProjectType.Commerce,
                createdBy: 'jdoe@example.com',
                updatedBy: 'jdoe@example.com',
                createdDate: '2023-07-19T02:37:23.399Z',
                updatedDate: '2023-07-22T21:52:22.588Z',
            });
        });
    });

    describe('get', () => {
        it('should make a GET call to the correct Project URL', async () => {
            await project.get(mockProjectId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Project.baseUrl}/randomProjectId`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the correct Project URL', async () => {
            await project.delete(mockProjectId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Project.baseUrl}/randomProjectId`);
        });
    });

    describe('listResourcesByType', () => {
        it('should make a GET call to the correct Project URL', async () => {
            await project.listResourcesByStatus(mockProjectId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Project.baseUrl}/${mockProjectId}/resources`);
        });
    });

    describe('listResources', () => {
        it('should make a GET call to the correct Project URL', async () => {
            await project.listResources(mockProjectId, mockRandomResourceType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Project.baseUrl}/${mockProjectId}/resources/${mockRandomResourceType}`,
            );
        });

        it('should use the passed parameters as its query paramaters', async () => {
            await project.listResources(mockProjectId, mockRandomResourceType, {page: 1, perPage: 50});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Project.baseUrl}/${mockProjectId}/resources/${mockRandomResourceType}?page=1&perPage=50`,
            );
        });
    });

    describe('listAssociatedProjects', () => {
        it('should make a POST call to the correct Project URL', async () => {
            const randomSourceId = 'random-id';
            await project.listAssociatedProjects('SOURCE', [randomSourceId]);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Project.baseUrl}/resources/ids?resourceType=SOURCE`, [
                randomSourceId,
            ]);
        });
    });
});
