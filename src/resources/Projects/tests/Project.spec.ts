import API from '../../../APICore.js';
import Project from '../Project.js';
import {NewProjectModel} from '../ProjectInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Project', () => {
    let project: Project;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const mockProjectId = 'randomProjectId';

    const mockNewProject: NewProjectModel = {
        name: 'Pokemon Project',
        trackingId: 'pokemon-project',
        createdBy: 'jdoe@example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        project = new Project(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the correct Project url', () => {
            project.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Project.baseUrl);
        });

        it('should use the passed parameters as its query paramaters', () => {
            project.list({page: 1, perPage: 50});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Project.baseUrl}?page=1&perPage=50`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the correct Project url', () => {
            project.create(mockNewProject);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Project.baseUrl, mockNewProject);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the correct Project url', () => {
            project.update(mockProjectId, mockNewProject);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Project.baseUrl}/${mockProjectId}`, mockNewProject);
        });
    });

    describe('get', () => {
        it('should make a GET call to the correct Project URL', () => {
            project.get(mockProjectId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Project.baseUrl}/${mockProjectId}`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the correct Project URL', () => {
            project.delete(mockProjectId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Project.baseUrl}/${mockProjectId}`);
        });
    });
});
