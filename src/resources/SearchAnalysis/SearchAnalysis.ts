import API from '../../APICore.js';
import Resource from '../Resource.js';
import {ReplayAnalysis} from './SearchAnalysisInterface.js';

export default class SearchAnalysis extends Resource {
    static baseUrl = '/rest/search/v3/analysis';

    /**
     * Replay a query that was already done and get inspection details.
     *
     * @param id The SearchUID of the request to replay.
     * @param from The inclusive date at which to start looking for the request. Example: 2019-08-24T14:15:22Z
     * @param to The inclusive date at which to stop looking for the SearchUID. When omitted searches up until the most recent requests. Example:2019-08-24T14:15:22Z
     * @returns
     */
    replay(id: string, from: string, to?: string) {
        return this.api.post<ReplayAnalysis>(
            `${SearchAnalysis.baseUrl}/inspect/replay?organizationId=${API.orgPlaceholder}`,
            {id, dateRange: {from, to}}
        );
    }
}
