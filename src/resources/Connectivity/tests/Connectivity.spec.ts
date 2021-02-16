import API from '../../../APICore';
import Connectivity from '../Connectivity';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Connectivity Service', () => {
    let connectivity: Connectivity;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        connectivity = new Connectivity(api, serverlessApi);
    });

    describe('diagnostic', () => {
        const resourceId = 'SOURCE_ID';
        const activityId = 'ACTIVITY_ID';
        const logRequestId = 'LOGREQUEST_ID';

        it('should post a new new log request', () => {
            connectivity.requestLog({resourceId, activityId});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Connectivity.baseUrl}`, {resourceId, activityId});
        });

        it('should get the state of a log request', () => {
            connectivity.getLogRequestState(logRequestId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Connectivity.baseUrl}/${logRequestId}`);
        });
    });
});
