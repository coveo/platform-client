import API from '../../../APICore';
import Resource from '../../Resource';
import {
    DailyMetricParameters,
    MonthlyMetricParameters,
    MonthlyMetricsParameters,
    RestListOfMetrics,
    RestListOfMetricValues,
    RestListOfSearchHubMetrics,
} from './RawMetricsInterface';

export default class RawMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/raw/`;

    list() {
        return this.api.get<RestListOfMetrics>(`${RawMetrics.baseUrl}all`);
    }

    listMonthly({month, minimumQueries}: MonthlyMetricsParameters) {
        return this.api.get<RestListOfSearchHubMetrics>(
            this.buildPath(`${RawMetrics.baseUrl}monthly`, {month, minimumQueries})
        );
    }

    getDaily({to, from, metric, searchHub}: DailyMetricParameters) {
        return this.api.get<RestListOfMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/daily/${metric}`, {to, from})
        );
    }

    getMonthly({to, from, metric, searchHub}: MonthlyMetricParameters) {
        return this.api.get<RestListOfMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/monthly/${metric}`, {to, from})
        );
    }
}
