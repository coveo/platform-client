import API from '../../../../APICore';
import CaseClassificationConfiguration from '../CaseClassificationConfiguration';
import {CaseClassificationConfigurationModel, Operator} from '../CaseClassificationConfigurationInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('CaseClassificationConfiguration', () => {
    let ccConfig: CaseClassificationConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const modelConfigs: CaseClassificationConfigurationModel[] = [
        {
            modelId: 'test-model-id',
            modelDisplayName: 'Model Name 1',
            sources: ['1st-source', '2nd-source'],
            languageField: 'English',
            caseExtractionPeriod: {
                dateField: 'date',
                exportPeriod: 'test-export-period',
            },
            caseFilterConditions: [
                {
                    field: 'test-field',
                    operator: Operator.Equals,
                    value: 'test-value',
                },
            ],
            caseIdField: 'test-case-id',
            fieldsForModelTraining: ['1st-field', '2nd-field', '3rd-field'],
            fieldsToPredict: ['1st-field', '2nd-field', '3rd-field'],
        },
        {
            modelId: 'test-model-id',
            modelDisplayName: 'Model Name 1',
            sources: ['1st-source', '2nd-source'],
            caseIdField: 'test-case-id',
            fieldsForModelTraining: ['1st-field', '2nd-field'],
            fieldsToPredict: ['1st-field', '2nd-field'],
            languageField: 'Gerudo',
        },
        {
            modelId: 'test-model-id',
            modelDisplayName: 'Model Name 1',
            sources: ['1st-source', '2nd-source'],
            languageField: 'Klingon',
            caseExtractionPeriod: {
                dateField: 'date',
                startTime: 9876543210,
                endTime: 1234567890,
            },
            caseFilterConditions: [
                {
                    field: 'test-field',
                    operator: Operator.NotEquals,
                    value: 'test-value',
                },
            ],
            caseIdField: 'test-case-id',
            fieldsForModelTraining: ['1st-field', '2nd-field', '3rd-field'],
            fieldsToPredict: ['1st-field', '2nd-field', '3rd-field'],
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        ccConfig = new CaseClassificationConfiguration(api, serverlessApi);
    });

    describe('create', () => {
        const newCCConfigModel = modelConfigs;
        newCCConfigModel.forEach((config) => {
            it('should make a POST call to the Case Classification Configuration base url', () => {
                const {modelId, ...newConfig} = config;
                ccConfig.create(newConfig);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(CaseClassificationConfiguration.modelUrl, newConfig);
            });
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Case Classification Configuration url', () => {
            const configToDeleteId = 'config-to-be-deleted';
            ccConfig.delete(configToDeleteId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CaseClassificationConfiguration.modelUrl}/${configToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Case Classification Configuration url', () => {
            const configToGetId = 'config-to-be-fetched';
            ccConfig.get(configToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CaseClassificationConfiguration.modelUrl}/${configToGetId}`);
        });
    });

    describe('update', () => {
        modelConfigs.forEach((config) => {
            it('should make a PUT call to the specific Case Classification Configuration url', () => {
                ccConfig.update(config);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(
                    `${CaseClassificationConfiguration.modelUrl}/${config.modelId}`,
                    config
                );
            });
        });
    });

    describe('fields', () => {
        it('should make a POST call to retrieve valid content field candidates for the Case Classification Configuration', () => {
            const params = {
                sources: ['1st-source', '2nd-source'],
                languageField: 'English',
                caseExtractionPeriod: {
                    dateField: 'date',
                    exportPeriod: 'test-export-period',
                },
                caseFilterConditions: [
                    {
                        field: 'test-field',
                        operator: Operator.Equals,
                        value: 'test-value',
                    },
                ],
            };
            ccConfig.fields(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(CaseClassificationConfiguration.fieldsUrl, params);
        });
    });

    describe('preview', () => {
        it('should make a POST call to retrieve document group preview info from the Case Classification Configuration preview url', () => {
            const params = {
                sources: ['1st-source', '2nd-source'],
                languageField: 'English',
                caseExtractionPeriod: {
                    dateField: 'date',
                    exportPeriod: 'test-export-period',
                },
                caseFilterConditions: [
                    {
                        field: 'test-field',
                        operator: Operator.Equals,
                        value: 'test-value',
                    },
                ],
            };
            ccConfig.preview(params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(CaseClassificationConfiguration.previewUrl, params);
        });
    });
});
