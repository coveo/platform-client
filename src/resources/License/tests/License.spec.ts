import {SectionTypes} from '../..';
import API from '../../../APICore';
import License from '../License';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('License', () => {
    let license: License;
    let orgId: string;
    let sectionName: SectionTypes;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        license = new License(api);
        orgId = 'License-to-be-fetched';
        sectionName = SectionTypes.searchapi;
    });

    describe('get', () => {
        it('should make a GET call to the specific License url', () => {
            license.get(orgId, sectionName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${License.baseUrl}/${orgId}/license/${sectionName}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific License url', () => {
            license.update(orgId, sectionName, {value: 100});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${License.baseUrl}/${orgId}/license/${sectionName}`, {value: 100});
        });
    });
});
