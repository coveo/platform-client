import API from '../../../../APICore';
import SourcesMetadata from '../SourcesMetadata';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SourcesMetadata', () => {
    let metadata: SourcesMetadata;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        metadata = new SourcesMetadata(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific SourceMetadata url', () => {
            const sourceId = 'ben&flo';

            metadata.list(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/sources/${sourceId}/metadata`);
        });
    });
});
