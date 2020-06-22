import API from '../../APICore';
import Resource from '../Resource';
import Dimensions from './Read/Dimensions/Dimensions';
import Statistics from './Read/Statistics/Statistics';

export default class UsageAnalytics extends Resource {
    statistics: Statistics;
    dimensions: Dimensions;

    constructor(protected api: API) {
        super(api);

        this.dimensions = new Dimensions(api);
        this.statistics = new Statistics(api);
    }
}
