import API from '../../../APICore.js';
import {RestUserIdType} from '../../Enums.js';
import Search from '../Search.js';
import {RestFacetSearchParameters} from '../SearchInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Search', () => {
    let search: Search;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        search = new Search(api, serverlessApi);
    });

    describe('createToken', () => {
        const tokenParams = {
            userIds: [
                {
                    name: 'asmith@example.com',
                    type: RestUserIdType.User,
                    provider: 'Email Security Provider',
                    infos: {},
                    authCookie: '',
                    password: 'string',
                },
            ],
            userDisplayName: 'Alice Smith',
            userGroups: ['Tech support agents', 'Employees'],
            canSeeUserProfileOf: ['bjones@acme.com', 'dmoore@acme.com'],
            pipeline: 'InternalSearch',
            filter: '@source==KnowledgeBase',
            searchHub: 'SupportHub',
            salesforceOrganizationId: '00Df23090018W5bEAG',
            validFor: 3600000,
            salesforceUser: 'string',
            salesforceCommunityUrl: 'string',
            salesforceFallbackToAdmin: true,
            usertype: 'string',
            licenseDefinitionKey: 'string',
            superUserToken: 'string',
            commerce: {
                catalogId: 'string',
                filter: 'string',
                operation: 'string',
            },
            scope: 0,
        };

        it('should make a post call to the searchAPI correct url with its params to create a token', () => {
            search.createToken(tokenParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Search.baseUrl}/token?organizationId=${API.orgPlaceholder}`,
                tokenParams,
            );
        });
    });

    describe('listFields', () => {
        it('makes a get call to v2 search with its params to fetch the list of fields', () => {
            search.listFields({viewAllContent: true, organizationId: 'my-org', pipeline: 'pipeline'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Search.baseUrl}/fields?viewAllContent=true&organizationId=my-org&pipeline=pipeline`,
            );
        });

        it('makes a get call to v2 search with its params to fetch the list of fields with an empty pipeline', () => {
            search.listFields({viewAllContent: true, organizationId: 'my-org', pipeline: ''});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Search.baseUrl}/fields?viewAllContent=true&organizationId=my-org&pipeline=`,
            );
        });

        it('adds the organizationId query param from the config if missing in the arguments', () => {
            const tempOrganizationId = api.organizationId;
            // change the value of organizationId on the mock
            Object.defineProperty(api, 'organizationId', {value: 'my-org', writable: true});

            search.listFields({});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Search.baseUrl}/fields?organizationId=my-org`);

            // reset organizationId to old value
            Object.defineProperty(api, 'organizationId', {value: tempOrganizationId, writable: true});
        });
    });

    describe('getFieldValue', () => {
        it('should make a get call to searchAPI correct url with its params to fetch the values of a field', () => {
            const params = {ignoreAccents: false};
            const fieldName = 'author';
            search.getFieldValues(fieldName, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Search.baseUrl}/values?field=author&ignoreAccents=false`);
        });
    });

    describe('Make a query on the search', () => {
        it('should make a post call to query the search for result', () => {
            const queryParams = {q: ''};
            search.query(queryParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Search.baseUrl, queryParams);
        });

        it('should not add #viewAllContent query string parameter when not specified', () => {
            const queryParams = {q: ''};
            search.query(queryParams);

            expect(api.post).toHaveBeenCalledWith(Search.baseUrl, {q: ''});
        });

        it('should add #viewAllContent=1 to the query string when set to true', () => {
            const queryParams = {q: '', viewAllContent: true};
            search.query(queryParams);

            expect(api.post).toHaveBeenCalledWith(`${Search.baseUrl}?viewAllContent=1`, {q: ''});
        });

        it('should add #viewAllContent=1 to the query string when set to 1', () => {
            const queryParams = {q: '', viewAllContent: 1};
            search.query(queryParams);

            expect(api.post).toHaveBeenCalledWith(`${Search.baseUrl}?viewAllContent=1`, {q: ''});
        });

        it('should not add #viewAllContent query string parameter when set to false', () => {
            const queryParams = {q: '', viewAllContent: false};
            search.query(queryParams);

            expect(api.post).toHaveBeenCalledWith(Search.baseUrl, {q: ''});
        });

        it('should not add #viewAllContent query string parameter when set to 0', () => {
            const queryParams = {q: '', viewAllContent: 0};
            search.query(queryParams);

            expect(api.post).toHaveBeenCalledWith(Search.baseUrl, {q: ''});
        });
    });

    describe('exportQuery', () => {
        it('makes a post call to the query endpoint with xlsx format', () => {
            const queryParams = {q: ''};
            search.exportQuery(queryParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                Search.baseUrl,
                {q: '', format: 'xlsx'},
                {responseBodyFormat: 'blob'},
            );
        });
    });

    describe('querySuggestPost', () => {
        it('should make a post call to the querySuggest endpoint', () => {
            const queryParams = {q: ''};
            search.querySuggestPost(queryParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Search.baseUrl}/querySuggest`, queryParams);
        });
    });

    describe('previewHTML', () => {
        it('makes a GET call to the /html endpoint', () => {
            search.previewHTML({uniqueId: 'document-id', pipeline: ''});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/search/v2/html?uniqueId=document-id`,
                {pipeline: ''},
                {
                    responseBodyFormat: 'text',
                },
            );
        });
    });

    describe('getDocument', () => {
        it('makes a GET call to the /document endpoint', () => {
            search.getDocument({uniqueId: 'document-id'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/search/v2/document?uniqueId=document-id`);
        });

        it('allows specifying the empty pipeline', () => {
            search.getDocument({uniqueId: 'document-id', pipeline: ''});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/search/v2/document?uniqueId=document-id&pipeline=`);
        });
    });

    describe('searchFacet', () => {
        const searchFacetRequest: RestFacetSearchParameters = {
            field: 'field',
            type: 'hierarchical',
            ignoreValues: ['ignored_value'],
            numberOfValues: 15,
            query: 'query',
            captions: {'all;electronics;laptops": "Laptops"': 'caption1'},
            searchContext: {},
            ignorePaths: ['ignored_path'],
            filterFacetCount: false,
            delimitingCharacter: ';',
            basePath: ['base_path'],
        };
        it('makes a post call to the search facet endpoint', () => {
            search.searchFacet({...searchFacetRequest, organizationId: 'specific-org-id', viewAllContent: true});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenLastCalledWith(
                `/rest/search/v2/facet?organizationId=specific-org-id&viewAllContent=true`,
                searchFacetRequest,
            );
        });
        it('adds the organizationId query param from the config if missing in the arguments', () => {
            const tempOrganizationId = api.organizationId;
            // change the value of organizationId on the mock
            Object.defineProperty(api, 'organizationId', {value: 'my-org', writable: true});

            search.searchFacet(searchFacetRequest);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenLastCalledWith(
                `/rest/search/v2/facet?organizationId=my-org`,
                searchFacetRequest,
            );

            // reset organizationId to old value
            Object.defineProperty(api, 'organizationId', {value: tempOrganizationId, writable: true});
        });
    });
});
