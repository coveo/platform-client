import API from '../../../APICore';
import {New} from '../../../Entry';
import SearchInterfaces from '../SearchInterfaces';
import {ISearchInterfaceConfiguration} from '../SearchInterfaces.model';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SearchInterfaces', () => {
    let searchInterfaces: SearchInterfaces;

    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const config: New<ISearchInterfaceConfiguration> = {
        name: 'some search page name',
        title: 'some search page title',
        facets: [
            {
                field: 'somefield',
                label: 'Some Field',
            },
            {
                field: 'someotherfield',
                label: 'Some Other Field',
            },
        ],
        accesses: {
            users: [],
            domains: [],
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        searchInterfaces = new SearchInterfaces(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', () => {
            searchInterfaces.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${SearchInterfaces.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`
            );
        });

        it('should make a GET call with page', () => {
            searchInterfaces.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', () => {
            searchInterfaces.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', () => {
            searchInterfaces.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', () => {
            searchInterfaces.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the SearchInterfaces base url', () => {
            searchInterfaces.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SearchInterfaces.baseUrl, config);
        });
    });

    describe('get', () => {
        it('should make a GET call to the SearchInterfaces base url', () => {
            const id = 'SearchInterface-id-to-get';
            searchInterfaces.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make a UPDATE call to the SearchInterfaces base url', () => {
            const id = 'SearchInterface-id-to-update';
            searchInterfaces.update({...config, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`, {...config, id});
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the SearchInterfaces base url', () => {
            const id = 'SearchInterface-id-to-delete';
            searchInterfaces.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`);
        });
    });
});
