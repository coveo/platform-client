import API from '../../../APICore.js';
import Data, {Query} from '../Data.js';

jest.mock('../../../APICore.js');

describe('Data Service calls', () => {
    let data: Data;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        data = new Data(api, serverlessApi);
    });

    describe('query', () => {
        const query1: Query = {
            fromTable: 'test_table',
            fromDate: new Date('2023-01-01').toISOString(),
            toDate: new Date('2023-12-31').toISOString(),
            selectFields: [],
            page: 1,
            perPage: 123,
        };

        const query2: Query = {
            fromTable: 'test_table',
            fromDate: new Date('2023-01-01').toISOString(),
            toDate: new Date('2023-12-31').toISOString(),
            selectFields: [],
            page: 1,
            perPage: 123,
        };

        it('should call the query endpoint', async () => {
            await data.query(query1);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`/rest/organizations/${API.orgPlaceholder}/data/v1/query`, query1);
        });

        it('should call the queries endpoint', async () => {
            await data.queries([query1, query2]);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`/rest/organizations/${API.orgPlaceholder}/data/v1/queries`, [
                query1,
                query2,
            ]);
        });
    });
});
