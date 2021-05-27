import API from '../../../APICore';
import LicenseMetrics from '../LicenseMetrics/LicenseMetrics';
import SearchUsageMetrics from '../SearchUsageMetrics';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SearchUsageMetrics', () => {
    let searchUsageMetrics: SearchUsageMetrics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        searchUsageMetrics = new SearchUsageMetrics(api, serverlessApi);
    });

    it('registers the administration resource', () => {
        expect(searchUsageMetrics.licenseMetrics).toBeDefined();
        expect(searchUsageMetrics.licenseMetrics).toBeInstanceOf(LicenseMetrics);
    });
});
