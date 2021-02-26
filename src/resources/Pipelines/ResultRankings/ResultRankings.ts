import Resource from '../../Resource';
import {
    ListResultRankingParams,
    ListResultRankingResponse,
    ResultRanking,
    ResultRankingProps,
} from './ResultRankingsInterfaces';

export default class ResultRankings extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/resultRankings`;
    static getResultRankingsUrl = (pipelineId: string, resultRankingsId: string) =>
        `${ResultRankings.getBaseUrl(pipelineId)}/${resultRankingsId}`;

    delete(pipelineId: string, resultRankingsId: string) {
        return this.api.delete<ResultRanking>(
            this.buildPath(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingsId), {
                organizationId: this.api.organizationId,
            })
        );
    }

    get(pipelineId: string, resultRankingsId: string) {
        return this.api.get<ResultRankingProps>(
            this.buildPath(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingsId), {
                organizationId: this.api.organizationId,
            })
        );
    }

    update(pipelineId: string, resultRankingsId: string, resultRanking: ResultRankingProps) {
        return this.api.put<void>(
            this.buildPath(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingsId), {
                organizationId: this.api.organizationId,
            }),
            resultRanking
        );
    }

    updateJSON(pipelineId: string, resultRankingsId: string, resultRanking: string) {
        return this.api.put<void>(
            this.buildPath(ResultRankings.getResultRankingsUrl(pipelineId, resultRankingsId), {
                organizationId: this.api.organizationId,
            }),
            resultRanking,
            {method: 'put', body: resultRanking, headers: {'Content-Type': 'application/json'}}
        );
    }

    list(pipelineId: string, params?: ListResultRankingParams) {
        return this.api.get<ListResultRankingResponse>(
            this.buildPath(ResultRankings.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
                ...params,
                associatedGroups: JSON.stringify(params?.associatedGroups)
            })
        );
    }

    create(pipelineId: string, resultRanking: ResultRankingProps) {
        return this.api.post<ResultRanking>(
            this.buildPath(ResultRankings.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
            }),
            resultRanking
        );
    }

    createJSON(pipelineId: string, resultRanking: string) {
        return this.api.post<ResultRanking>(
            this.buildPath(ResultRankings.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
            }),
            resultRanking,
            {method: 'post', body: resultRanking, headers: {'Content-Type': 'application/json'}}
        );
    }

    duplicate(pipelineId: string, resultRankingsId: string) {
        return this.api.post<ResultRanking>(
            this.buildPath(`${ResultRankings.getBaseUrl(pipelineId)}/duplicate/${resultRankingsId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }
}
