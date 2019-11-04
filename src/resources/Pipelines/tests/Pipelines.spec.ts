import API from '../../../APICore';
import Pipelines from '../Pipelines';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Pipelines', () => {
    let pipelines: Pipelines;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        pipelines = new Pipelines(api);
    });

    describe('getBackendVersion', () => {
        it('should make a GET call to the specific Pipelines url', () => {
            pipelines.getBackendVersion();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Pipelines.baseUrl}/ml/version`);
        });
    });
});
