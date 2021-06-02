import API from '../../../APICore';
import Administration from '../Read/Administration/Administration';
import Dimensions from '../Read/Dimensions/Dimensions';
import Exports from '../Read/Exports/Exports';
import Filters from '../Read/Filters/Filters';
import Reports from '../Read/Reports/Reports';
import Snowflake from '../Read/Snowflake/Snowflake';
import Statistics from '../Read/Statistics/Statistics';
import UsageAnalytics from '../UsageAnalytics';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('UsageAnalytics', () => {
    let ua: UsageAnalytics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

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
});
