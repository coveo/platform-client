import API from '../../../APICore.js';
import {SortingBy} from '../../Enums.js';
import {
    ExistingHostedInterface,
    HostedInterfaceConditionOperator,
    IManifestParameters,
} from '../../HostedInterfacesCore/index.js';
import NextGenSearchPages from '../NextGenSearchPages.js';
import {SearchPageInterfaceConfiguration, SearchPageLayout} from '../NextGenSearchPages.model.js';
jest.mock('../../../APICore.js');

describe('NextGenSearchPages', () => {
    let nextGenSearchPages: NextGenSearchPages;

    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const config: ExistingHostedInterface<SearchPageInterfaceConfiguration> = {
        name: 'some search page name',
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
                badges: [
                    {
                        field: 'documenttype',
                        color: '#cc0000',
                    },
                ],
                details: [
                    {
                        field: 'documenttype',
                        label: 'Document Type',
                    },
                ],
                descriptionEnabled: true,
                resultActions: {
                    copyToClipboard: {enabled: true},
                    quickview: {enabled: true},
                },
            },
        ],
        sortCriteria: [
            {
                by: SortingBy.RELEVANCY,
                label: 'Relevancy',
            },
            {
                by: SortingBy.DATE,
                label: 'Date',
            },
            {
                by: SortingBy.FIELD,
                label: 'Field',
                field: 'somefield',
            },
        ],
        accesses: {
            users: ['user1', 'user2'],
            domains: ['domain1', 'domain2'],
            sharingDomainEnabled: true,
            sharingLinkEnabled: true,
        },
        layout: SearchPageLayout.List,
        style: {
            colors: {
                accent1: '#ffffff',
                accent2: '#000000',
                background: '#ffffff',
                titles: '#000000',
                normalText: '#000000',
                navigationBackground: '#ffffff',
            },
            fontFamily: 'Arial',
        },
        settings: {
            smartSnippets: {enabled: true},
            queryHistory: {enabled: true},
            querySuggestions: {enabled: true},
            peopleAlsoAsk: {enabled: true},
            genQA: {enabled: true},
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        nextGenSearchPages = new NextGenSearchPages(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', async () => {
            await nextGenSearchPages.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${NextGenSearchPages.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', async () => {
            await nextGenSearchPages.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', async () => {
            await nextGenSearchPages.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', async () => {
            await nextGenSearchPages.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', async () => {
            await nextGenSearchPages.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the NextGenSearchPages base url', async () => {
            await nextGenSearchPages.create(config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(NextGenSearchPages.baseUrl, config);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the NextGenSearchPages base url', async () => {
            const id = 'NextGenSearchPages-id-to-delete';

            await nextGenSearchPages.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the NextGenSearchPages base url', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the NextGenSearchPages base url', async () => {
            const id = 'NextGenSearchPages-id-to-update';

            await nextGenSearchPages.update(id, config);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}`, config);
        });
    });

    describe('generatePreview', () => {
        it('should make a POST call to the NextGenSearchPages base url appended with /preview', async () => {
            const id = 'NextGenSearchPages-id-to-preview';

            await nextGenSearchPages.generatePreview(id, config);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/preview`, config);
        });
    });

    describe('getView', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /preview', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.getView(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/preview`);
        });
    });

    describe('getToken', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /token', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.getToken(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/token`);
        });
    });

    describe('getEditInterface', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /edit', async () => {
            const id = 'NextGenSearchPages-id-to-edit';

            await nextGenSearchPages.getEditInterface(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/edit`);
        });
    });

    describe('getLoader', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /loader', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.getLoader(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/loader`);
        });
    });

    describe('getLoginPage', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /login', async () => {
            const id = 'NextGenSearchPages-id-to-login';

            await nextGenSearchPages.getLoginPage(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/login`);
        });
    });

    describe('getAccesses', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /accesses', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.getAccesses(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/accesses`);
        });
    });

    describe('updateAccesses', () => {
        it('should make a PUT call to the NextGenSearchPages base url appended with /accesses', async () => {
            const id = 'NextGenSearchPages-id-to-update';

            await nextGenSearchPages.updateAccesses(id, config.accesses);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/accesses`, config.accesses);
        });
    });

    describe('getAccessesUsers', () => {
        it('should make a GET call to the NextGenSearchPages base url appended with /accesses/users', async () => {
            const id = 'NextGenSearchPages-id-to-get';

            await nextGenSearchPages.getAccessesUsers(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/accesses/users`);
        });
    });

    describe('updateAccessesUsers', () => {
        it('should make a PUT call to the NextGenSearchPages base url appended with /accesses/users', async () => {
            const id = 'NextGenSearchPages-id-to-update';

            await nextGenSearchPages.updateAccessesUsers(id, config.accesses.users);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${NextGenSearchPages.baseUrl}/${id}/accesses/users`,
                config.accesses.users,
            );
        });
    });

    describe('addAccessesUsers', () => {
        it('should make a POST call to the NextGenSearchPages base url appended with /accesses/users', async () => {
            const id = 'NextGenSearchPages-id-to-add';

            await nextGenSearchPages.addAccessesUsers(id, config.accesses.users);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/accesses/users`, {
                users: config.accesses.users,
            });
        });
    });

    describe('requestAccess', () => {
        it('should make a POST call to the NextGenSearchPages base url appended with /accesses/request', async () => {
            const id = 'NextGenSearchPages-id-to-request';

            await nextGenSearchPages.requestAccess(id);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/accesses/request`);
        });
    });

    describe('manifest', () => {
        it('makes a POST call (without a body) to the searchInterfaces accesses manifest url based on the interfaceId', async () => {
            const id = 'search-interface-id';

            await nextGenSearchPages.manifest(id);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/manifest`, undefined);
        });

        it('makes a POST call (with a body) to the searchInterfaces accesses manifest url based on the interfaceId', async () => {
            const id = 'search-interface-id';
            const options: IManifestParameters = {pagePlaceholders: {results: 'myresults'}};
            await nextGenSearchPages.manifest(id, options);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${NextGenSearchPages.baseUrl}/${id}/manifest`, options);
        });
    });
});
