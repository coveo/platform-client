import API from '../../../APICore.js';
import CaseAssistConfig from '../CaseAssistConfig.js';
import {
    CaseAssistConfigModel,
    CaseClassificationStrategies,
    ContextFields,
    DocumentSuggestionsStrategies,
    SuggestionRequestBody,
    TypingAidsStrategies,
} from '../CaseAssistConfigInterfaces.js';
import {PreviewRequestBody} from '../CaseAssistPreviewInterfaces.js';

jest.mock('../../../APICore.js');

describe('CaseAssistConfig', () => {
    let caseAssist: CaseAssistConfig;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

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
            classificationConfigurations: [
                {
                    filter: 'filter_string',
                    fieldsToPredict: [
                        {
                            name: 'field1',
                        },
                    ],
                    strategy: CaseClassificationStrategies.Some,
                },
            ],
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
            classificationConfigurations: [
                {
                    modelId: 'model-id',
                    strategy: CaseClassificationStrategies.Axon,
                },
            ],
        },
    ];

    const testLocale = 'en-US';
    const testVisitorId = '8djf9s0d-9d8f-f9dj-897f-8dhf7dkg0d84';
    const testContextFields: ContextFields = {
        subject: {
            value: "GC3000 won't start",
        },
        description: {
            value: "My GC3000 series propane generator won't start",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        caseAssist = new CaseAssistConfig(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the CaseAssistConfig base url', async () => {
            await caseAssist.list({page: 2, perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}?page=2&perPage=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the CaseAssistConfig base url', async () => {
            await caseAssist.create(caseAssistModels[0]);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(CaseAssistConfig.baseUrl, caseAssistModels[0]);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific CaseAssistConfig url', async () => {
            const caseAssistToDeleteId = 'CaseAssist-to-be-deleted';
            await caseAssist.delete(caseAssistToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${caseAssistToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific CaseAssistConfig url', async () => {
            const caseAssistToGetId = 'CaseAssist-to-be-fetched';
            await caseAssist.get(caseAssistToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${caseAssistToGetId}`);
        });
    });

    describe('update', () => {
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a PUT call to the specific CaseAssistConfig url', async () => {
                await caseAssist.update(caseAssistModel);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `${CaseAssistConfig.baseUrl}/${caseAssistModel.id}`,
                    caseAssistModel,
                );
            });
        });
    });

    describe('classify', () => {
        it('should make a POST call to get classifications', async () => {
            const testId = 'some config id';
            const testBody: SuggestionRequestBody = {
                visitorId: testVisitorId,
                locale: testLocale,
                fields: testContextFields,
            };

            await caseAssist.classify(testId, testBody);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${testId}/classify`, testBody);
        });
    });

    describe('suggestDocuments', () => {
        it('should make a POST call to get document suggestions', async () => {
            const testId = 'some config id';
            const testBody: SuggestionRequestBody = {
                visitorId: testVisitorId,
                locale: testLocale,
                fields: testContextFields,
            };

            await caseAssist.suggestDocuments(testId, testBody);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/${testId}/documents/suggest`, testBody);
        });
    });

    describe('previewDocumentSuggestion', () => {
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a POST call to get document suggestion preview for configuration', async () => {
                const testBody: PreviewRequestBody = {
                    visitorId: testVisitorId,
                    locale: testLocale,
                    fields: testContextFields,
                    configuration: caseAssistModel,
                };
                await caseAssist.previewDocumentSuggestion(testBody);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(
                    `${CaseAssistConfig.baseUrl}/preview/documents/suggest`,
                    testBody,
                );
            });
        });
    });

    describe('previewCaseClassication', () => {
        caseAssistModels.forEach((caseAssistModel) => {
            it('should make a POST call to get document suggestion preview for configuration', async () => {
                const testBody: PreviewRequestBody = {
                    visitorId: testVisitorId,
                    locale: testLocale,
                    fields: testContextFields,
                    configuration: caseAssistModel,
                };
                await caseAssist.previewCaseClassication(testBody);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(`${CaseAssistConfig.baseUrl}/preview/classify`, testBody);
            });
        });
    });
});
