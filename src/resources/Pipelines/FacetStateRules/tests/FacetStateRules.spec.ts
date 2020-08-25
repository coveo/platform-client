import API from '../../../../APICore';
import {FacetRuleKind, FacetRuleState, PredicateKind, PredicateMatchOperator} from '../../../Enums';
import FacetStateRules from '../FacetStateRules';
import {FacetStateRule} from '../FacetStateRulesInterface';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

const facetStateRuleMock: FacetStateRule = {
    condition: {reference: ''},
    defaultMatchOperator: PredicateMatchOperator.Contain,
    description: '',
    field: '',
    kind: FacetRuleKind.AutoSelect,
    predicates: {
        kind: PredicateKind.BasicExpressionAndLocalePredicate,
        matchOperator: PredicateMatchOperator.Contain,
        code: '',
        basicQueryExpression: '',
    },
    state: FacetRuleState.Selected,
    values: ['', ''],
};

describe('FacetStateRule', () => {
    let facetStateRules: FacetStateRules;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        facetStateRules = new FacetStateRules(api);
    });

    describe('list', () => {
        it('should make a get call to the list Facet State Rule', () => {
            const pipelineId = '🍅';

            facetStateRules.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(FacetStateRules.getBaseUrl(pipelineId));
        });
    });

    describe('get', () => {
        it('Should make a get call to the get Facet State Rule', () => {
            const pipelineId = '🍔';
            const facetStateRuleId = '🍟';

            facetStateRules.get(pipelineId, facetStateRuleId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}`);
        });
    });

    describe('create', () => {
        it('Should make a post call to create a new facet state rule', () => {
            const pipelineId = '🥔';
            facetStateRules.create(pipelineId, facetStateRuleMock);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(FacetStateRules.getBaseUrl(pipelineId), facetStateRuleMock);
        });
    });

    describe('update', () => {
        it('Should make a put call to update a facet state rule', () => {
            const pipelineId = '🦀';
            const facetStateRuleId = '🍞';
            facetStateRules.update(pipelineId, facetStateRuleId, facetStateRuleMock);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}`,
                facetStateRuleMock
            );
        });
    });

    describe('delete', () => {
        it('Should make a delete call to delete a facet state rule', () => {
            const pipelineId = '🎺';
            const facetRuleId = '🎷';
            facetStateRules.delete(pipelineId, facetRuleId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetRuleId}`);
        });
    });

    describe('move', () => {
        it('should make a pul call to position a facet state rule', () => {
            const pipelineId = '👾';
            const facetRuleId = '🚀';
            facetStateRules.move(pipelineId, facetRuleId, 3);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetRuleId}/position`, {
                position: 3,
            });
        });
    });
});
