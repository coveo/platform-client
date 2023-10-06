import API from '../../../APICore.js';
import Resources from '../Resources.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Resources', () => {
    let resource: Resources;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const randomResourceType = 'SOURCE';

    beforeEach(() => {
        resource = new Resources(api, serverlessApi);

        jest.resetAllMocks();
    });

    describe('list', () => {
        it('should make a GET call to the correct Project url with the right resource type', () => {
            resource.list(randomResourceType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Resources.baseUrl}/SOURCE`);
        });

        it('should use the passed parameters as its query paramaters', () => {
            resource.list(randomResourceType, {page: 1, perPage: 50});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Resources.baseUrl}/SOURCE?page=1&perPage=50`);
        });
    });
});
