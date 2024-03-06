import API from '../../APICore.js';
import Resource from '../Resource.js';

export default class Tailgate extends Resource {
    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);
    }

    getWorkerCount() {
        return this.api.get(`/rest/organizations/${API.orgPlaceholder}/tailgate/workers/count`);
    }
}
