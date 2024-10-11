import API from '../../../APICore.js';
import Pipelines from '../Pipelines.js';
import {NewPipelineModel, UpdatePipelineModel} from '../PipelinesInterfaces.js';

jest.mock('../../../APICore.js');

describe('Pipelines', () => {
    let pipelines: Pipelines;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        pipelines = new Pipelines(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the Pipelines v1 url', async () => {
            await pipelines.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Pipelines.searchUrlVersion1);
        });
        it('passes the query parameters with the request', async () => {
            await pipelines.list({
                filter: 'filter',
                page: 0,
                perPage: 25,
                sortby: 'position',
                isOrderAscending: true,
                enablePagination: true,
                excludeAbTestTargets: true,
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Pipelines.searchUrlVersion1}?filter=filter&page=0&perPage=25&sortby=position&isOrderAscending=true&enablePagination=true&excludeAbTestTargets=true`,
            );
        });
    });

    describe('get', () => {
        it('makes a GET call to /rest/search/v1/admin/pipelines/:id', async () => {
            await pipelines.get('🔥');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥');
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to /rest/search/v1/admin/pipelines/:id', async () => {
            await pipelines.delete('🔥');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥');
        });
    });

    describe('update', () => {
        it('makes a PUT call to /rest/search/v1/admin/pipelines/:id', async () => {
            const pipelineToUpdate: UpdatePipelineModel = {
                id: '🔥',
                name: 'fire',
            };
            await pipelines.update(pipelineToUpdate);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥', pipelineToUpdate);
        });
    });

    describe('duplicate', () => {
        it('makes a POST call to /rest/search/v1/admin/pipelines/:id/duplicate', async () => {
            await pipelines.duplicate('🔥');

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/🔥/duplicate', undefined);
        });

        it('includes the granular resource if set on the POST call request body', async () => {
            const granularResource = {
                groupsThatCanEdit: [{id: 'hello'}, {id: 'bonjour'}],
                apiKeysThatCanEdit: [{id: 'bonne'}, {id: 'nuit'}],
            };
            await pipelines.duplicate('yeah', granularResource);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/yeah/duplicate', granularResource);
        });
    });

    describe('create', () => {
        it('makes a POST call to /rest/search/v1/admin/pipelines', async () => {
            const newPipeline: NewPipelineModel = {
                name: 'fire',
                description: 'this-is-lit',
            };
            await pipelines.create(newPipeline);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines', newPipeline);
        });
    });

    describe('nested resources', () => {
        it('includes associations', () => {
            expect(pipelines.associations).toBeDefined();
        });

        it('includes statements', () => {
            expect(pipelines.statements).toBeDefined();
        });

        it('includes resultRanking', () => {
            expect(pipelines.resultRanking).toBeDefined();
        });
    });
});
