import API from '../../../APICore';
import AWS from '../AWS';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Cluster', () => {
    let aws: AWS;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        aws = new AWS(api);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', () => {
            aws.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(AWS.baseUrl);
        });
    });
});
