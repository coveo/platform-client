import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import {SortingBy, SortingOrder} from '../../Enums.js';
import {IAccesses, IManifestParameters} from '../../HostedInterfacesCore/index.js';
import SearchInterfaces from '../SearchInterfaces.js';
import {ISearchInterfaceConfiguration} from '../SearchInterfaces.model.js';

jest.mock('../../../APICore.js');

describe('SearchInterfaces', () => {
    let searchInterfaces: SearchInterfaces;

    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
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
        sortCriteria: [
            {
                by: SortingBy.RELEVANCY,
                label: 'label',
            },
            {
                by: SortingBy.DATE,
                label: 'labelx',
                order: SortingOrder.DESC,
            },
            {
                by: SortingBy.FIELD,
                label: 'fieldlabel',
                order: SortingOrder.ASC,
                field: 'field',
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
        it('should make a GET call with all parameters', async () => {
            await searchInterfaces.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${SearchInterfaces.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', async () => {
            await searchInterfaces.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', async () => {
            await searchInterfaces.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', async () => {
            await searchInterfaces.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', async () => {
            await searchInterfaces.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the SearchInterfaces base url', async () => {
            await searchInterfaces.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SearchInterfaces.baseUrl, config);
        });
    });

    describe('get', () => {
        it('should make a GET call to the SearchInterfaces base url', async () => {
            const id = 'SearchInterface-id-to-get';

            await searchInterfaces.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make a UPDATE call to the SearchInterfaces base url', async () => {
            const id = 'SearchInterface-id-to-update';

            await searchInterfaces.update({...config, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`, {...config, id});
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the SearchInterfaces base url', async () => {
            const id = 'SearchInterface-id-to-delete';

            await searchInterfaces.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}`);
        });
    });

    describe('getAccesses', () => {
        it('makes a GET call to the searchInterfaces accesses url based on the interfaceId', async () => {
            const id = 'search-interface-id';

            await searchInterfaces.getAccesses(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses`);
        });
    });

    describe('updateAccesses', () => {
        it('makes a PUT call to the SearchInterfaces accesses url', async () => {
            const someAccesses: IAccesses = {
                users: [],
                domains: [],
                sharingDomainEnabled: false,
                sharingLinkEnabled: false,
            };
            const id = 'SearchInterface-id-to-update-accesses';

            await searchInterfaces.updateAccesses(id, someAccesses);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses`, someAccesses);
        });
    });

    describe('getAccessesUsers', () => {
        it('makes a GET call to the searchInterfaces accesses users url based on the interfaceId', async () => {
            const id = 'search-interface-id';

            await searchInterfaces.getAccessesUsers(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses/users`);
        });
    });

    describe('updateAccessesUsers', () => {
        it('makes a PUT call to the searchInterfaces accesses users url based on the interfaceId', async () => {
            const id = 'search-interface-id';
            const someUsers = ['Tinky Winky', 'Dipsy', 'Laa-Laa', 'Po'];

            await searchInterfaces.updateAccessesUsers(id, someUsers);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses/users`, someUsers);
        });
    });

    describe('addAccessesUsers', () => {
        it('makes a POST call to the searchInterfaces accesses users url based on the interfaceId', async () => {
            const id = 'search-interface-id';
            const someUsers = ['Tinky Winky', 'Dipsy', 'Laa-Laa', 'Po'];

            await searchInterfaces.addAccessesUsers(id, someUsers);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses/users`, {
                users: someUsers,
            });
        });

        it('makes a POST with a notify query param when notify is true', async () => {
            const id = 'search-interface-id';
            const someUsers = ['Tinky Winky', 'Dipsy', 'Laa-Laa', 'Po'];

            await searchInterfaces.addAccessesUsers(id, someUsers, true);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses/users?notify=1`, {
                users: someUsers,
            });
        });

        it('makes a POST with a message body param when notify is true and a message is provided', async () => {
            const id = 'search-interface-id';
            const someUsers = ['Tinky Winky', 'Dipsy', 'Laa-Laa', 'Po'];
            const message =
                'The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.';

            await searchInterfaces.addAccessesUsers(id, someUsers, true, message);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/accesses/users?notify=1`, {
                users: someUsers,
                message,
            });
        });
    });

    describe('manifest', () => {
        it('makes a POST call (without a body) to the searchInterfaces accesses manifest url based on the interfaceId', async () => {
            const id = 'search-interface-id';

            await searchInterfaces.manifest(id);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/manifest/v1`, undefined);
        });

        it('makes a POST call (with a body) to the searchInterfaces accesses manifest url based on the interfaceId', async () => {
            const id = 'search-interface-id';
            const options: IManifestParameters = {pagePlaceholders: {results: 'myresults'}};
            await searchInterfaces.manifest(id, options);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchInterfaces.baseUrl}/${id}/manifest/v1`, options);
        });
    });
});
