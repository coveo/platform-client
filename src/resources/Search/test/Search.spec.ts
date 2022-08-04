import API from '../../../APICore';
import {RestUserIdType} from '../../Enums';
import Search from '../Search';

jest.mock('../../../APICore');

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
                tokenParams
            );
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

    describe('querySuggestPost', () => {
        it('should make a post call to the querySuggest endpoint', () => {
            const queryParams = {q: ''};
            search.querySuggestPost(queryParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Search.baseUrl}/querySuggest`, queryParams);
        });
    });
});
