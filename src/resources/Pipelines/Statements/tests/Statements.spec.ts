import API from '../../../../APICore.js';
import {StatementsFeature} from '../../../Enums.js';
import Statements from '../Statements.js';
import {
    CopyStatementModel,
    CreateStatementModel,
    ExportStatementParams,
    MoveStatementModel,
} from '../StatementsInterfaces.js';

jest.mock('../../../../APICore.js');

describe('Statements', () => {
    let statements: Statements;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        statements = new Statements(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Statements url', async () => {
            const pipelineId = '⚽️';

            await statements.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Statements.getBaseUrl(pipelineId));
        });
    });

    describe('exportCSV', () => {
        it('should make a GET call to the specific Statements url', async () => {
            const pipelineId = '🎱';
            const options: ExportStatementParams = {
                feature: StatementsFeature.Ranking,
            };

            await statements.exportCSV(pipelineId, options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Statements.getBaseUrl(pipelineId)}/export?feature=${options.feature}`,
                {responseBodyFormat: 'blob'},
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Statements url', async () => {
            const pipelineId = '🏀';
            const model: CreateStatementModel = {
                feature: StatementsFeature.Thesaurus,
                definition: 'alias ⚾️, 🥎',
                position: 1,
            };

            await statements.create(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Statements.getBaseUrl(pipelineId), model);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Statement url', async () => {
            const pipelineId = '🏹';
            const statementId = '🎯';

            const model: CreateStatementModel = {
                feature: StatementsFeature.Thesaurus,
                definition: 'alias ⚾️, 🥎',
                position: 2,
            };

            await statements.update(pipelineId, statementId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Statements.getStatementUrl(pipelineId, statementId)}`, model);
        });
    });

    describe('copy', () => {
        it('should make a POST call to the specific Statements url', async () => {
            const pipelineId = '🏀';
            const model: CopyStatementModel = {
                destinationPipelineId: '🏉',
                statementIds: ['🏓'],
            };

            await statements.copy(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Statements.getBaseUrl(pipelineId)}/copy`, model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Statement url', async () => {
            const pipelineId = '⛳️';
            const statementId = '🏒';

            await statements.get(pipelineId, statementId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Statements.getStatementUrl(pipelineId, statementId));
        });
    });

    describe('move', () => {
        it('should make a PUT call to the specific Statement url', async () => {
            const pipelineId = '🎿';
            const statementId = '⛷';

            const model: MoveStatementModel = {
                after: '🏂',
            };

            await statements.move(pipelineId, statementId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Statements.getStatementUrl(pipelineId, statementId)}/move`, model);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Statement url', async () => {
            const pipelineId = '🏐';
            const statementId = '🎽';

            await statements.delete(pipelineId, statementId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(Statements.getStatementUrl(pipelineId, statementId));
        });
    });

    describe('import', () => {
        const mockedFormData = {
            append: jest.fn(),
        };

        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (global as any).FormData = jest.fn(() => mockedFormData);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (global as any).File = jest.fn(() => ({}));
        });

        it('should post the file content inside a form multi part data', async () => {
            const myCSVFile = new File(['egg'], 'egg.txt', {type: 'text/csv'});

            await statements.importCSV('🥚', myCSVFile, {feature: StatementsFeature.Stop});

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/🥚/statements/import?mode=overwrite&feature=stop',
                mockedFormData,
            );
            expect(mockedFormData.append).toHaveBeenCalledTimes(1);
            expect(mockedFormData.append).toHaveBeenCalledWith('file', myCSVFile, myCSVFile.name);
        });

        it('should post the string content inside a form multi part data', async () => {
            const content = `definition,condition,description,feature\n"alias ""CPU"", ""processor""",,Tech thesaurus,thesaurus\n"alias ""Television"", ""Televisions"", ""TV"", ""TVs""",,Basic thesaurus,thesaurus`;

            await statements.importCSV('🥚', content, {feature: StatementsFeature.Thesaurus});

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/🥚/statements/import?mode=overwrite&feature=thesaurus',
                mockedFormData,
            );
            expect(mockedFormData.append).toHaveBeenCalledTimes(1);
            expect(mockedFormData.append).toHaveBeenCalledWith('file', content);
        });
    });

    describe('bulkGet', () => {
        it('should make a POST call to the specific Statement url', async () => {
            const pipelineId = '🏐';
            const ids = ['one', 'two', 'three'];

            await statements.bulkGet(pipelineId, {ids});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Statements.getBaseUrl(pipelineId)}/bulkGet`, {ids});
        });
    });

    describe('bulkDelete', () => {
        it('sends a POST call to /bulkDelete with the provided ids', async () => {
            await statements.bulkDelete('🆔', ['rule-one', 'rule-two']);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/search/v2/admin/pipelines/🆔/statements/bulkDelete', {
                ids: ['rule-one', 'rule-two'],
            });
        });
    });
});
