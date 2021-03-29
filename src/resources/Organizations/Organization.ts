import API from '../../APICore';
import {PageModel, PrivilegeModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    CreateOrganizationOptions,
    GetOrganizationOptions,
    ListOrganizationOptions,
    OrganizationModel,
    OrganizationsStatusModel,
} from './OrganizationInterfaces';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoPagination = undefined | null;

export default class Organization extends Resource {
    static baseUrl = '/rest/organizations';

    list(noPagination?: NoPagination): Promise<OrganizationModel[]>;
    list<T extends ListOrganizationOptions>(
        options: T
    ): keyof T extends never ? Promise<OrganizationModel[]> : Promise<PageModel<OrganizationModel>>;
    list(options?: NoPagination | ListOrganizationOptions) {
        return this.api.get<unknown>(options ? this.buildPath(Organization.baseUrl, options) : Organization.baseUrl);
    }

    create(options: CreateOrganizationOptions) {
        return this.api.post<OrganizationModel>(this.buildPath(Organization.baseUrl, options));
    }

    delete(organizationId: string) {
        return this.api.delete(`${Organization.baseUrl}/${organizationId}`);
    }

    get(organizationId: string, options?: GetOrganizationOptions) {
        return this.api.get<OrganizationModel>(this.buildPath(`${Organization.baseUrl}/${organizationId}`, options));
    }

    update(organization: Partial<OrganizationModel>) {
        return this.api.put<OrganizationModel>(`${Organization.baseUrl}/${organization.id}`, organization);
    }

    status(organizationId: string = API.orgPlaceholder) {
        return this.api.get<OrganizationsStatusModel>(`${Organization.baseUrl}/${organizationId}/status`);
    }

    listPrivileges() {
        return this.api.get<PrivilegeModel[]>(`${Organization.baseUrl}/${API.orgPlaceholder}/privileges`);
    }

    listMyPrivileges() {
        return this.api.get<PrivilegeModel[]>(`${Organization.baseUrl}/${API.orgPlaceholder}/privileges/me`);
    }

    listApiKeysPrivileges() {
        return this.api.get<PrivilegeModel[]>(`${Organization.baseUrl}/${API.orgPlaceholder}/privileges/apikeys`);
    }
}
