import API from '../../../APICore.js';
import LicenseMetrics from '../LicenseMetrics/LicenseMetrics.js';
import RawMetrics from '../RawMetrics/RawMetrics.js';
import SearchHubs from '../SearchHubs/SearchHubs.js';
import SearchUsageMetrics from '../SearchUsageMetrics.js';

jest.mock('../../../APICore.js');

describe('SearchUsageMetrics', () => {
    let searchUsageMetrics: SearchUsageMetrics;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        searchUsageMetrics = new SearchUsageMetrics(api, serverlessApi);
    });

    it('registers the licenseMetrics resource', () => {
        expect(searchUsageMetrics.licenseMetrics).toBeDefined();
        expect(searchUsageMetrics.licenseMetrics).toBeInstanceOf(LicenseMetrics);
    });

    it('registers the searchHubs resource', () => {
        expect(searchUsageMetrics.searchHubs).toBeDefined();
        expect(searchUsageMetrics.searchHubs).toBeInstanceOf(SearchHubs);
    });

    it('registers the rawMetrics resource', () => {
        expect(searchUsageMetrics.rawMetrics).toBeDefined();
        expect(searchUsageMetrics.rawMetrics).toBeInstanceOf(RawMetrics);
    });
});
