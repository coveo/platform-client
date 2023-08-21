import API from '../../../APICore.js';
import InsightPanelConfig from '../InsightPanelConfig.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('InsightPanelConfig', () => {
    let insightPanel: InsightPanelConfig;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        insightPanel = new InsightPanelConfig(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the InsightPanelConfig base URL', () => {
            insightPanel.list({page: 2, perPage: 10, filter: 'anything', order: 'desc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${InsightPanelConfig.baseUrl}?page=2&perPage=10&filter=anything&order=desc`,
            );
        });

        describe('with order parameter', () => {
            it('should not sort by default', () => {
                insightPanel.list();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(InsightPanelConfig.baseUrl);
            });

            it('should sort in ascending order when specified', () => {
                insightPanel.list({order: 'asc'});

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}?order=asc`);
            });

            it('should sort in descending order when specified', () => {
                insightPanel.list({order: 'desc'});

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}?order=desc`);
            });
        });
    });

    describe('create', () => {
        it('should make a POST call to the InsightPanelConfig base URL', () => {
            const newInsightPanelModel = {
                name: 'my insight panel',
                pipeline: 'some query pipeline',
            };

            insightPanel.create(newInsightPanelModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(InsightPanelConfig.baseUrl, newInsightPanelModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific InsightPanelConfig URL', () => {
            const insightPanelConfigId = 'some-insight-panel-config';
            insightPanel.delete(insightPanelConfigId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific InsightPanelConfig URL', () => {
            const insightPanelModel = {
                id: 'some-insight-panel-config',
                name: 'my insight panel',
                pipeline: 'some query pipeline',
                contextFields: {
                    subject: 'crm-subject-field',
                    description: 'crm-description-field',
                },
                interfaces: [],
            };
            const {id: _, ...insightPanelModelWithoutId} = insightPanelModel;

            insightPanel.update(insightPanelModel);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${InsightPanelConfig.baseUrl}/${insightPanelModel.id}`,
                insightPanelModelWithoutId,
            );
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific InsightPanelConfig URL', () => {
            const insightPanelConfigId = 'some-insight-panel-config';
            insightPanel.get(insightPanelConfigId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to the specific InsightPanelConfig URL', () => {
            const duplicateInsightPanelParams = {
                name: 'my duplicated insight panel',
                id: 'some-insight-panel-config',
            };
            const {id, name} = duplicateInsightPanelParams;

            insightPanel.duplicate(duplicateInsightPanelParams);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${id}`, name);
        });
    });
});
