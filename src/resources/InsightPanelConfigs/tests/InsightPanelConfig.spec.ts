import API from '../../../APICore.js';
import InsightPanelConfig from '../InsightPanelConfig.js';

jest.mock('../../../APICore.js');

describe('InsightPanelConfig', () => {
    let insightPanel: InsightPanelConfig;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        insightPanel = new InsightPanelConfig(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the InsightPanelConfig base URL', async () => {
            await insightPanel.list({page: 2, perPage: 10, filter: 'anything', order: 'desc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${InsightPanelConfig.baseUrl}?page=2&perPage=10&filter=anything&order=desc`,
            );
        });

        describe('with order parameter', () => {
            it('should not sort by default', async () => {
                await insightPanel.list();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(InsightPanelConfig.baseUrl);
            });

            it('should sort in ascending order when specified', async () => {
                await insightPanel.list({order: 'asc'});

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}?order=asc`);
            });

            it('should sort in descending order when specified', async () => {
                await insightPanel.list({order: 'desc'});

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}?order=desc`);
            });
        });
    });

    describe('create', () => {
        it('should make a POST call to the InsightPanelConfig base URL', async () => {
            const newInsightPanelModel = {
                name: 'my insight panel',
                pipeline: 'some query pipeline',
            };

            await insightPanel.create(newInsightPanelModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(InsightPanelConfig.baseUrl, newInsightPanelModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific InsightPanelConfig URL', async () => {
            const insightPanelConfigId = 'some-insight-panel-config';
            await insightPanel.delete(insightPanelConfigId);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific InsightPanelConfig URL', async () => {
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

            await insightPanel.update(insightPanelModel);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${InsightPanelConfig.baseUrl}/${insightPanelModel.id}`,
                insightPanelModelWithoutId,
            );
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific InsightPanelConfig URL', async () => {
            const insightPanelConfigId = 'some-insight-panel-config';
            await insightPanel.get(insightPanelConfigId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
        });
    });

    describe('duplicate', () => {
        it('should make a POST call to the specific InsightPanelConfig URL', async () => {
            const duplicateInsightPanelParams = {
                name: 'my duplicated insight panel',
                id: 'some-insight-panel-config',
            };
            const {id, name} = duplicateInsightPanelParams;

            await insightPanel.duplicate(duplicateInsightPanelParams);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${InsightPanelConfig.baseUrl}/${id}`, {name});
        });
    });
});
