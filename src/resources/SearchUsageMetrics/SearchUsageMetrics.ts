import API from '../../APICore';
import Resource from '../Resource';
import LicenseMetrics from './LicenseMetrics/LicenseMetrics';

export default class SearchUsageMetrics extends Resource {
    licenseMetrics: LicenseMetrics;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.licenseMetrics = new LicenseMetrics(api, serverlessApi);
    }
}
