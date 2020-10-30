import Resource from '../../Resource';
import {
    CopyStatementModel,
    CreateStatementModel,
    ExportStatementParams,
    ListStatementParams,
    MoveStatementModel,
    StatementModel,
    StatementModelList,
} from './StatementsInterfaces';

export default class Statements extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/statements`;
    static getLegacyUrl = (pipelineId: string) => `/rest/search/admin/pipelines/${pipelineId}/statements`;
    static getStatementUrl = (pipelineId: string, statementId: string) =>
        `${Statements.getBaseUrl(pipelineId)}/${statementId}`;

    list(pipelineId: string, options?: ListStatementParams) {
        return this.api.get<StatementModelList>(
            this.buildPath(Statements.getBaseUrl(pipelineId), {organizationId: this.api.organizationId, ...options})
        );
    }

    exportCSV(pipelineId: string, options?: ExportStatementParams) {
        return this.api.getFile(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/export`, {
                organizationId: this.api.organizationId,
                ...options,
            })
        );
    }

    importCSV(pipelineId: string, csvFile: File, options?: ExportStatementParams) {
        const formData = new FormData();
        formData.set('file', csvFile);
        return this.api.postForm(
            this.buildPath(`${Statements.getLegacyUrl(pipelineId)}/import`, {
                mode: 'overwrite',
                organizationId: this.api.organizationId,
                ...options,
            }),
            formData
        );
    }

    create(pipelineId: string, model: CreateStatementModel) {
        return this.api.post<StatementModel>(
            this.buildPath(Statements.getBaseUrl(pipelineId), {organizationId: this.api.organizationId}),
            model
        );
    }

    update(pipelineId: string, statementId: string, model: CreateStatementModel) {
        return this.api.put<StatementModel>(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            }),
            model
        );
    }

    copy(pipelineId: string, model: CopyStatementModel) {
        return this.api.post<StatementModelList>(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/copy`, {organizationId: this.api.organizationId}),
            model
        );
    }

    get(pipelineId: string, statementId: string) {
        return this.api.get<StatementModel>(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            })
        );
    }

    move(pipelineId: string, statementId: string, model: MoveStatementModel) {
        return this.api.put<StatementModelList>(
            this.buildPath(`${Statements.getStatementUrl(pipelineId, statementId)}/move`, {
                organizationId: this.api.organizationId,
            }),
            model
        );
    }

    delete(pipelineId: string, statementId: string) {
        return this.api.delete(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            })
        );
    }
}
