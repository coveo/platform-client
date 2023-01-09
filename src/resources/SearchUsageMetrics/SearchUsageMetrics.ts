import API from '../../APICore.js';
import Resource from '../Resource.js';
import LicenseMetrics from './LicenseMetrics/LicenseMetrics.js';
import RawMetrics from './RawMetrics/RawMetrics.js';
import SearchHubs from './SearchHubs/SearchHubs.js';

export default class SearchUsageMetrics extends Resource {
    licenseMetrics: LicenseMetrics;
    searchHubs: SearchHubs;
    rawMetrics: RawMetrics;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.licenseMetrics = new LicenseMetrics(api, serverlessApi);
        this.searchHubs = new SearchHubs(api, serverlessApi);
        this.rawMetrics = new RawMetrics(api, serverlessApi);
    }
}
