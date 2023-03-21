import Resource from '../../Resource.js';
import {
    BulkGetResultRankingsParams,
    CopyResultRankingRequest,
    CopyResultRankingResponse,
    ListResultRankingParams,
    ListResultRankingResponse,
    ResultRanking,
    ResultRankingProps,
} from './ResultRankingsInterfaces.js';

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
            undefined,
            {body: resultRanking, headers: {'Content-Type': 'application/json'}}
        );
    }

    list(pipelineId: string, params?: ListResultRankingParams) {
        return this.api.get<ListResultRankingResponse>(
            this.buildPath(ResultRankings.getBaseUrl(pipelineId), {
                organizationId: this.api.organizationId,
                ...params,
                associatedGroups: JSON.stringify(params?.associatedGroups),
                ruleStatuses: JSON.stringify(params?.ruleStatuses),
                ruleTypes: JSON.stringify(params?.ruleTypes),
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
            undefined,
            {body: resultRanking, headers: {'Content-Type': 'application/json'}}
        );
    }

    duplicate(pipelineId: string, resultRankingsId: string) {
        return this.api.post<ResultRanking>(
            this.buildPath(`${ResultRankings.getBaseUrl(pipelineId)}/duplicate/${resultRankingsId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    copyTo(pipelineId: string, copyResultRankingRequest: CopyResultRankingRequest) {
        return this.api.post<CopyResultRankingResponse>(
            this.buildPath(`${ResultRankings.getBaseUrl(pipelineId)}/copy`, {
                organizationId: this.api.organizationId,
            }),
            copyResultRankingRequest
        );
    }

    bulkGet(pipelineId: string, {ids, ...allQueryStringOptions}: BulkGetResultRankingsParams) {
        return this.api.post<ListResultRankingResponse>(
            this.buildPath(`${ResultRankings.getBaseUrl(pipelineId)}/bulkGet`, {
                organizationId: this.api.organizationId,
                ...allQueryStringOptions,
            }),
            {ids}
        );
    }

    /**
     * Delete multiple result rankings rules in batch for a specific pipeline.
     *
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param ids A list of result ranking rule identifiers to delete. A maximum of 100 can be sent.
     */
    bulkDelete(pipelineId: string, ids: string[]) {
        return this.api.post(
            this.buildPath(`${ResultRankings.getBaseUrl(pipelineId)}/bulkDelete`, {
                organizationId: this.api.organizationId,
            }),
            {ids}
        );
    }
}
