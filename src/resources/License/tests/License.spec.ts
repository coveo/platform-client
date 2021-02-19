import {LicenseSection} from '../..';
import API from '../../../APICore';
import License from '../License';
import {LicenseModel} from '../LicenseInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('License', () => {
    let license: License;
    const sectionName = LicenseSection.searchapi;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        license = new License(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific License url', () => {
            license.get(sectionName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license/searchapi');
        });

        it('should make a get call to the generic License URL if no section is specified', () => {
            license.get();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license');
        });
    });

    describe('full', () => {
        it('should make a GET call to the full License url', () => {
            license.full();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/license`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific License url', () => {
            license.update(sectionName, {value: 100});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license/searchapi', {
                value: 100,
            });
        });
    });

    describe('updateAll', () => {
        it('should make a PUT call to the specific License url', () => {
            license.updateLicense(({value: 100} as unknown) as LicenseModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license', {
                value: 100,
            });
        });
    });
});
