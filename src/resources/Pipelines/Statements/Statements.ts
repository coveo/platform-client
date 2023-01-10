import {PageModel} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {
    BulkGetStatementsParams,
    CopyStatementModel,
    CreateStatementModel,
    ExportStatementParams,
    ListStatementParams,
    MoveStatementModel,
    StatementModel,
} from './StatementsInterfaces.js';

export default class Statements extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/statements`;
    static getStatementUrl = (pipelineId: string, statementId: string) =>
        `${Statements.getBaseUrl(pipelineId)}/${statementId}`;

    list(pipelineId: string, options?: ListStatementParams) {
        return this.api.get<PageModel<StatementModel, 'statements'>>(
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

    importCSV(pipelineId: string, csvFile: File | string, options?: ExportStatementParams) {
        const fileName = typeof csvFile === 'string' ? 'raw-string' : csvFile.name;
        const formData = new FormData();
        formData.append('file', csvFile, fileName);

        return this.api.postForm(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/import`, {
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
        return this.api.post<PageModel<StatementModel, 'statements'>>(
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
        return this.api.put<PageModel<StatementModel, 'statements'>>(
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

    bulkGet(pipelineId: string, {ids, ...allQueryStringOptions}: BulkGetStatementsParams) {
        return this.api.post<PageModel<StatementModel, 'statements'>>(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/bulkGet`, {
                organizationId: this.api.organizationId,
                ...allQueryStringOptions,
            }),
            {ids}
        );
    }
}
