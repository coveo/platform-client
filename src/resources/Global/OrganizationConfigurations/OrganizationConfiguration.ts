import {PageModel} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {OrganizationConfigurationModel} from './OrganizationConfigurationInterfaces';

export default class OrganizationConfiguration extends Resource {
    static baseUrl = '/rest/global/organizations';

    list() {
        return this.api.get<PageModel<OrganizationConfigurationModel>>(OrganizationConfiguration.baseUrl);
    }

    get(organizationId: string) {
        return this.api.get<OrganizationConfigurationModel>(`${OrganizationConfiguration.baseUrl}/${organizationId}`);
    }
}
