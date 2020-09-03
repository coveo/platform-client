import {SectionTypes} from '../Enums';
import Resource from '../Resource';
import {LicenseModel} from './LicenseInterfaces';

export default class License extends Resource {
    static baseUrl = '/rest/organizations';

    get(organizationId: string, sectionName: SectionTypes) {
        return this.api.get<LicenseModel>(`${License.baseUrl}/${organizationId}/license/${sectionName}`);
    }

    update(organizationId: string, sectionName: SectionTypes, licenseSection: {[x: string]: number}) {
        return this.api.put<LicenseModel>(
            `${License.baseUrl}/${organizationId}/license/${sectionName}`,
            licenseSection
        );
    }
}
