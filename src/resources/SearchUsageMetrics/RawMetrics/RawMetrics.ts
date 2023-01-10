import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {
    DailyRawMetricParameters,
    MonthlyRawMetricParameters,
    MonthlyRawMetricsParameters,
    RestListOfRawMetrics,
    RestListOfRawMetricValues,
    RestListOfSearchHubRawMetrics,
} from './RawMetricsInterface.js';

export default class RawMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchusagemetrics/raw/`;

    private addZeroIfRequired = (numberToValidate: number) =>
        numberToValidate < 10 ? `0${numberToValidate}` : numberToValidate;

    list() {
        return this.api.get<RestListOfRawMetrics>(`${RawMetrics.baseUrl}all`);
    }

    listMonthly({month, minimumQueries}: MonthlyRawMetricsParameters) {
        const formattedMonthDate = `${month.year}-${this.addZeroIfRequired(month.month)}`;

        return this.api.get<RestListOfSearchHubRawMetrics>(
            this.buildPath(`${RawMetrics.baseUrl}monthly`, {month: formattedMonthDate, minimumQueries})
        );
    }

    getDaily({to, from, metric, searchHub}: DailyRawMetricParameters) {
        const formattedFromDate = `${from.year}-${this.addZeroIfRequired(from.month)}-${this.addZeroIfRequired(
            from.day
        )}`;
        const formattedToDate = `${to.year}-${this.addZeroIfRequired(to.month)}-${this.addZeroIfRequired(to.day)}`;

        return this.api.get<RestListOfRawMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/daily/${metric}`, {
                to: formattedToDate,
                from: formattedFromDate,
            })
        );
    }

    getMonthly({to, from, metric, searchHub}: MonthlyRawMetricParameters) {
        const formattedFromDate = `${from.year}-${this.addZeroIfRequired(from.month)}`;
        const formattedToDate = `${to.year}-${this.addZeroIfRequired(to.month)}`;

        return this.api.get<RestListOfRawMetricValues>(
            this.buildPath(`${RawMetrics.baseUrl}searchhubs/${searchHub}/monthly/${metric}`, {
                to: formattedToDate,
                from: formattedFromDate,
            })
        );
    }
}
