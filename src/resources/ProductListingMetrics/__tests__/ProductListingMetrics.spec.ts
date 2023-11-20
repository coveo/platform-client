import API from '../../../APICore.js';
import ProductListingMetrics from '../ProductListingMetrics.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ProductListingMetrics', () => {
    let productListingMetrics: ProductListingMetrics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        productListingMetrics = new ProductListingMetrics(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the product listing metrics base url', () => {
            productListingMetrics.list({page: 2, perPage: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListingMetrics.baseUrl}?page=2&perPage=10`);
        });
    });
});
