import API from '../../../APICore';
import Sources from '../Sources';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Sources', () => {
    let source: Sources;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        source = new Sources(api);
    });

    describe('getItemTypes', () => {
        it('should make a GET call to the specific Sources url', () => {
            const sourceId = '🦊';

            source.getItemTypes(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/${sourceId}/itemTypes`);
        });
    });
});
