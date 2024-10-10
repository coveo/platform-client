import API from '../../../../APICore.js';
import SourcesMetadata from '../SourcesMetadata.js';

jest.mock('../../../../APICore.js');

describe('SourcesMetadata', () => {
    let metadata: SourcesMetadata;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        metadata = new SourcesMetadata(api, serverlessApi);
    });

    describe('getReport', () => {
        it('should make a GET call to the specific SourceMetadata url', async () => {
            const sourceId = 'ben&flo';

            await metadata.getReport(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/sources/${sourceId}/metadata`);
        });
    });

    describe('generateRepost', () => {
        it('should make a POST call to the specific SourceMetadata url', async () => {
            const sourceId = 'ben&flo';

            await metadata.generateReport(sourceId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/${sourceId}/metadata`,
            );
        });
    });

    describe('getReportStatus', () => {
        it('should make a GET call to the specific SourceMetadataStatus url', async () => {
            const sourceId = 'ben&flo';

            await metadata.getReportStatus(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/${sourceId}/metadata/status`,
            );
        });
    });
});
