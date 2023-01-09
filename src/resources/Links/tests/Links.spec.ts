import API from '../../../APICore.js';
import Links from '../Links.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Links', () => {
    let links: Links;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        links = new Links(api, serverlessApi);
    });

    describe('delete all links', () => {
        it('should make a DELETE call to the specific links url', () => {
            links.deleteAll();

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Links.baseUrl}`);
        });
    });
});
