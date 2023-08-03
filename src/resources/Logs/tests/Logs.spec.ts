import API from '../../../APICore.js';
import Logs from '../Logs.js';
import {GetFacetsParams, GetLogsOrFacetsRequestBodyModel, GetLogsParams} from '../LogsInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Logs', () => {
    let logs: Logs;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        logs = new Logs(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a POST call to the logs base url', () => {
            const params = {} as GetLogsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            logs.get(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith('/logs/v1/organizations/{organizationName}', {});
        });
    });

    describe('getFacets', () => {
        it('should make a POST call to the specific logs url', () => {
            const params = {} as GetFacetsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            logs.getFacets(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith('/logs/v1/organizations/{organizationName}/facets', {});
        });
    });

    describe('getFacetsStats', () => {
        it('should make a POST call to the specific logs url', () => {
            const params = {} as GetFacetsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            logs.getFacetsStats(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith(
                '/logs/v1/organizations/{organizationName}/facetsStats',
                {},
            );
        });
    });
});
