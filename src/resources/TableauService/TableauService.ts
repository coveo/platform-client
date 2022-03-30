import API from '../../APICore';
import Resource from '../Resource';
import ContentQuery from './ContentQuery/ContentQuery';

export default class TableauService extends Resource {
    contentQuery: ContentQuery;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.contentQuery = new ContentQuery(api, serverlessApi);
    }
}
