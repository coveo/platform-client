import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import CaseAssist from '../CaseAssist';
import {CaseAssistModel, DocumentSuggestionsStrategies, TypingAidsStrategies} from '../CaseAssistInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('CaseAssist', () => {
    let caseAssist: CaseAssist;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        caseAssist = new CaseAssist(api);
    });

    describe('list', () => {
        it('should make a GET call to the CaseAssists base url', () => {
            caseAssist.list({filter: 'foo', page: 2, pageSize: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssist.baseUrl}?filter=foo&page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        const caseAssistModels: Array<New<CaseAssistModel>> = [
            {
                name: 'New CaseAssist1',
                documentSuggestionConfiguration: {
                    pipeline: 'fake_pipeline1',
                    fieldsToFeed: ['field1', 'field2'],
                    filter: 'filter_string',
                    strategy: DocumentSuggestionsStrategies.ITD,
                },
                typingAidsConfiguration: {
                    values: ['value1', 'value2'],
                    strategy: TypingAidsStrategies.StaticValues,
                },
            },
            {
                name: 'New CaseAssist2',
                documentSuggestionConfiguration: {
                    pipeline: 'fake_pipeline1',
                    fieldsToFeed: ['field1', 'field2'],
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
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a POST call to the CaseAssists base url', () => {
                caseAssist.create(caseAssistModel);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(CaseAssist.baseUrl, caseAssistModel);
            });
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific CaseAssist url', () => {
            const caseAssistToDeleteId = 'CaseAssist-to-be-deleted';
            caseAssist.delete(caseAssistToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CaseAssist.baseUrl}/${caseAssistToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific CaseAssist url', () => {
            const caseAssistToGetId = 'CaseAssist-to-be-fetched';
            caseAssist.get(caseAssistToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssist.baseUrl}/${caseAssistToGetId}`);
        });
    });

    describe('update', () => {
        const caseAssistModels: CaseAssistModel[] = [
            {
                id: 'CaseAssist-to-update-id-1',
                name: 'New CaseAssist1',
                documentSuggestionConfiguration: {
                    pipeline: 'fake_pipeline1',
                    fieldsToFeed: ['field1', 'field2'],
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
                name: 'New CaseAssist2',
                documentSuggestionConfiguration: {
                    pipeline: 'fake_pipeline1',
                    fieldsToFeed: ['field1', 'field2'],
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
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a PUT call to the specific CaseAssist url', () => {
                caseAssist.update(caseAssistModel);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(`${CaseAssist.baseUrl}/${caseAssistModel.id}`, caseAssistModel);
            });
        });
    });
});
