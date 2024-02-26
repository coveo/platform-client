import API from '../../../APICore.js';
import Tailgate from '../Tailgate.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Tailgate', () => {
    let tailgate: Tailgate;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        tailgate = new Tailgate(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific Tailgate url', () => {
            tailgate.getWorkerCount();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/${API.orgPlaceholder}/tailgate/workers/count`);
        });
    });
});
