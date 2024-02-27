import API from '../../../../APICore.js';
import CatalogContent from '../CatalogContent.js';
import queryString from '#query-string';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('CatalogContent', () => {
    let metadata: CatalogContent;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source/`;

    beforeEach(() => {
        jest.clearAllMocks();
        metadata = new CatalogContent(api, serverlessApi);
    });

    describe('getObjectTypes', () => {
        it('should make a GET call to the specific CatalogContent url', () => {
            const sourceId = 'McDonald';

            metadata.getObjectTypes(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${baseUrl}/${sourceId}/objecttypes`);
        });
    });

    describe('getMetadata', () => {
        it('should make a GET call to the specific CatalogContent url', () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'KFC';
            const objectType: any = 'Provigo';

            metadata.getMetadata(sourceId, objectType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadata?${queryString.stringify(objectType, {...defaultOptions})}`,
            );
        });
    });
});
