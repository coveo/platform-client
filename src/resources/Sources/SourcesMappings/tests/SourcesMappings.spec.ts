import API from '../../../../APICore.js';
import SourcesMappings from '../SourcesMappings.js';
import {MappingsConfiguration} from '../SourcesMappingsInterfaces.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('SourcesMappings', () => {
    let mapping: SourcesMappings;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        mapping = new SourcesMappings(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific SourceMapping url', () => {
            const sourceId = '🍓';

            mapping.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/sources/${sourceId}/mappings`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SourceMapping url', () => {
            const sourceId = '🍰';
            const mappingsConfiguration: MappingsConfiguration = {
                common: {
                    rules: [],
                },
                types: [],
            };

            mapping.update(sourceId, mappingsConfiguration);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/${sourceId}/mappings?rebuild=false`,
                mappingsConfiguration
            );
        });

        it('should make a PUT call to the specific SourceMapping url and rebuild', () => {
            const sourceId = '🍰';
            const mappingsConfiguration: MappingsConfiguration = {
                common: {
                    rules: [],
                },
                types: [],
            };

            mapping.update(sourceId, mappingsConfiguration, true);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/${sourceId}/mappings?rebuild=true`,
                mappingsConfiguration
            );
        });
    });
});
