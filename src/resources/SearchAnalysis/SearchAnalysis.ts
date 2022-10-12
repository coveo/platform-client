import API from '../../APICore';
import Ressource from '../Resource';
import {ReplayAnalysis} from './SearchAnalysisInterfaces';

export default class SearchAnalysis extends Ressource {
    static baseUrl = `/rest/search/v3/analysis`;

    replay(id: string) {
        return this.api.post<ReplayAnalysis>(
            `${SearchAnalysis.baseUrl}/inspect/replay?organizationId=${API.orgPlaceholder}`,
            {id}
        );
    }
}
