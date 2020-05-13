import API from '../../../../APICore';
import {StatementGroupType} from '../../../Enums';
import StatementGroups from '../StatementGroups';
import {CreateStatementGroupModel, StatementGroupModel} from '../StatementGroupsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('StatementGroups', () => {
    let groups: StatementGroups;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        groups = new StatementGroups(api);
    });

    describe('list', () => {
        it('should make a GET call to the StatementGroups base url', () => {
            const pipelineId = '🍰';

            groups.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(StatementGroups.getBaseUrl(pipelineId));
        });
    });

    describe('create', () => {
        it('should make a POST call to the StatementGroups base url', () => {
            const pipelineId = '🍸';
            const model: CreateStatementGroupModel = {
                name: '🥂',
                type: StatementGroupType.permanent,
            };

            groups.create(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(StatementGroups.getBaseUrl(pipelineId), model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific StatementGroups url', () => {
            const pipelineId = '️a';
            const groupId = 'b';

            groups.get(pipelineId, groupId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId));
        });
    });

    describe('update', () => {
        const group: StatementGroupModel = {
            id: 'a',
            name: 'b',
            type: StatementGroupType.permanent,
            createdAt: 'la',
            statementComposition: {
                resultRankingStatementCount: 1,
                otherStatementCount: 2,
            },
        };

        it('should make a PUT call to the specific StatementGroups url', () => {
            const pipelineId = '️a';
            const groupId = 'b';

            groups.update(pipelineId, groupId, group);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId), group);
        });
    });
});
