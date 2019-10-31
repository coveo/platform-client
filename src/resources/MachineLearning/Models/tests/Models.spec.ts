import API from '../../../../APICore';
import Models from '../Models';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Models', () => {
    let models: Models;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        models = new Models(api);
    });

    describe('list', () => {
        it('should make a GET call to the Models base url', () => {
            models.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Models.baseUrl);
        });
    });

    describe('listDetails', () => {
        it('should make a GET call to the specific Models url', () => {
            models.listDetails();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/details`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Models url', () => {
            const modelId = 'O. O';

            models.get(modelId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}/details`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Models url', () => {
            const modelId = 'O .O';

            models.delete(modelId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Models.baseUrl}/${modelId}`);
        });
    });
});
