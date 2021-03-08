import API from '../../../../APICore';
import {StatementsFeature} from '../../../Enums';
import Statements from '../Statements';
import {
    CopyStatementModel,
    CreateStatementModel,
    ExportStatementParams,
    MoveStatementModel,
} from '../StatementsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Statements', () => {
    let statements: Statements;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        statements = new Statements(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Statements url', () => {
            const pipelineId = '⚽️';

            statements.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Statements.getBaseUrl(pipelineId));
        });
    });

    describe('exportCSV', () => {
        it('should make a GET call to the specific Statements url', () => {
            const pipelineId = '🎱';
            const options: ExportStatementParams = {
                feature: StatementsFeature.Ranking,
            };

            statements.exportCSV(pipelineId, options);
            expect(api.getFile).toHaveBeenCalledTimes(1);
            expect(api.getFile).toHaveBeenCalledWith(
                `${Statements.getBaseUrl(pipelineId)}/export?feature=${options.feature}`
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Statements url', () => {
            const pipelineId = '🏀';
            const model: CreateStatementModel = {
                feature: StatementsFeature.Thesaurus,
                definition: 'alias ⚾️, 🥎',
                position: 1,
            };

            statements.create(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Statements.getBaseUrl(pipelineId), model);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Statement url', () => {
            const pipelineId = '🏹';
            const statementId = '🎯';

            const model: CreateStatementModel = {
                feature: StatementsFeature.Thesaurus,
                definition: 'alias ⚾️, 🥎',
                position: 2,
            };

            statements.update(pipelineId, statementId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Statements.getStatementUrl(pipelineId, statementId)}`, model);
        });
    });

    describe('copy', () => {
        it('should make a POST call to the specific Statements url', () => {
            const pipelineId = '🏀';
            const model: CopyStatementModel = {
                destinationPipelineId: '🏉',
                statementIds: ['🏓'],
            };

            statements.copy(pipelineId, model);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Statements.getBaseUrl(pipelineId)}/copy`, model);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Statement url', () => {
            const pipelineId = '⛳️';
            const statementId = '🏒';

            statements.get(pipelineId, statementId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Statements.getStatementUrl(pipelineId, statementId));
        });
    });

    describe('move', () => {
        it('should make a PUT call to the specific Statement url', () => {
            const pipelineId = '🎿';
            const statementId = '⛷';

            const model: MoveStatementModel = {
                after: '🏂',
            };

            statements.move(pipelineId, statementId, model);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Statements.getStatementUrl(pipelineId, statementId)}/move`, model);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Statement url', () => {
            const pipelineId = '🏐';
            const statementId = '🎽';

            statements.delete(pipelineId, statementId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(Statements.getStatementUrl(pipelineId, statementId));
        });
    });

    describe('import', () => {
        const mockedFormData = {
            append: jest.fn(),
        };

        beforeEach(() => {
            (global as any).FormData = jest.fn(() => mockedFormData);
            (global as any).File = jest.fn(() => ({}));
        });

        it('should post the file content inside a form multi part data', async () => {
            const myCSVFile = new File(['egg'], 'egg.txt', {type: 'text/csv'});

            statements.importCSV('🥚', myCSVFile, {feature: StatementsFeature.Stop});

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/🥚/statements/import?mode=overwrite&feature=stop',
                mockedFormData
            );
            expect(mockedFormData.append).toHaveBeenCalledTimes(1);
            expect(mockedFormData.append).toHaveBeenCalledWith('file', myCSVFile, myCSVFile.name);
        });

        it('should post the string content inside a form multi part data', async () => {
            const content = `definition,condition,description,feature\n"alias ""CPU"", ""processor""",,Tech thesaurus,thesaurus\n"alias ""Television"", ""Televisions"", ""TV"", ""TVs""",,Basic thesaurus,thesaurus`;

            statements.importCSV('🥚', content, {feature: StatementsFeature.Thesaurus});

            expect(api.postForm).toHaveBeenCalledTimes(1);
            expect(api.postForm).toHaveBeenCalledWith(
                '/rest/search/v2/admin/pipelines/🥚/statements/import?mode=overwrite&feature=thesaurus',
                mockedFormData
            );
            expect(mockedFormData.append).toHaveBeenCalledTimes(1);
            expect(mockedFormData.append).toHaveBeenCalledWith('file', content, 'raw-string');
        });
    });
});
