import API from '../../APICore';
import Resource from '../Resource';
import Statistics from './Read/Statistics/Statistics';

export default class UsageAnalytics extends Resource {
    statistics: Statistics;

    constructor(protected api: API) {
        super(api);

        this.statistics = new Statistics(api);
    }
}
