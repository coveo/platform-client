import API from '../../APICore.js';
import Resource from '../Resource.js';
import CatalogContent from './TailgateCatalogContent/CatalogContent.js';

export default class Tailgate extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/tailgate`;

    metadata: CatalogContent;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.metadata = new CatalogContent(api, serverlessApi);
    }

    getWorkerCount() {
        return this.api.get(`${Tailgate.baseUrl}/workers/count`);
    }
}
