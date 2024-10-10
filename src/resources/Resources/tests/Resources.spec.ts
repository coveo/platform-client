import API from '../../../APICore.js';
import Resources from '../Resources.js';

jest.mock('../../../APICore.js');

describe('Resources', () => {
    let resource: Resources;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    const randomResourceType = 'SOURCE';

    beforeEach(() => {
        resource = new Resources(api, serverlessApi);

        jest.resetAllMocks();
    });

    describe('list', () => {
        it('should make a GET call to the correct Project url with the right resource type', async () => {
            await resource.list(randomResourceType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Resources.baseUrl}/SOURCE`);
        });

        it('should use the passed parameters as its query parameters', async () => {
            await resource.list(randomResourceType, {page: 1, perPage: 50});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Resources.baseUrl}/SOURCE?page=1&perPage=50`);
        });
    });
});
