import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import CaseAssistConfig from '../CaseAssistConfig';
import {
    CaseAssistConfigModel,
    DocumentSuggestionsStrategies,
    TypingAidsStrategies,
} from '../CaseAssistConfigInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('CaseAssistConfig', () => {
    let caseAssist: CaseAssistConfig;
    const api = new APIMock() as jest.Mocked<API>;

    const caseAssistModels: CaseAssistConfigModel[] = [
        {
            id: 'CaseAssist-to-update-id-1',
            name: 'New CaseAssistConfig1',
            documentSuggestionConfiguration: {
                pipeline: 'fake_pipeline1',
                filter: 'filter_string',
                strategy: DocumentSuggestionsStrategies.ITD,
            },
            typingAidsConfiguration: {
                values: ['value1', 'value2'],
                strategy: TypingAidsStrategies.StaticValues,
            },
        },
        {
            id: 'CaseAssist-to-update-id-2',
            name: 'New CaseAssistConfig2',
            documentSuggestionConfiguration: {
                pipeline: 'fake_pipeline1',
                filter: 'filter_string',
                strategy: DocumentSuggestionsStrategies.ITD,
            },
            typingAidsConfiguration: {
                filter: 'filter_string',
                field: 'field_string',
                strategy: TypingAidsStrategies.ValuesFromIndex,
            },
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        caseAssist = new CaseAssistConfig(api);
    });

    describe('list', () => {
        it('should make a GET call to the CaseAssistConfig base url', () => {
            caseAssist.list({page: 2, pageSize: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        const newCaseAssistModels: Array<New<CaseAssistConfigModel>> = caseAssistModels;
        newCaseAssistModels.forEach((caseAssistModel) => {
            it('should make a POST call to the CaseAssistConfig base url', () => {
                caseAssist.create(caseAssistModel);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(CaseAssistConfig.baseUrl, caseAssistModel);
            });
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific CaseAssistConfig url', () => {
            const caseAssistToDeleteId = 'CaseAssist-to-be-deleted';
            caseAssist.delete(caseAssistToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${caseAssistToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific CaseAssistConfig url', () => {
            const caseAssistToGetId = 'CaseAssist-to-be-fetched';
            caseAssist.get(caseAssistToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${caseAssistToGetId}`);
        });
    });

    describe('update', () => {
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a PUT call to the specific CaseAssistConfig url', () => {
                caseAssist.update(caseAssistModel);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `${CaseAssistConfig.baseUrl}/${caseAssistModel.id}`,
                    caseAssistModel
                );
            });
        });
    });
});
