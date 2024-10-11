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

    /**
     * Gets a sorted page of query pipeline statements matching certain criteria from a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param options Listing options.
     * @returns The matching statements in the current page of results
     */
    list(pipelineId: string, options?: ListStatementParams): Promise<PageModel<StatementModel, 'statements'>> {
        return this.api.get<PageModel<StatementModel, 'statements'>>(
            this.buildPath(Statements.getBaseUrl(pipelineId), {organizationId: this.api.organizationId, ...options}),
        );
    }

    /**
     * Exports the definition, condition, and description of statements from a specific query pipeline to a CSV file.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param options Export options
     * @returns The file containing the exported data.
     */
    exportCSV(pipelineId: string, options?: ExportStatementParams): Promise<Blob> {
        return this.api.get(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/export`, {
                organizationId: this.api.organizationId,
                ...options,
            }),
            {responseBodyFormat: 'blob'},
        );
    }

    /**
     * Import the definition, condition, and description of statements from a CSV file to a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param csvFile The file containing the statements to import.
     * @param options Import options
     */
    importCSV(pipelineId: string, csvFile: File | string, options?: ExportStatementParams) {
        const formData = new FormData();
        if (typeof csvFile === 'string') {
            formData.append('file', csvFile);
        } else {
            formData.append('file', csvFile, csvFile.name);
        }

        return this.api.postForm(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/import`, {
                mode: 'overwrite',
                organizationId: this.api.organizationId,
                ...options,
            }),
            formData,
        );
    }

    /**
     * Creates a new query pipeline statement in a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param model The query pipeline statement information.
     * @returns The created statement.
     */
    create(pipelineId: string, model: CreateStatementModel): Promise<StatementModel> {
        return this.api.post<StatementModel>(
            this.buildPath(Statements.getBaseUrl(pipelineId), {organizationId: this.api.organizationId}),
            model,
        );
    }

    /**
     * Updates a single query pipeline statement in a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param statementId The unique identifier of the target statement.
     * @param model The updated query pipeline statement information.
     * @returns The updated statement.
     */
    update(pipelineId: string, statementId: string, model: CreateStatementModel): Promise<StatementModel> {
        return this.api.put<StatementModel>(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            }),
            model,
        );
    }

    /**
     * Copies specific statements from an origin to a target query pipeline. Using the same pipeline as origin and target will duplicate the specified statements in that pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param model The copy operation to perform.
     * @returns The matching statements in the current page of results.
     */
    copy(pipelineId: string, model: CopyStatementModel) {
        return this.api.post<PageModel<StatementModel, 'statements'>>(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/copy`, {organizationId: this.api.organizationId}),
            model,
        );
    }

    /**
     * Gets a single query pipeline statement from a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param statementId The unique identifier of the target statement.
     * @returns The statement
     */
    get(pipelineId: string, statementId: string): Promise<StatementModel> {
        return this.api.get<StatementModel>(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            }),
        );
    }

    /**
     * Sets the position of a query pipeline statement in a specific query pipeline and updates other statement positions as appropriate.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param statementId The unique identifier of the target statement.
     * @param model The move operation to perform.
     * @returns The matching statements in the current page of results.
     */
    move(
        pipelineId: string,
        statementId: string,
        model: MoveStatementModel,
    ): Promise<PageModel<StatementModel, 'statements'>> {
        return this.api.put<PageModel<StatementModel, 'statements'>>(
            this.buildPath(`${Statements.getStatementUrl(pipelineId, statementId)}/move`, {
                organizationId: this.api.organizationId,
            }),
            model,
        );
    }

    /**
     * Deletes a single query pipeline statement from a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param statementId The unique identifier of the target statement.
     */
    delete(pipelineId: string, statementId: string) {
        return this.api.delete(
            this.buildPath(Statements.getStatementUrl(pipelineId, statementId), {
                organizationId: this.api.organizationId,
            }),
        );
    }

    /**
     * Gets a sorted page of query pipeline statements matching certain criteria from a specific query pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param params A set of parameters to customize the results.
     * @param params.ids
     * @returns The matching statements in the current page of results.
     */
    bulkGet(
        pipelineId: string,
        {ids, ...allQueryStringOptions}: BulkGetStatementsParams,
    ): Promise<PageModel<StatementModel, 'statements'>> {
        return this.api.post<PageModel<StatementModel, 'statements'>>(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/bulkGet`, {
                organizationId: this.api.organizationId,
                ...allQueryStringOptions,
            }),
            {ids},
        );
    }

    /**
     * Delete multiple statements at once for a specific pipeline.
     * @param pipelineId The unique identifier of the target query pipeline.
     * @param ids A list of resource identifiers to delete. A maximum of 100 can be sent.
     */
    bulkDelete(pipelineId: string, ids: string[]) {
        return this.api.post(
            this.buildPath(`${Statements.getBaseUrl(pipelineId)}/bulkDelete`, {
                organizationId: this.api.organizationId,
            }),
            {ids},
        );
    }
}
