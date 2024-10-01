import API from '../../../APICore.js';
import CatalogContent, {ObjectType} from '../CatalogContent.js';
import {CatalogMetadataNameParams} from '../CatalogInterfaces.js';
import queryString from '#query-string';

jest.mock('../../../APICore.js');

describe('CatalogContent', () => {
    let metadata: CatalogContent;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    const baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source`;

    beforeEach(() => {
        jest.clearAllMocks();
        metadata = new CatalogContent(api, serverlessApi);
    });

    describe('getObjectTypes', () => {
        it('should make a GET call to the specific CatalogContent url', async () => {
            const sourceId = 'McDonald';

            await metadata.getObjectTypes(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${baseUrl}/${sourceId}/objecttypes`);
        });
    });

    describe('getMetadataValues', () => {
        it('should make a GET call to the specific CatalogContent url', async () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'McDonald';
            const objectType: ObjectType = {objectType: 'Provigo'};

            await metadata.getMetadataValues(sourceId, objectType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadatavalues?${queryString.stringify(objectType, {...defaultOptions})}`,
            );
        });
    });

    describe('getMetadata', () => {
        it('should make a GET call to the specific CatalogContent url', async () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'KFC';
            const objectType: ObjectType = {objectType: 'Provigo'};

            await metadata.getMetadata(sourceId, objectType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadata?${queryString.stringify(objectType, {...defaultOptions})}`,
            );
        });
    });

    describe('getMetadataV2', () => {
        it('should make a GET call to the specific metadataName url', async () => {
            const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};
            const sourceId = 'KFC';

            const params: CatalogMetadataNameParams = {
                objectType: 'provigo',
                filter: 'a',
                version: 2,
                page: 0,
                perPage: 100,
            };

            await metadata.getMetadataV2(sourceId, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${baseUrl}/${sourceId}/metadata?${queryString.stringify(params, {...defaultOptions})}`,
            );
        });
    });
});
