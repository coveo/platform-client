import {LicenseSection} from '../Enums';
import Resource from '../Resource';
import {LicenseModel} from './LicenseInterfaces';
import API from '../../APICore';

export default class License extends Resource {
    static getBaseUrl = (sectionName?: LicenseSection) =>
        `/rest/organizations/${API.orgPlaceholder}/license${sectionName ? `/${sectionName}` : ''}`;

    get(sectionName: LicenseSection) {
        return this.api.get<LicenseModel>(License.getBaseUrl(sectionName));
    }

    update(sectionName: LicenseSection, licenseSection: Record<string, number>) {
        return this.api.put<LicenseModel>(License.getBaseUrl(sectionName), licenseSection);
    }

    updateLicense(license: LicenseModel) {
        return this.api.put<LicenseModel>(License.getBaseUrl(), license);
    }
}
