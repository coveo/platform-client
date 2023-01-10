import {PageModel} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {OrganizationConfigurationModel} from './OrganizationConfigurationInterfaces.js';

export default class OrganizationConfiguration extends Resource {
    static baseUrl = '/rest/global/organizations';

    list() {
        return this.api.get<PageModel<OrganizationConfigurationModel>>(OrganizationConfiguration.baseUrl);
    }

    get(organizationId: string) {
        return this.api.get<OrganizationConfigurationModel>(`${OrganizationConfiguration.baseUrl}/${organizationId}`);
    }
}
