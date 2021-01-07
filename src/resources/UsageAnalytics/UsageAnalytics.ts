import API from '../../APICore';
import Resource from '../Resource';
import Dimensions from './Read/Dimensions/Dimensions';
import Statistics from './Read/Statistics/Statistics';

export default class UsageAnalytics extends Resource {
    statistics: Statistics;
    dimensions: Dimensions;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.dimensions = new Dimensions(api, serverlessApi);
        this.statistics = new Statistics(api, serverlessApi);
    }
}
