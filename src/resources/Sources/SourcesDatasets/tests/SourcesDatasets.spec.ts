import API from '../../../../APICore.js';
import {DatasetType} from '../index.js';
import SourcesDatasets from '../SourcesDatasets.js';

jest.mock('../../../../APICore.js');

describe('SourcesDatasets', () => {
    let dataset: SourcesDatasets;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        dataset = new SourcesDatasets(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the specific Dataset url', async () => {
            await dataset.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/datasets');
        });
    });

    describe('import', () => {
        it('makes a PUT call to the specific SourcesDatasets endpoint', async () => {
            await dataset.import(DatasetType.web);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/sources/datasets/import?datasetName=WEB&withContent=true',
                {},
            );
        });
    });

    describe('progress', () => {
        it('makes a GET call to the specific SourcesDatasets endpoint', async () => {
            await dataset.progress('randomId');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/sources/datasets/import/progress?requestId=randomId',
                {},
            );
        });
    });
});
