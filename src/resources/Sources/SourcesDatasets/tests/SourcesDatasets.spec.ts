import {DatasetType} from '../../..';
import API from '../../../../APICore';
import SourcesDatasets from '../SourcesDatasets';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SourcesDatasets', () => {
    let dataset: SourcesDatasets;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        dataset = new SourcesDatasets(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the specific Dataset url', () => {
            dataset.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/datasets');
        });
    });

    describe('import', () => {
        it('makes a PUT call to the specific SourcesDatasets endpoint', () => {
            dataset.import(DatasetType.web);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/sources/datasets/import?datasetName=WEB&withContent=true',
                {}
            );
        });
    });

    describe('progress', () => {
        it('makes a GET call to the specific SourcesDatasets endpoint', () => {
            dataset.progress('randomId');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/sources/datasets/import/progress?requestId=randomId',
                {}
            );
        });
    });
});
