import API from '../../../APICore.js';
import SearchAnalysis from '../SearchAnalysis.js';

jest.mock('../../../APICore.js');

describe('SearchAnalysis', () => {
    let searchAnalysis: SearchAnalysis;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        searchAnalysis = new SearchAnalysis(api, serverlessApi);
    });

    describe('replay', () => {
        it('should make a replay call to the searchAPI with a partially defined date range', async () => {
            await searchAnalysis.replay('some-search-id', '2023-01-01');
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SearchAnalysis.baseUrl}/inspect/replay?organizationId=${API.orgPlaceholder}`,
                {id: 'some-search-id', dateRange: {from: '2023-01-01'}},
            );
        });

        it('should make a replay call to the searchAPI with a complete defined date range', async () => {
            await searchAnalysis.replay('some-search-id', '2023-01-01', '2023-02-01');
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SearchAnalysis.baseUrl}/inspect/replay?organizationId=${API.orgPlaceholder}`,
                {id: 'some-search-id', dateRange: {from: '2023-01-01', to: '2023-02-01'}},
            );
        });
    });
});
