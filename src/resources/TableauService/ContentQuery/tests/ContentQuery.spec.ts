import API from '../../../../APICore';
import ContentQuery from '../ContentQuery';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ContentQuery', () => {
    let contentQuery: ContentQuery;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        contentQuery = new ContentQuery(api, serverlessApi);
    });

    describe('listTableauReports', () => {
        it('should make a GET call to the ContentQuery base url', () => {
            contentQuery.listTableauReports({organizationId: 'orgId', contentType: 'dashboards'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ContentQuery.baseUrl}/orgId/tableau/dashboards`);
        });
    });

    describe('getTableauDashboard', () => {
        it('should make a GET call to the ContentQuery base url', () => {
            contentQuery.getTableauDashboard({
                organizationId: 'orgId',
                contentType: 'dashboards',
                dashboardContentUrl: 'url.com',
            });

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ContentQuery.baseUrl}/orgId/tableau/dashboards/url.com`);
        });
    });

    describe('getTableauDashboardView', () => {
        it('should make a GET call to the ContentQuery base url', () => {
            contentQuery.getTableauDashboardView({
                organizationId: 'orgId',
                contentType: 'dashboards',
                dashboardContentUrl: 'url.com',
                viewContentUrl: 'view.com',
            });

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ContentQuery.baseUrl}/orgId/tableau/dashboards/url.com/view.com`);
        });
    });
});
