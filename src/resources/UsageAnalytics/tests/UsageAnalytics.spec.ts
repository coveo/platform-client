import API from '../../../APICore.js';
import Administration from '../Read/Administration/Administration.js';
import Dimensions from '../Read/Dimensions/Dimensions.js';
import Exports from '../Read/Exports/Exports.js';
import Filters from '../Read/Filters/Filters.js';
import Reports from '../Read/Reports/Reports.js';
import Snowflake from '../Read/Snowflake/Snowflake.js';
import Statistics from '../Read/Statistics/Statistics.js';
import UAUsers from '../Read/UAUsers/UAUsers.js';
import UsageAnalytics from '../UsageAnalytics.js';

jest.mock('../../../APICore.js');

describe('UsageAnalytics', () => {
    let ua: UsageAnalytics;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        ua = new UsageAnalytics(api, serverlessApi);
    });

    it('registers the administration resource', () => {
        expect(ua.administration).toBeDefined();
        expect(ua.administration).toBeInstanceOf(Administration);
    });

    it('registers the dimensions resource', () => {
        expect(ua.dimensions).toBeDefined();
        expect(ua.dimensions).toBeInstanceOf(Dimensions);
    });

    it('registers the exports resource', () => {
        expect(ua.exports).toBeDefined();
        expect(ua.exports).toBeInstanceOf(Exports);
    });

    it('registers the statistics resource', () => {
        expect(ua.statistics).toBeDefined();
        expect(ua.statistics).toBeInstanceOf(Statistics);
    });

    it('registers the snowflake resource', () => {
        expect(ua.snowflake).toBeDefined();
        expect(ua.snowflake).toBeInstanceOf(Snowflake);
    });

    it('registers the reports resource', () => {
        expect(ua.reports).toBeDefined();
        expect(ua.reports).toBeInstanceOf(Reports);
    });

    it('registers the filters resource', () => {
        expect(ua.filters).toBeDefined();
        expect(ua.filters).toBeInstanceOf(Filters);
    });

    it('registers the users resource', () => {
        expect(ua.users).toBeDefined();
        expect(ua.users).toBeInstanceOf(UAUsers);
    });
});
