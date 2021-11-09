import API from '../../APICore';
import Resource from '../Resource';
import LicenseMetrics from './LicenseMetrics/LicenseMetrics';
import SearchHubs from './SearchHubs/SearchHubs';

export default class SearchUsageMetrics extends Resource {
    licenseMetrics: LicenseMetrics;
    searchHubs: SearchHubs;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.licenseMetrics = new LicenseMetrics(api, serverlessApi);
        this.searchHubs = new SearchHubs(api, serverlessApi);
    }
}
