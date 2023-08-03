import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {ListLicenseMonthlyParams, RestListOfMetricsModel, RestListOfMetricValues} from './LicenseMetricsInterface.js';

export default class LicenseMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/license`;

    listAssignable() {
        return this.api.get<RestListOfMetricsModel>(`${LicenseMetrics.baseUrl}/assignable`);
    }

    listInUse() {
        return this.api.get<RestListOfMetricsModel>(`${LicenseMetrics.baseUrl}/inUse`);
    }

    listMonthly(metric: string, params: ListLicenseMonthlyParams) {
        return this.api.get<RestListOfMetricValues>(
            this.buildPath(`${LicenseMetrics.baseUrl}/monthly/${metric}`, {...params}),
        );
    }
}
