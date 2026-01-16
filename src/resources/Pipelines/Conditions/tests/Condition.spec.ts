import API from '../../../../APICore.js';
import {
    ConditionAssociationSortByType,
    ConditionAssociationType,
    ListStatementAssocationFilter,
    ListStatementSortBy,
} from '../../../Enums.js';
import Condition from '../Condition.js';
import {NewConditionModel} from '../ConditionInterfaces.js';

jest.mock('../../../../APICore.js');

describe('Condition', () => {
    let conditions: Condition;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        conditions = new Condition(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Condition url', async () => {
            await conditions.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements?feature=when');
        });

        it('should use the passed options in the query parameters', async () => {
            await conditions.list({
                filter: 'cat',
                page: 2,
                expand: true,
                associationFilter: ListStatementAssocationFilter.IsAssociated,
            });
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v1/admin/pipelines/statements?feature=when&filter=cat&page=2&expand=true&associationFilter=isAssociated',
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Condition url', async () => {
            const model: NewConditionModel = {
                definition: 'when $browser is "chrome"',
            };

            await conditions.create(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements', model);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Statement url', async () => {
            const conditionId = '🎯';

            const model: NewConditionModel = {
                id: '🎯',
                definition: 'when $browser is "chrome"',
            };

            await conditions.update(conditionId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🎯', model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Statement url', async () => {
            const conditionId = '🏒';

            await conditions.get(conditionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🏒');
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Statement url', async () => {
            const conditionId = '🎽';

            await conditions.delete(conditionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🎽');
        });
    });

    describe('bulkGet', () => {
        it('should make a POST call to the conditions bulkGet url', async () => {
            await conditions.bulkGet([]);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/bulkGet', {
                ids: [],
            });
        });

        it('should include the params on the url if passed', async () => {
            await conditions.bulkGet([], {perPage: 3, sortBy: ListStatementSortBy.Definition});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/search/v1/admin/pipelines/statements/bulkGet?perPage=3&sortBy=definition',
                {
                    ids: [],
                },
            );
        });

        it('should include the conditionIds on the request body', async () => {
            await conditions.bulkGet(['hello', 'bonjour']);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/bulkGet', {
                ids: ['hello', 'bonjour'],
            });
        });
    });
    describe('bulkDelete', () => {
        it('make a POST call to the conditions bulkDelete url', async () => {
            await conditions.bulkDelete([]);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/bulkDelete', {
                ids: [],
            });
        });

        it('include the conditionIds on the request body', async () => {
            await conditions.bulkDelete(['hello', 'bonjour']);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/bulkDelete', {
                ids: ['hello', 'bonjour'],
            });
        });
    });
    describe('listAssociations', () => {
        it('make a GET call to the list associations url without params', async () => {
            await conditions.listAssociations('conditionIdTest');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v1/admin/pipelines/statements/conditionIdTest/associations',
            );
        });

        it('make a GET call to the list associations url with params', async () => {
            await conditions.listAssociations('conditionIdTest', {
                page: 2,
                perPage: 10,
                pipelineName: 'testName',
                isOrderAscending: true,
                sortBy: ConditionAssociationSortByType.pipelineName,
                associationTypes: [ConditionAssociationType.pipelines, ConditionAssociationType.featuredResults],
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v1/admin/pipelines/statements/conditionIdTest/associations?page=2&perPage=10&pipelineName=testName&isOrderAscending=true&sortBy=pipelineName&associationTypes=%5B%22pipelines%22%2C%22featuredResults%22%5D',
            );
        });
    });
});
