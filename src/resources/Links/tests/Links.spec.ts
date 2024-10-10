import API from '../../../APICore.js';
import Links from '../Links.js';

jest.mock('../../../APICore.js');

describe('Links', () => {
    let links: Links;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        links = new Links(api, serverlessApi);
    });

    describe('delete all links', () => {
        it('should make a DELETE call to the specific links url', async () => {
            await links.deleteAll();

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Links.baseUrl}`);
        });
    });
});
