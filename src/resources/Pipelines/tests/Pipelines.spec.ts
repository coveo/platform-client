import API from '../../../APICore.js';
import Pipelines from '../Pipelines.js';
import {NewPipelineModel, UpdatePipelineModel} from '../PipelinesInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Pipelines', () => {
    let pipelines: Pipelines;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        pipelines = new Pipelines(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Pipelines v1 url', () => {
            pipelines.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Pipelines.searchUrlVersion1);
        });
    });

    describe('get', () => {
        it('should make a GET call to /rest/search/v1/admin/pipelines/:id', () => {
            pipelines.get('🔥');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥');
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /rest/search/v1/admin/pipelines/:id', () => {
            pipelines.delete('🔥');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥');
        });
    });

    describe('update', () => {
        it('should make a PUT call to /rest/search/v1/admin/pipelines/:id', () => {
            const pipelineToUpdate: UpdatePipelineModel = {
                id: '🔥',
                name: 'fire',
            };
            pipelines.update(pipelineToUpdate);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥', pipelineToUpdate);
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to /rest/search/v1/admin/pipelines/:id/duplicate', () => {
            pipelines.duplicate('🔥');

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥/duplicate', undefined);
        });

        it('includes the granular resource if set on the POST call request body', () => {
            const granularResource = {
                groupsThatCanEdit: [{id: 'hello'}, {id: 'bonjour'}],
                apiKeysThatCanEdit: [{id: 'bonne'}, {id: 'nuit'}],
            };
            pipelines.duplicate('yeah', granularResource);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/yeah/duplicate', granularResource);
        });
    });

    describe('create', () => {
        it('should make a POST call to /rest/search/v1/admin/pipelines', () => {
            const newPipeline: NewPipelineModel = {
                name: 'fire',
                description: 'this-is-lit',
            };
            pipelines.create(newPipeline);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines', newPipeline);
        });
    });

    describe('nested resources', () => {
        it('should front associations', () => {
            expect(pipelines.associations).toBeDefined();
        });

        it('should front statements', () => {
            expect(pipelines.statements).toBeDefined();
        });

        it('should front resultRanking', () => {
            expect(pipelines.resultRanking).toBeDefined();
        });
    });
});
