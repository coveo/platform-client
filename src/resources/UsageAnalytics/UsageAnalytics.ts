import API from '../../APICore';
import Resource from '../Resource';
import Administration from './Read/Administration/Administration';
import DataShare from './Read/DataShare/DataShare';
import Dimensions from './Read/Dimensions/Dimensions';
import Exports from './Read/Exports/Exports';
import Filters from './Read/Filters/Filters';
import Reports from './Read/Reports/Reports';
import Snowflake from './Read/Snowflake/Snowflake';
import Statistics from './Read/Statistics/Statistics';

export default class UsageAnalytics extends Resource {
    statistics: Statistics;
    dimensions: Dimensions;
    exports: Exports;
    administration: Administration;
    snowflake: Snowflake;
    reports: Reports;
    filters: Filters;
    dataShare: DataShare;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.dimensions = new Dimensions(api, serverlessApi);
        this.exports = new Exports(api, serverlessApi);
        this.statistics = new Statistics(api, serverlessApi);
        this.administration = new Administration(api, serverlessApi);
        this.snowflake = new Snowflake(api, serverlessApi);
        this.reports = new Reports(api, serverlessApi);
        this.filters = new Filters(api, serverlessApi);
        this.dataShare = new DataShare(api, serverlessApi);
    }
}
