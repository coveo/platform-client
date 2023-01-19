import API from '../../../../APICore.js';
import {
    PredicateKind,
    ResultRankingLocales,
    ResultRankingMatchOperators,
    ResultRankingsRuleTypes,
    ResultRankingsStatuses,
} from '../../../Enums.js';
import ResultRankings from '../ResultRankings.js';
import {CopyResultRankingRequest, ResultRanking} from '../ResultRankingsInterfaces.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Result Rankings', () => {
    let resultRankings: ResultRankings;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const resultRanking: ResultRanking = {
        id: 'id',
        resultRanking: {
            name: 'contains',
            defaultMatchOperator: {
                kind: ResultRankingMatchOperators.is,
            },
            predicates: [
                {
                    kind: PredicateKind.BasicExpressionAndLocalePredicate,
                    basicQueryExpression: 'a',
                    matchOperator: {
                        kind: ResultRankingMatchOperators.contains,
                    },
                    locale: {
                        kind: ResultRankingLocales.all,
                    },
                },
            ],
            targets: [
                {
                    uniqueId: 'ed19c90c3f6d20ae28921cfcb4f425d4afb9c6d0259043b39000ab0434d0',
                },
            ],
            condition: {
                reference: 'asdfasdf',
            },
            matchQuery: false,
            matchAdvancedQuery: true,
            includeInFacets: false,
            isMigrated: false,
            description: '',
            enabled: true,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        resultRankings = new ResultRankings(api, serverlessApi);
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Result Rankings url', () => {
            const pipelineId = 'id';
            const resultRankingId = '12341234';

            resultRankings.delete(pipelineId, resultRankingId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingId));
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Result Rankings url', () => {
            const pipelineId = '️a';
            const resultRankingId = 'b';

            resultRankings.get(pipelineId, resultRankingId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingId));
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Result Rankings url', () => {
            const pipelineId = '️a';
            const resultRankingId = 'b';

            resultRankings.update(pipelineId, resultRankingId, resultRanking.resultRanking);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                ResultRankings.getResultRankingsUrl(pipelineId, resultRankingId),
                resultRanking.resultRanking
            );
        });
    });

    describe('updateJSON', () => {
        it('should make a PUTJSON call to the specific Result Rankings url', () => {
            const pipelineId = '️a';
            const resultRankingId = 'b';
            const json = JSON.stringify(resultRanking.resultRanking);

            resultRankings.updateJSON(pipelineId, resultRankingId, json);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                ResultRankings.getResultRankingsUrl(pipelineId, resultRankingId),
                json,
                {method: 'put', body: json, headers: {'Content-Type': 'application/json'}}
            );
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Result Rankings url', () => {
            const pipelineId = '️a';

            resultRankings.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ResultRankings.getBaseUrl(pipelineId));
        });
        it('should convert associated groups empty array to a JSON string', () => {
            const pipelineId = '️a';
            const associatedGroups = [];
            const expectedUri =
                ResultRankings.getBaseUrl(pipelineId) +
                '?associatedGroups=' +
                encodeURIComponent(JSON.stringify(associatedGroups));

            resultRankings.list(pipelineId, {associatedGroups});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUri);
        });
        it('should convert required fields to a JSON string', () => {
            const pipelineId = '️a';
            const associatedGroups = [null, 'g1', 'g2'];
            const ruleStatuses = [ResultRankingsStatuses.active, ResultRankingsStatuses.inactive];
            const ruleTypes = [ResultRankingsRuleTypes.featuredResults, ResultRankingsRuleTypes.rankingExpressions];
            const expectedUri = [
                ResultRankings.getBaseUrl(pipelineId),
                '?associatedGroups=',
                encodeURIComponent(JSON.stringify(associatedGroups)),
                '&ruleStatuses=',
                encodeURIComponent(JSON.stringify(ruleStatuses)),
                '&ruleTypes=',
                encodeURIComponent(JSON.stringify(ruleTypes)),
            ].join('');

            resultRankings.list(pipelineId, {associatedGroups, ruleStatuses, ruleTypes});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUri);
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Result Rankings url', () => {
            const pipelineId = '️a';

            resultRankings.create(pipelineId, resultRanking.resultRanking);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(ResultRankings.getBaseUrl(pipelineId), resultRanking.resultRanking);
        });
    });

    describe('createJSON', () => {
        it('should make a POSTJSON call to the specific Result Rankings url', () => {
            const pipelineId = '️a';
            const json = JSON.stringify(resultRanking.resultRanking);

            resultRankings.createJSON(pipelineId, json);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(ResultRankings.getBaseUrl(pipelineId), json, {
                method: 'post',
                body: json,
                headers: {'Content-Type': 'application/json'},
            });
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to the specific Result Rankings duplicate url', () => {
            const pipelineId = '️a';

            resultRankings.duplicate(pipelineId, resultRanking.id);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ResultRankings.getBaseUrl(pipelineId)}/duplicate/${resultRanking.id}`
            );
        });
    });

    describe('copy', () => {
        it('should make a POST call to the specific Result Rankings copy url', () => {
            const pipelineId = '️a';
            const params: CopyResultRankingRequest = {
                destinationPipelineId: 'target',
                resultRankingIds: ['rule1', 'rule2'],
            };

            resultRankings.copyTo(pipelineId, params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ResultRankings.getBaseUrl(pipelineId)}/copy`, {
                destinationPipelineId: 'target',
                resultRankingIds: ['rule1', 'rule2'],
            });
        });
    });

    describe('bulkGet', () => {
        it('should make a GET call to the specific Result Rankings url', () => {
            const pipelineId = '️a';
            const ids = ['one', 'two', 'three'];

            resultRankings.bulkGet(pipelineId, {ids});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ResultRankings.getBaseUrl(pipelineId)}/bulkGet`, {ids});
        });
    });

    describe('bulkDelete', () => {
        it('sends a POST call to /bulkDelete with the provided ids', () => {
            resultRankings.bulkDelete('🆔', ['rule-one', 'rule-two']);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v2/admin/pipelines/🆔/resultRankings/bulkDelete', {
                ids: ['rule-one', 'rule-two'],
            });
        });
    });
});
