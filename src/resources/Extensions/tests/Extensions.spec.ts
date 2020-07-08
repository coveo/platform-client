import API from '../../../APICore';
import Extension from '../Extensions';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Extension', () => {
    let extension: Extension;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        extension = new Extension(api);
    });

    describe('list', () => {
        it('should make a GET call to the specific Extension url', () => {
            extension.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Extension.baseUrl}`);
        });
    });
});
