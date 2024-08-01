import API from '../../APICore.js';
import {PageModel, PrivilegeModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import Members from './Members/Members.js';
import {
    CreateOrganizationOptions,
    DefinitionModel,
    GetOrganizationOptions,
    ListOrganizationOptions,
    OrganizationModel,
    OrganizationsStatusModel,
} from './OrganizationInterfaces.js';
import {AuthProvider} from '../Enums.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NoPagination = undefined | null;

export default class Organization extends Resource {
    static baseUrl = '/rest/organizations';
    members: Members;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.members = new Members(api, serverlessApi);
    }

    list(noPagination?: NoPagination): Promise<OrganizationModel[]>;
    list<T extends ListOrganizationOptions>(
        options: T,
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

    updateSupportActivated(organizationId: string, supportActivated: boolean) {
        return this.api.put(`${Organization.baseUrl}/${organizationId}/support?activate=${supportActivated}`);
    }

    status(organizationId: string = API.orgPlaceholder) {
        return this.api.get<OrganizationsStatusModel>(`${Organization.baseUrl}/${organizationId}/status`);
    }

    /**
     * Pauses an [organization](https://docs.coveo.com/en/222/).
     * Required privilege: Organization - Edit
     */
    pause(organizationId: string = API.orgPlaceholder) {
        return this.api.post(`${Organization.baseUrl}/${organizationId}/pause`);
    }

    /**
     * Resumes a paused [organization](https://docs.coveo.com/en/222/).
     * Required privilege: Organization - Edit
     */
    resume(organizationId: string = API.orgPlaceholder) {
        return this.api.post(`${Organization.baseUrl}/${organizationId}/resume`);
    }

    updateAdditionalInformation(additionalInformationObj: Record<string, unknown>) {
        return this.api.put<Record<string, unknown>>(
            `${Organization.baseUrl}/${API.orgPlaceholder}/additionalinformation`,
            additionalInformationObj,
        );
    }

    getAdditionalInformation(organizationId: string = API.orgPlaceholder) {
        return this.api.get<any>(`${Organization.baseUrl}/${organizationId}/additionalinformation`);
    }

    updateExperimentalStatus(allowed: boolean = true) {
        return this.api.put<boolean>(
            `${Organization.baseUrl}/${API.orgPlaceholder}/configuration/servingExperiment?allowed=${allowed}`,
        );
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

    getDefinition() {
        return this.api.get<DefinitionModel>(`${Organization.baseUrl}/${API.orgPlaceholder}/definition`);
    }

    updateDefinition(organizationDefinition: DefinitionModel) {
        return this.api.put<DefinitionModel>(
            `${Organization.baseUrl}/${API.orgPlaceholder}/definition`,
            organizationDefinition,
        );
    }

    getAllowedAuthenticationProviders(organizationId: string = API.orgPlaceholder) {
        return this.api.get<AuthProvider[]>(`${Organization.baseUrl}/${organizationId}/authproviders/allowed`);
    }
}
