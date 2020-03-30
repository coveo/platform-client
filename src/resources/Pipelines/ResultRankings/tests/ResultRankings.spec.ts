import API from '../../../../APICore';
import {ResultRankingLocales, ResultRankingMatchOperators, ResultRankingPredicateKind} from '../../../Enums';
import ResultRankings from '../ResultRankings';
import {ResultRanking} from '../ResultRankingsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Result Rankings', () => {
    let resultRankings: ResultRankings;
    const api = new APIMock() as jest.Mocked<API>;

    const resultRanking: ResultRanking = {
        id: 'id',
        resultRanking: {
            name: 'contains',
            defaultMatchOperator: {
                kind: ResultRankingMatchOperators.is,
            },
            predicates: [
                {
                    kind: ResultRankingPredicateKind.basicExpressionAndLocalePredicate,
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
        resultRankings = new ResultRankings(api);
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

            resultRankings.update(pipelineId, resultRankingId, resultRanking);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                ResultRankings.getResultRankingsUrl(pipelineId, resultRankingId),
                resultRanking
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
    });

    describe('create', () => {
        it('should make a PUT call to the specific Result Rankings url', () => {
            const pipelineId = '️a';

            resultRankings.create(pipelineId, resultRanking);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(ResultRankings.getBaseUrl(pipelineId), resultRanking);
        });
    });
});
