import API from '../../../APICore.js';
import Invites from '../Invites.js';
jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Invites', () => {
    let invites: Invites;

    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        invites = new Invites(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', () => {
            invites.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Invites.baseUrl);
        });
    });
});
