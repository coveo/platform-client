import API from '../../../APICore.js';
import {
    DataService,
    DataServiceQueriesResponseModelWithErrors,
    DataServiceQueryFactory,
    DataServiceQueryResponseModel,
} from '../index.js';

jest.mock('../../../APICore.js');

describe('DataService', () => {
    let dataService: DataService;
    const api = jest.mocked(new API({accessToken: '🔑'}));
    const serverlessApi = jest.mocked(new API({accessToken: '🔑'}, true));
    Object.defineProperty(api, 'organizationId', {get: () => 'someOrgId'});

    const query1 = DataServiceQueryFactory.infer({
        fromTable: 'fake',
        selectFields: [DataServiceQueryFactory.columnField<'STRING'>('test')],
        fromDate: new Date('2024-01-01T00:00:00.000Z'),
        toDate: new Date('2024-01-31T23:59:59.999Z'),
    });
    const query2 = DataServiceQueryFactory.infer({
        fromTable: 'fake',
        selectFields: [DataServiceQueryFactory.columnField<'FLOAT'>('value')],
        selectTrendFields: [
            DataServiceQueryFactory.trendRelativeDifference(DataServiceQueryFactory.columnField<'FLOAT'>('value')),
        ],
        fromDate: new Date('2024-02-01T00:00:00.000Z'),
        toDate: new Date('2024-02-29T23:59:59.999Z'),
    });

    beforeEach(() => {
        jest.clearAllMocks();
        dataService = new DataService(api, serverlessApi);
    });

    describe('listTables', () => {
        it('should make a GET call to the data Service list tables url', () => {
            dataService.listTables();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataService.baseUrl}/tables`, undefined);
        });

        it('should put pagination parameters as query arguments', () => {
            dataService.listTables({page: 1, perPage: 25});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataService.baseUrl}/tables?page=1&perPage=25`, undefined);
        });

        it('can pass RequestInit args', () => {
            const args: RequestInit = {headers: {'X-Test': 'yes'}};
            dataService.listTables(undefined, args);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataService.baseUrl}/tables`, args);
        });
    });

    describe('query', () => {
        it('passes body', () => {
            const body = query1;
            dataService.query(body);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/query`, body, undefined);
        });

        it('can pass RequestInit args', () => {
            const body = query2;
            const args: RequestInit = {headers: {'X-Test': 'yes'}};
            dataService.query(body, args);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/query`, body, args);
        });
    });

    describe('queries', () => {
        it('passes body', () => {
            const body = [query1, query2];
            api.post.mockReturnValueOnce(Promise.resolve({queryResponses: []}));
            dataService.queries(body);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/queries`, body, undefined);
        });

        it('can pass RequestInit args', () => {
            const body = [query2, query1];
            const args: RequestInit = {headers: {'X-Test': 'yes'}};
            api.post.mockReturnValueOnce(Promise.resolve({queryResponses: []}));
            dataService.queries(body, args);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/queries`, body, args);
        });

        it('turns errors into promise rejection', async () => {
            const body = [query2, query1];
            const apiValue: DataServiceQueriesResponseModelWithErrors = {
                queryResponses: [
                    {
                        response: null as unknown as DataServiceQueryResponseModel,
                    },
                    {
                        errorInfo: {errorCode: 'PEBCAK', errorMessage: 'Error - replace user'},
                    },
                    {
                        response: null as unknown as DataServiceQueryResponseModel,
                    },
                    {
                        errorInfo: {errorCode: '123', errorMessage: 'ABC'},
                    },
                ],
            };
            api.post.mockReturnValueOnce(Promise.resolve(apiValue));
            const response = dataService.queries(body);
            await expect(response).rejects.toThrow('Queries encountered one or more errors:\n [1] PEBCAK\n [3] 123');
            await expect(response).rejects.toHaveProperty('queryResponses', apiValue.queryResponses);
        });
    });

    describe('export', () => {
        it('passes body', () => {
            const body = query1;
            dataService.export(body);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/export`, body, undefined);
        });

        it('can pass RequestInit args', () => {
            const body = query2;
            const args: RequestInit = {headers: {'X-Test': 'yes'}};
            dataService.export(body, args);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataService.baseUrl}/export`, body, args);
        });
    });
});
