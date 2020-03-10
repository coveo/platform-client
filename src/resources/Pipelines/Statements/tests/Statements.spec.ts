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

    beforeEach(() => {
        jest.clearAllMocks();
        statements = new Statements(api);
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
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
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
});
