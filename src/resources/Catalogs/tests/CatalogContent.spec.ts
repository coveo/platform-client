import API from '../../../APICore.js';
import CatalogContent, {ObjectType} from '../CatalogContent.js';
import queryString from '#query-string';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('CatalogContent', () => {
    let metadata: CatalogContent;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    const baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source`;

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

    describe('getMetadataValues', () => {
        it('should make a GET call to the specific CatalogContent url', () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'McDonald';
            const objectType: ObjectType = {objectType: 'Provigo'};

            metadata.getMetadataValues(sourceId, objectType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadatavalues?${queryString.stringify(objectType, {...defaultOptions})}`,
            );
        });
    });

    describe('getMetadata', () => {
        it('should make a GET call to the specific CatalogContent url', () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'KFC';
            const objectType: ObjectType = {objectType: 'Provigo'};

            metadata.getMetadata(sourceId, objectType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadata?${queryString.stringify(objectType, {...defaultOptions})}`,
            );
        });
    });

    describe('getMetadataV2', () => {
        it('should make a GET call to the specific metadataName url', () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'KFC';

            metadata.getMetadataV2(sourceId, {objectType: 'provigo', filter: 'a', version: 2, page: 0, perPage: 100});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadata?${queryString.stringify(
                    {objectType: 'provigo', filter: 'a', version: 2, page: 0, perPage: 100},
                    {...defaultOptions},
                )}`,
            );
        });
    });
});
