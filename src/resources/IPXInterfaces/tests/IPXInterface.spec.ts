import API from '../../../APICore.js';
import {IPXInterfaceConfiguration, IPXResultTemplateLayout, New} from '../../../Entry.js';
import {HostedInterfaceConditionOperator} from '../../HostedInterfacesCore/index.js';
import IPXInterface from '../IPXInterface.js';
jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('IPXInterface', () => {
    let ipxInterface: IPXInterface;

    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const config: New<IPXInterfaceConfiguration> = {
        name: 'some ipx name',
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
                layout: IPXResultTemplateLayout.Default,
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
        footer: [
            {
                label: 'some footer label',
                icon: '',
                link: 'http://www.coveo.com',
            },
        ],
        container: {
            usesTargetSelector: false,
            button: {
                label: 'someLabel',
                closeIcon: '',
                openIcon: '',
            },
            targetSelector: '',
        },
        style: {
            colors: {
                primary: '#1372ec',
                background: '#ffffff',
                neutral: '#e5e8e8',
                visitedLink: '#752e9c',
                titles: '#282829',
                button: '#1372ec',
                buttonLabel: '#e55d5d',
            },
            fontFamily:
                '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif',
        },
        settings: {
            smartSnippets: {
                enabled: false,
            },
        },
        created: '2023-05-09T15:58:44.000Z',
        createdBy: 'someone@something.com',
        updated: '2023-05-09T15:58:44.000Z',
        updatedBy: 'someone@something.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        ipxInterface = new IPXInterface(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', () => {
            ipxInterface.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${IPXInterface.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', () => {
            ipxInterface.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', () => {
            ipxInterface.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', () => {
            ipxInterface.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', () => {
            ipxInterface.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the IPXInterface base url', () => {
            ipxInterface.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(IPXInterface.baseUrl, config);
        });
    });

    describe('get', () => {
        it('should make a GET call to the IPXInterface base url', () => {
            const id = 'IPInterface-id-to-get';

            ipxInterface.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make an UPDATE call to the IPXInterface base url', () => {
            const id = 'IPInterface-id-to-update';

            ipxInterface.update({...config, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`, config);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the IPXInterface base url', () => {
            const id = 'IPInterface-id-to-delete';

            ipxInterface.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`);
        });
    });

    describe('loader', () => {
        it('should make a GET call to the IPXInterface base url appended with /loader', () => {
            const id = 'IPInterface-id-to-get';

            ipxInterface.getLoader(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/loader`);
        });
    });

    describe('generatePreview', () => {
        it('should make a POST call to the IPXInterface base url appended with /preview', () => {
            const id = 'IPInterface-id-to-preview';

            ipxInterface.generatePreview({...config, id});

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/preview`, config);
        });
    });

    describe('getEditInterface', () => {
        it('should make a GET call to the IPXInterface base url appended with /edit', () => {
            const id = 'IPInterface-id-to-edit';

            ipxInterface.getEditInterface(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/edit`);
        });
    });

    describe('getLoginPage', () => {
        it('should make a GET call to the IPXInterface base url appended with /login', () => {
            const id = 'IPInterface-id-to-login';

            ipxInterface.getLoginPage(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/login`);
        });
    });

    describe('getToken', () => {
        it('should make a GET call to the IPXInterface base url appended with /token', () => {
            const id = 'IPInterface-id-to-get-token';

            ipxInterface.getToken(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/token`);
        });
    });
});
