import API from '../../../../APICore';
import LicenseMetrics from '../LicenseMetrics';
import {ListLicenseMonthlyParams} from '../LicenseMetricsInterface';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

// eslint-disable-next-line jest/no-focused-tests
describe.only('LicenseMetrics', () => {
    let LicenseMetricsService: LicenseMetrics;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        LicenseMetricsService = new LicenseMetrics(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the in-use metrics for an organization', () => {
            LicenseMetricsService.listInUse();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${LicenseMetrics.baseUrl}/inUse`);
        });

        it('should make a GET call to per-day values for a specific license metric', () => {
            const metric: string = 'HEEEYYYOOOOO';
            const listMonthlyParams: ListLicenseMonthlyParams = {
                to: 'Coulili',
                from: 'Zazou',
            };
            LicenseMetricsService.listMonthly(metric, listMonthlyParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${LicenseMetrics.baseUrl}/monthly/HEEEYYYOOOOO?to=Coulili&from=Zazou`
            );
        });
    });
});
