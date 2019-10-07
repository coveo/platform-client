import {PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {CreateOrganizationOptions, ListOrganizationOptions, OrganizationModel} from './OrganizationInterfaces';

export default class Organization extends Resource {
    static baseUrl = '/rest/organizations/';

    list(options?: ListOrganizationOptions) {
        return this.api.get<PageModel<OrganizationModel>>(this.buildPath(Organization.baseUrl, options));
    }

    create(options: CreateOrganizationOptions) {
        return this.api.post<OrganizationModel>(this.buildPath(Organization.baseUrl, options), {});
    }

    delete(organizationId: string) {
        return this.api.delete(`${Organization.baseUrl}/${organizationId}`);
    }

    get(organizationId: string) {
        return this.api.get<OrganizationModel>(`${Organization.baseUrl}/${organizationId}`);
    }

    update(organization: Partial<OrganizationModel>) {
        return this.api.put<OrganizationModel>(`${Organization.baseUrl}/${organization.id}`, organization);
    }
}
