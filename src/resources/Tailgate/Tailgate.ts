import API from '../../APICore.js';
import Resource from '../Resource.js';
import TailgateCatalogContent from './TailgateCatalogContent/TailgateCatalogContent.js';

export default class Tailgate extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/tailgate`;

    metadata: TailgateCatalogContent;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.metadata = new TailgateCatalogContent(api, serverlessApi);
    }

    getWorkerCount() {
        return this.api.get(`${Tailgate.baseUrl}/workers/count`);
    }
}
