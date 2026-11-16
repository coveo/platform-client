import API from '../../../../APICore.js';
import SourcesExtensions from '../SourcesExtensions.js';
import {SourceExtensionsMap} from '../SourcesExtensionsInterfaces.js';

jest.mock('../../../../APICore.js');

describe('SourcesExtensions', () => {
    let sourcesExtensions: SourcesExtensions;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const sourceId = 'some-source-id';

    beforeEach(() => {
        jest.clearAllMocks();
        sourcesExtensions = new SourcesExtensions(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific source extensions url', async () => {
            await sourcesExtensions.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SourcesExtensions.baseUrl}/${sourceId}/extensions`);
        });
    });

    describe('update', () => {
        const extensions: SourceExtensionsMap = {
            common: {preConversionExtensions: [{extensionId: 'ext-1'}], postConversionExtensions: []},
            items: {Video: {postConversionExtensions: [{extensionId: 'ext-2'}]}},
        };

        it('should make a PUT call to the specific source extensions url', async () => {
            await sourcesExtensions.update(sourceId, extensions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SourcesExtensions.baseUrl}/${sourceId}/extensions`, extensions);
        });

        it('should pass the rebuild option as a query parameter', async () => {
            await sourcesExtensions.update(sourceId, extensions, {rebuild: true});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SourcesExtensions.baseUrl}/${sourceId}/extensions?rebuild=true`,
                extensions,
            );
        });
    });
});
