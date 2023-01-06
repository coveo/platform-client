import API from '../../../APICore';
import {New} from '../../../Entry';
import {HostedInterfaceResultTemplateLayout, HostedInterfaceConditionOperator} from '../../HostedInterfacesCore';
import IPXInterface from '../IPXInterface';
import {IPXInterfaceConfiguration} from '../IPXInterface.model';

jest.mock('../../../APICore');

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
                layout: HostedInterfaceResultTemplateLayout.Default,
                conditions: [
                    {
                        conditionType: HostedInterfaceConditionOperator.MustMatch,
                        field: 'sourcetype',
                        values: ['youtube'],
                    },
                    {
                        conditionType: HostedInterfaceConditionOperator.isDefined,
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
                        conditionType: HostedInterfaceConditionOperator.isDefined,
                    },
                ],
            },
        ],
        button: {
            label: 'label',
        },
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
                `${IPXInterface.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`
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
});
