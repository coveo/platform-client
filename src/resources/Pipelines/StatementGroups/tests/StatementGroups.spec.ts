import API from '../../../../APICore.js';
import {ListStatementGroupStatusType, StatementGroupType} from '../../../Enums.js';
import StatementGroups from '../StatementGroups.js';
import {
    CreateStatementGroupModel,
    UpdateStatementGroupModel,
    StatementGroupRuleAssociationFeatureTypeEnum,
} from '../StatementGroupsInterfaces.js';

jest.mock('../../../../APICore.js');

describe('StatementGroups', () => {
    let groups: StatementGroups;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        groups = new StatementGroups(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the StatementGroups base url', async () => {
            const pipelineId = '🍰';

            await groups.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(StatementGroups.getBaseUrl(pipelineId));
        });

        it('should make a GET call with a filter', async () => {
            const pipelineId = '️🍰';
            const filter = 'nameOfCondition';
            await groups.list(pipelineId, {filter});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?filter=nameOfCondition',
            );
        });

        it('should make a GET call with a status filter', async () => {
            const pipelineId = '️🍰';
            const status = [
                ListStatementGroupStatusType.Active,
                ListStatementGroupStatusType.Expired,
                ListStatementGroupStatusType.Inactive,
                ListStatementGroupStatusType.NotStarted,
            ];
            await groups.list(pipelineId, {status});

            const expectedUri = [
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?status=',
                encodeURIComponent(JSON.stringify(status)),
            ].join('');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUri);
        });

        it('should make a GET call with a status type filter', async () => {
            const pipelineId = '️🍰';
            const types = [StatementGroupType.campaign, StatementGroupType.permanent];
            await groups.list(pipelineId, {types});

            const expectedUri = [
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?types=',
                encodeURIComponent(JSON.stringify(types)),
            ].join('');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUri);
        });

        it('should make a GET call with a sort', async () => {
            const pipelineId = '️🍰';
            await groups.list(pipelineId, {sortBy: 'name', isOrderAscending: false});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?sortBy=name&isOrderAscending=false',
            );

            await groups.list(pipelineId, {sortBy: 'status', isOrderAscending: true});
            expect(api.get).toHaveBeenCalledTimes(2);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/️🍰/statementGroups?sortBy=status&isOrderAscending=true',
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the StatementGroups base url', async () => {
            const pipelineId = '🍸';
            const model: CreateStatementGroupModel = {
                name: '🥂',
                type: StatementGroupType.permanent,
                isActive: true,
            };

            await groups.create(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(StatementGroups.getBaseUrl(pipelineId), model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific StatementGroups url', async () => {
            const pipelineId = '️a';
            const groupId = 'b';

            await groups.get(pipelineId, groupId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId));
        });
    });

    describe('update', () => {
        const group: UpdateStatementGroupModel = {
            name: 'b',
            type: StatementGroupType.permanent,
        };

        it('should make a PUT call to the specific StatementGroups url', async () => {
            const pipelineId = '️a';
            const groupId = 'b';

            await groups.update(pipelineId, groupId, group);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId), group);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific StatementGroups url', async () => {
            const pipelineId = '🍄';
            const groupId = '🌿';

            await groups.delete(pipelineId, groupId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId));
        });
    });

    describe('toggleActive', () => {
        it('should make a PATCH call to the specific StatementGroups url', async () => {
            const pipelineId = '️=)';
            const groupId = '(=';
            const isActive = true;

            await groups.toggleActive(pipelineId, groupId, isActive);
            expect(api.patch).toHaveBeenCalledTimes(1);
            expect(api.patch).toHaveBeenCalledWith(StatementGroups.getStatementGroupUrl(pipelineId, groupId), {
                isActive,
            });
        });
    });

    describe('bulkUpdateRuleAssociations', () => {
        it('should make a PUT call to the specific statements group url', async () => {
            const pipelineId = 'pipeline1';
            const groupId = 'group1';

            await groups.bulkUpdateRuleAssociations(pipelineId, groupId, {
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
                },
            );
        });
    });
});
