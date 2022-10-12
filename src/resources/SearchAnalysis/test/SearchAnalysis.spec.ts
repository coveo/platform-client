import API from '../../../APICore';
import SearchAnalysis from '../SearchAnalysis';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SearchAnalysis', () => {
    let searchAnalysis: SearchAnalysis;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        searchAnalysis = new SearchAnalysis(api, serverlessApi);
    });

    describe('replay', () => {
        it('should make a POST call to searchAPI correct url', () => {
            const id = 'some_id';
            searchAnalysis.replay(id);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SearchAnalysis.baseUrl}/inspect/replay?organizationId={organizationName}`,
                expect.objectContaining({id})
            );
        });
    });
});
