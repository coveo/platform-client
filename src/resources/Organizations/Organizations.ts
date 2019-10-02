import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {CreateOrganizationOptions, ListOrganizationOptions, OrganizationModel} from './OrganizationsInterfaces';

export default class Organizations extends Resource {
    static baseUrl = '/rest/organizations/';

    list(options?: ListOrganizationOptions) {
        return this.api.get<OrganizationModel[]>(this.buildPath(Organizations.baseUrl, options));
    }

    create(options: CreateOrganizationOptions) {
        return this.api.post<OrganizationModel>(this.buildPath(Organizations.baseUrl, options), {});
    }

    delete(organizationId: string) {
        return this.api.delete(`${Organizations.baseUrl}/${organizationId}`);
    }

    get(organizationId: string) {
        return this.api.get<OrganizationModel>(`${Organizations.baseUrl}/${organizationId}`);
    }

    update(organization: Partial<OrganizationModel>) {
        return this.api.put<OrganizationModel>(`${Organizations.baseUrl}/${organization.id}`, organization);
    }
}
