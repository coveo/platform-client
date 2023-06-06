import dayjs from 'dayjs';
import API from '../../APICore.js';
import Resource from '../Resource.js';
import {ReplayAnalysis} from './SearchAnalysisInterface.js';

export default class SearchAnalysis extends Resource {
    static baseUrl = '/rest/search/v3/analysis';

    replay(id: string, from = dayjs().subtract(1, 'week').format('YYYY-MM-DD')) {
        return this.api.post<ReplayAnalysis>(
            `${SearchAnalysis.baseUrl}/inspect/replay?organizationId=${API.orgPlaceholder}`,
            {id, dateRange: {from}}
        );
    }
}
