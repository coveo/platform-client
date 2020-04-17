import API from '../../../../APICore';
import Condition from '../Condition';
import {NewConditionModel} from '../ConditionInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Condition', () => {
    let conditions: Condition;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        conditions = new Condition(api);
    });

    describe('list', () => {
        it('should make a GET call to the specific Condition url', () => {
            conditions.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements?feature=when');
        });

        it('should use the passed options in the query parameters', () => {
            conditions.list({filter: 'cat', page: 2});
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v1/admin/pipelines/statements?feature=when&filter=cat&page=2'
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Condition url', () => {
            const model: NewConditionModel = {
                definition: 'when $browser is "chrome"',
            };

            conditions.create(model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements', model);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Statement url', () => {
            const conditionId = '🎯';

            const model: NewConditionModel = {
                id: '🎯',
                definition: 'when $browser is "chrome"',
            };

            conditions.update(conditionId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🎯', model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Statement url', () => {
            const conditionId = '🏒';

            conditions.get(conditionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🏒');
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Statement url', () => {
            const conditionId = '🎽';

            conditions.delete(conditionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/search/v1/admin/pipelines/statements/🎽');
        });
    });
});
