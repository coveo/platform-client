import API from '../../../APICore.js';
import Logs from '../Logs.js';
import {GetFacetsParams, GetLogsOrFacetsRequestBodyModel, GetLogsParams} from '../LogsInterfaces.js';

jest.mock('../../../APICore.js');

describe('Logs', () => {
    let logs: Logs;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        logs = new Logs(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a POST call to the logs base url', async () => {
            const params = {} as GetLogsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            await logs.get(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith('/logs/v1/organizations/{organizationName}', {});
        });
    });

    describe('getFacets', () => {
        it('should make a POST call to the specific logs url', async () => {
            const params = {} as GetFacetsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            await logs.getFacets(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith('/logs/v1/organizations/{organizationName}/facets', {});
        });
    });

    describe('getFacetsStats', () => {
        it('should make a POST call to the specific logs url', async () => {
            const params = {} as GetFacetsParams;
            const options = {} as GetLogsOrFacetsRequestBodyModel;

            await logs.getFacetsStats(params, options);
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith(
                '/logs/v1/organizations/{organizationName}/facetsStats',
                {},
            );
        });
    });
});
