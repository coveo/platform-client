import API from '../../../../APICore';
import {StatementGroupType} from '../../../Enums';
import StatementGroups from '../StatementGroups';
import {
    CreateStatementGroupModel,
    StatementGroupModel,
    StatementGroupRuleAssociationFeatureTypeEnum,
} from '../StatementGroupsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('StatementGroups', () => {
    let groups: StatementGroups;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        groups = new StatementGroups(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the StatementGroups base url', () => {
            const pipelineId = '🍰';

            groups.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(StatementGroups.getBaseUrl(pipelineId));
        });

        it('should make a GET call with a filter', () => {
            const pipelineId = '️🍰';
            const filter = 'nameOfCondition';
            groups.list(pipelineId, {filter});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?filter=nameOfCondition'
            );
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

    describe('delete', () => {
        it('should make a DELETE call to the specific StatementGroups url', () => {
            const pipelineId = '🍄';
            const groupId = '🌿';

            groups.delete(pipelineId, groupId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId));
        });
    });

    describe('toggleActive', () => {
        it('should make a PATCH call to the specific StatementGroups url', () => {
            const pipelineId = '️=)';
            const groupId = '(=';
            const isActive = true;

            groups.toggleActive(pipelineId, groupId, isActive);
            expect(api.patch).toHaveBeenCalledTimes(1);
            expect(api.patch).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                isActive,
            });
        });
    });

    describe('bulkUpdateRuleAssociations', () => {
        it('should make a PUT call to the specific statements group url', () => {
            const pipelineId = 'pipeline1';
            const groupId = 'group1';

            groups.bulkUpdateRuleAssociations(pipelineId, groupId, {
                toAdd: [
                    {
                        ruleId: 'rule1',
                        featureType: StatementGroupRuleAssociationFeatureTypeEnum.ResultRankings,
                    },
                    {
                        ruleId: 'rule2',
                        featureType: StatementGroupRuleAssociationFeatureTypeEnum.ResultRankings,
                    },
                ],
                toRemove: [
                    {
                        ruleId: 'rule3',
                        featureType: StatementGroupRuleAssociationFeatureTypeEnum.ResultRankings,
                    },
                ],
            });
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/pipeline1/statementGroups/group1/associations',
                {
                    toAdd: [
                        {
                            ruleId: 'rule1',
                            featureType: 'resultRankings',
                        },
                        {
                            ruleId: 'rule2',
                            featureType: 'resultRankings',
                        },
                    ],
                    toRemove: [
                        {
                            ruleId: 'rule3',
                            featureType: 'resultRankings',
                        },
                    ],
                }
            );
        });
    });
});
