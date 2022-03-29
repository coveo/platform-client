import API from '../../../APICore';
import ContentQuery from '../ContentQuery/ContentQuery';
import TableauService from '../TableauService';

jest.mock('../../../APICore');

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
