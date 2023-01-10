import API from '../../APICore.js';
import Resource from '../Resource.js';
import ContentQuery from './ContentQuery/ContentQuery.js';

export default class TableauService extends Resource {
    contentQuery: ContentQuery;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.contentQuery = new ContentQuery(api, serverlessApi);
    }
}
