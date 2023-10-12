import API from '../../../APICore.js';
import {New} from '../../../Entry.js';
import {HostedInterfaceConditionOperator} from '../../HostedInterfacesCore/index.js';
import InsightPanelInterface from '../InsightPanelInterface.js';
import {InsightPanelInterfaceConfiguration, InsightPanelResultTemplateLayout} from '../InsightPanelInterface.model.js';
jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('InsightPanelInterface', () => {
    let insightPanelInterface: InsightPanelInterface;

    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const config: New<InsightPanelInterfaceConfiguration> = {
        name: 'some insight panel name',
        facets: [
            {
                field: 'somefield',
                label: 'Some Field',
                displayValuesAs: 'checkbox',
            },
            {
                field: 'someotherfield',
                label: 'Some Other Field',
                displayValuesAs: 'link',
            },
        ],
        resultTemplates: [
            {
                name: 'template',
                layout: InsightPanelResultTemplateLayout.Default,
                conditions: [
                    {
                        conditionType: HostedInterfaceConditionOperator.MustMatch,
                        field: 'sourcetype',
                        values: ['youtube'],
                    },
                    {
                        conditionType: HostedInterfaceConditionOperator.IsDefined,
                        field: 'ytlikecount',
                    },
                ],
                badge: {
                    field: 'documenttype',
                    color: '#cc0000',
                },
                details: [
                    {
                        field: 'documenttype',
                        label: 'Document Type',
                    },
                ],
                resultActions: {
                    quickView: {
                        enabled: true,
                    },
                },
                tags: {
                    viewedByCustomer: {
                        enabled: true,
                        color: '#cc0000',
                    },
                    recommended: {
                        enabled: false,
                        color: '#cc4000',
                    },
                    featured: {
                        enabled: false,
                        color: '#cc4000',
                    },
                },
            },
        ],
        tabs: [
            {
                label: 'Articles',
                conditions: [
                    {
                        field: '@sfkbid',
                        conditionType: HostedInterfaceConditionOperator.IsDefined,
                    },
                ],
            },
        ],
        settings: {
            createArticle: {
                enabled: false,
            },
            fullSearch: {
                enabled: false,
            },
            userActions: {
                enabled: true,
                recentClickedDocuments: {
                    enabled: true,
                },
                recentQueries: {
                    enabled: false,
                },
                timeline: {
                    enabled: true,
                },
            },
            smartSnippets: {
                enabled: false,
            },
            disableDynamicNavigation: {
                enabled: false,
            },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        insightPanelInterface = new InsightPanelInterface(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', () => {
            insightPanelInterface.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${InsightPanelInterface.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', () => {
            insightPanelInterface.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', () => {
            insightPanelInterface.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', () => {
            insightPanelInterface.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', () => {
            insightPanelInterface.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the InsightPanelInterface base url', () => {
            insightPanelInterface.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(InsightPanelInterface.baseUrl, config);
        });
    });

    describe('get', () => {
        it('should make a GET call to the InsightPanelInterface base url', () => {
            const id = 'IPInterface-id-to-get';

            insightPanelInterface.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make an UPDATE call to the InsightPanelInterface base url', () => {
            const id = 'IPInterface-id-to-update';

            insightPanelInterface.update({...config, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}`, config);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the InsightPanelInterface base url', () => {
            const id = 'IPInterface-id-to-delete';

            insightPanelInterface.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}`);
        });
    });

    describe('listVersions', () => {
        const id = 'IPInterface-id-to-get';

        it('should make a GET call with all parameters', () => {
            insightPanelInterface.listVersions(id, {page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${InsightPanelInterface.baseUrl}/${id}/versions?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', () => {
            insightPanelInterface.listVersions(id, {page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}/versions?page=2`);
        });

        it('should make a GET call with perPage', () => {
            insightPanelInterface.listVersions(id, {perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}/versions?perPage=10`);
        });

        it('should make a GET call with filter', () => {
            insightPanelInterface.listVersions(id, {filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}/versions?filter=Accounting`);
        });

        it('should make a GET call with order', () => {
            insightPanelInterface.listVersions(id, {order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}/versions?order=asc`);
        });
    });

    describe('getVersion', () => {
        it('should make a GET call to the InsightPanelInterface version url', () => {
            const id = 'IPInterface-id-to-get';
            const versionNumber = 1;

            insightPanelInterface.getVersion(id, versionNumber);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InsightPanelInterface.baseUrl}/${id}/versions/${versionNumber}`);
        });
    });

    describe('restoreVersion', () => {
        it('should make a POST call to the InsightPanelInterface version restore url', () => {
            const id = 'IPInterface-id-to-get';
            const versionNumber = 2;
            const label = 'Some version label';

            insightPanelInterface.restoreVersion(id, versionNumber, {
                label,
            });

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${InsightPanelInterface.baseUrl}/${id}/versions/${versionNumber}/restore`,
                {
                    label,
                },
            );
        });
    });

    describe('updateVersionLabel', () => {
        it('should make a PUT call to the InsightPanelInterface version label url', () => {
            const id = 'IPInterface-id-to-get';
            const versionNumber = 3;
            const label = 'some-label';

            insightPanelInterface.updateVersionLabel(id, versionNumber, {
                label,
            });

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${InsightPanelInterface.baseUrl}/${id}/versions/${versionNumber}/label`,
                {
                    label,
                },
            );
        });
    });
});
