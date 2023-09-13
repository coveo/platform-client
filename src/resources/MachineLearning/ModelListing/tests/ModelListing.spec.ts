import API from '../../../../APICore.js';
import ModelListing from '../ModelListing.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ModelListing', () => {
    let modelListing: ModelListing;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        modelListing = new ModelListing(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ModelListing base url', () => {
            modelListing.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModelListing.baseUrl);
        });

        it('should make a GET call to the ModelListing base url if empty array is passed', () => {
            modelListing.list([]);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModelListing.baseUrl);
        });

        it('should make a GET call to the ModelListing base url with provided list of engineIds', () => {
            const engines = ['first', 'second'];
            const expectedUrl = `${ModelListing.baseUrl}?engineId=${engines[0]}&engineId=${engines[1]}`;
            modelListing.list(engines);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(expectedUrl);
        });
    });
});
