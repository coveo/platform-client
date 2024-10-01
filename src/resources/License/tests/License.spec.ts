import API from '../../../APICore.js';
import {LicenseSection} from '../../index.js';
import License from '../License.js';
import {LicenseModel} from '../LicenseInterfaces.js';

jest.mock('../../../APICore.js');

describe('License', () => {
    let license: License;
    const sectionName = LicenseSection.searchapi;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        license = new License(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific License url', async () => {
            await license.get(sectionName);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license/searchapi');
        });

        it('should make a get call to the generic License URL if no section is specified', async () => {
            await license.get();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license');
        });
    });

    describe('full', () => {
        it('should make a GET call to the full License url', async () => {
            await license.full();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/license`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific License url', async () => {
            await license.update(sectionName, {value: 100});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license/searchapi', {
                value: 100,
            });
        });
    });

    describe('updateAll', () => {
        it('should make a PUT call to the specific License url', async () => {
            await license.updateLicense({value: 100} as unknown as LicenseModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license', {
                value: 100,
            });
        });
    });

    describe('updateExpirationDate', () => {
        it('should make a PUT call to the specific License url', async () => {
            const now = new Date();

            await license.updateExpirationDate({expirationDate: now.getTime()});
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/license/expiration?expirationDate=${now.getTime()}`,
            );
        });
    });

    describe('getPossibleSourceTypes', () => {
        it('should make a GET call to the specific License url', async () => {
            await license.getPossibleSourceTypes();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/license/sourcetypes');
        });
    });
});
