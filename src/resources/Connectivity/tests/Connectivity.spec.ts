import API from '../../../APICore.js';
import Connectivity from '../Connectivity.js';
import {LogRequestResourceType} from '../ConnectivityInterface.js';

jest.mock('../../../APICore.js');

describe('Connectivity Service', () => {
    let connectivity: Connectivity;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        connectivity = new Connectivity(api, serverlessApi);
    });

    describe('diagnostic', () => {
        const resourceId = 'SOURCE_ID';
        const activityId = 'ACTIVITY_ID';
        const logRequestId = 'LOGREQUEST_ID';

        it('should post a new new log request', async () => {
            await connectivity.requestLog({resourceId, activityId});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Connectivity.baseUrl}?resourceType=SOURCE`, {
                resourceId,
                activityId,
            });
        });

        it('should get the state of a log request', async () => {
            await connectivity.getLogRequestState(logRequestId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Connectivity.baseUrl}/${logRequestId}`);
        });

        it('should have the resource type if specified', async () => {
            await connectivity.requestLog({resourceId, activityId}, LogRequestResourceType.SECURITY_PROVIDER);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Connectivity.baseUrl}?resourceType=SECURITY_PROVIDER`, {
                resourceId,
                activityId,
            });
        });
    });
});
