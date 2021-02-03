import {LicenseSection} from '../Enums';
import Resource from '../Resource';
import {LicenseModel} from './LicenseInterfaces';
import API from '../../APICore';

export default class License extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/license`;

    get(sectionName?: LicenseSection) {
        return this.api.get<LicenseModel>(sectionName ? `${License.baseUrl}/${sectionName}` : License.baseUrl);
    }

    full() {
        return this.api.get<LicenseModel>(`${License.baseUrl}`);
    }

    update(sectionName: LicenseSection, licenseSection: Record<string, number>) {
        return this.api.put<LicenseModel>(`${License.baseUrl}/${sectionName}`, licenseSection);
    }

    updateLicense(license: LicenseModel) {
        return this.api.put<LicenseModel>(License.baseUrl, license);
    }
}
