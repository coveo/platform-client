import {LicenseSection} from '../..';
import API from '../../../APICore';
import License from '../License';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('License', () => {
    let license: License;
    const sectionName = LicenseSection.searchapi;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        license = new License(api);
    });

    describe('get', () => {
        it('should make a GET call to the specific License url', () => {
            license.get(sectionName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/license/searchapi`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific License url', () => {
            license.update(sectionName, {value: 100});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/license/searchapi`, {
                value: 100,
            });
        });
    });
});
