import API from '../../../APICore';
import Resource from '../../Resource';
import {
    DailyRawMetricParameters,
    MonthlyRawMetricParameters,
    MonthlyRawMetricsParameters,
    RestListOfRawMetrics,
    RestListOfRawMetricValues,
    RestListOfSearchHubRawMetrics,
} from './RawMetricsInterface';

export default class RawMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/raw/`;

    list() {
        return this.api.get<RestListOfRawMetrics>(`${RawMetrics.baseUrl}all`);
    }

    listMonthly({month, minimumQueries}: MonthlyRawMetricsParameters) {
        return this.api.get<RestListOfSearchHubRawMetrics>(
            this.buildPath(`${RawMetrics.baseUrl}monthly`, {month, minimumQueries})
        );
    }

    getDaily({to, from, metric, searchHub}: DailyRawMetricParameters) {
        return this.api.get<RestListOfRawMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/daily/${metric}`, {to, from})
        );
    }

    getMonthly({to, from, metric, searchHub}: MonthlyRawMetricParameters) {
        return this.api.get<RestListOfRawMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/monthly/${metric}`, {to, from})
        );
    }
}
