import API from '../../APICore.js';
import Resource from '../Resource.js';
import Administration from './Read/Administration/Administration.js';
import DataShare from './Read/DataShare/DataShare.js';
import Dimensions from './Read/Dimensions/Dimensions.js';
import Exports from './Read/Exports/Exports.js';
import Filters from './Read/Filters/Filters.js';
import Reports from './Read/Reports/Reports.js';
import Snowflake from './Read/Snowflake/Snowflake.js';
import Statistics from './Read/Statistics/Statistics.js';

export default class UsageAnalytics extends Resource {
    administration: Administration;
    dataShare: DataShare;
    dimensions: Dimensions;
    exports: Exports;
    filters: Filters;
    reports: Reports;
    snowflake: Snowflake;
    statistics: Statistics;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.administration = new Administration(api, serverlessApi);
        this.dataShare = new DataShare(api, serverlessApi);
        this.dimensions = new Dimensions(api, serverlessApi);
        this.exports = new Exports(api, serverlessApi);
        this.filters = new Filters(api, serverlessApi);
        this.reports = new Reports(api, serverlessApi);
        this.snowflake = new Snowflake(api, serverlessApi);
        this.statistics = new Statistics(api, serverlessApi);
    }
}
