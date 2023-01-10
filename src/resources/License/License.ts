import {LicenseSection} from '../Enums.js';
import Resource from '../Resource.js';
import {LicenseExpirationDateOptions, LicenseModel, LicenseSourceTypeModel} from './LicenseInterfaces.js';
import API from '../../APICore.js';

export default class License extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/license`;

    get(sectionName?: LicenseSection) {
        return this.api.get<LicenseModel>(sectionName ? `${License.baseUrl}/${sectionName}` : License.baseUrl);
    }

    full() {
        return this.api.get<LicenseModel>(License.baseUrl);
    }

    update(sectionName: LicenseSection, licenseSection: Record<string, number>) {
        return this.api.put<LicenseModel>(`${License.baseUrl}/${sectionName}`, licenseSection);
    }

    updateLicense(license: LicenseModel) {
        return this.api.put<LicenseModel>(License.baseUrl, license);
    }

    updateExpirationDate(options: LicenseExpirationDateOptions) {
        return this.api.put<LicenseModel>(this.buildPath(`${License.baseUrl}/expiration`, options));
    }

    getPossibleSourceTypes() {
        return this.api.get<LicenseSourceTypeModel[]>(`${License.baseUrl}/sourcetypes`);
    }
}
