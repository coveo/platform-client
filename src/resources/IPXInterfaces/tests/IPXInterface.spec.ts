import API from '../../../APICore.js';
import {IPXInterfaceConfiguration, IPXResultTemplateLayout, New} from '../../../Entry.js';
import {HostedInterfaceConditionOperator} from '../../HostedInterfacesCore/index.js';
import IPXInterface from '../IPXInterface.js';
jest.mock('../../../APICore.js');

describe('IPXInterface', () => {
    let ipxInterface: IPXInterface;

    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
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
        it('should make a GET call with all parameters', async () => {
            await ipxInterface.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${IPXInterface.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', async () => {
            await ipxInterface.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', async () => {
            await ipxInterface.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', async () => {
            await ipxInterface.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', async () => {
            await ipxInterface.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the IPXInterface base url', async () => {
            await ipxInterface.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(IPXInterface.baseUrl, config);
        });
    });

    describe('get', () => {
        it('should make a GET call to the IPXInterface base url', async () => {
            const id = 'IPInterface-id-to-get';

            await ipxInterface.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make an UPDATE call to the IPXInterface base url', async () => {
            const id = 'IPInterface-id-to-update';

            await ipxInterface.update(id, config);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`, config);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the IPXInterface base url', async () => {
            const id = 'IPInterface-id-to-delete';

            await ipxInterface.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}`);
        });
    });

    describe('loader', () => {
        it('should make a GET call to the IPXInterface base url appended with /loader', async () => {
            const id = 'IPInterface-id-to-get';

            await ipxInterface.getLoader(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/loader`);
        });
    });

    describe('generatePreview', () => {
        it('should make a POST call to the IPXInterface base url appended with /preview', async () => {
            const id = 'IPInterface-id-to-preview';

            await ipxInterface.generatePreview(id, config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/preview`, config);
        });
    });

    describe('getEditInterface', () => {
        it('should make a GET call to the IPXInterface base url appended with /edit', async () => {
            const id = 'IPInterface-id-to-edit';

            await ipxInterface.getEditInterface(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/edit`);
        });
    });

    describe('getLoginPage', () => {
        it('should make a GET call to the IPXInterface base url appended with /login', async () => {
            const id = 'IPInterface-id-to-login';

            await ipxInterface.getLoginPage(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/login`);
        });
    });

    describe('getToken', () => {
        it('should make a GET call to the IPXInterface base url appended with /token', async () => {
            const id = 'IPInterface-id-to-get-token';

            await ipxInterface.getToken(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${IPXInterface.baseUrl}/${id}/token`);
        });
    });
});
