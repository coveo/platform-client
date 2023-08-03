import Ressource from '../../Resource.js';
import {FacetStateRule, ListFacetStateRuleParams, ListFacetStateRuleResponse} from './FacetStateRulesInterface.js';

export default class FacetStateRules extends Ressource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/facetStateRules`;

    list(pipelineId: string, params?: ListFacetStateRuleParams) {
        return this.api.get<ListFacetStateRuleResponse>(
            this.buildPath(FacetStateRules.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
                ...params,
            }),
        );
    }

    get(pipelineId: string, facetStateRuleId: string) {
        return this.api.get<FacetStateRule>(
            this.buildPath(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}`, {
                organizationId: this.api.organizationId,
            }),
        );
    }

    create(pipelineId: string, facetStateRule: FacetStateRule) {
        return this.api.post<FacetStateRule>(
            this.buildPath(FacetStateRules.getBaseUrl(pipelineId), {organizationId: this.api.organizationId}),
            facetStateRule,
        );
    }

    update(pipelineId: string, facetStateRuleId: string, facetStateRule: FacetStateRule) {
        return this.api.put<void>(
            this.buildPath(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}`, {
                organizationId: this.api.organizationId,
            }),
            facetStateRule,
        );
    }

    delete(pipelineId: string, facetStateRuleId: string) {
        return this.api.delete<void>(
            this.buildPath(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}`, {
                organizationId: this.api.organizationId,
            }),
        );
    }

    move(pipelineId: string, facetStateRuleId: string, position: number) {
        return this.api.put<void>(
            this.buildPath(`${FacetStateRules.getBaseUrl(pipelineId)}/${facetStateRuleId}/position`, {
                organizationId: this.api.organizationId,
            }),
            {position},
        );
    }
}
