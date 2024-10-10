import API from '../../../APICore.js';
import Invites from '../Invites.js';
jest.mock('../../../APICore.js');

describe('Invites', () => {
    let invites: Invites;

    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        invites = new Invites(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', async () => {
            await invites.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Invites.baseUrl);
        });
    });
});
