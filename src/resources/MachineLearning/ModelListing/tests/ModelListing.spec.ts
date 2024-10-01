import API from '../../../../APICore.js';
import ModelListing from '../ModelListing.js';

jest.mock('../../../../APICore.js');

describe('ModelListing', () => {
    let modelListing: ModelListing;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        modelListing = new ModelListing(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ModelListing base url', async () => {
            await modelListing.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModelListing.baseUrl);
        });

        it('should make a GET call to the ModelListing base url if empty array is passed', async () => {
            await modelListing.list([]);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModelListing.baseUrl);
        });

        it('should make a GET call to the ModelListing base url with provided list of engineIds', async () => {
            const engines = ['first', 'second'];
            const expectedUrl = `${ModelListing.baseUrl}?engineIds=${engines[0]}&engineIds=${engines[1]}`;
            await modelListing.list(engines);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUrl);
        });
    });
});
