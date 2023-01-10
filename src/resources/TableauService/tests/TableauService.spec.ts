import API from '../../../APICore.js';
import ContentQuery from '../ContentQuery/ContentQuery.js';
import TableauService from '../TableauService.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('UsageAnalytics', () => {
    let tableauService: TableauService;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        tableauService = new TableauService(api, serverlessApi);
    });

    it('registers the administration resource', () => {
        expect(tableauService.contentQuery).toBeDefined();
        expect(tableauService.contentQuery).toBeInstanceOf(ContentQuery);
    });
});
