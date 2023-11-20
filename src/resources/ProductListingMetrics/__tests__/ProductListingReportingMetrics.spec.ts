import API from '../../../APICore.js';
import ProductListingReportingMetrics from '../ProductListingReportingMetrics.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ProductListingReportingMetrics', () => {
    let productListingReportingMetrics: ProductListingReportingMetrics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        productListingReportingMetrics = new ProductListingReportingMetrics(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific product listing reporting metrics', () => {
            const productListingId = 'b089386a-7f0f-4a82-ba58-63c61385c4ef;';
            productListingReportingMetrics.get(productListingId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingReportingMetrics.baseUrl}/productListings/${productListingId}`,
            );
        });
    });
});
