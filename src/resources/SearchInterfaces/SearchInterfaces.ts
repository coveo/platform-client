import API from '../../APICore.js';
import {New, PageModel} from '../../Entry.js';
import Resource from '../Resource.js';
import {
    IAccesses,
    IListSearchInterfacesParameters,
    ISearchInterfaceConfiguration,
    ISearchInterfaceConfigurationResponse,
    IManifestParameters,
    IManifestResponse,
} from './SearchInterfaces.model.js';

export default class SearchInterfaces extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchinterfaces`;

    list(options: IListSearchInterfacesParameters): Promise<PageModel<ISearchInterfaceConfigurationResponse>> {
        return this.api.get(this.buildPath(SearchInterfaces.baseUrl, options));
    }

    create(searchInterfaceConfig: New<ISearchInterfaceConfiguration>): Promise<ISearchInterfaceConfigurationResponse> {
        return this.api.post(SearchInterfaces.baseUrl, searchInterfaceConfig);
    }

    get(searchInterfaceConfigId: string): Promise<ISearchInterfaceConfigurationResponse> {
        return this.api.get(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}`);
    }

    update(searchInterfaceConfig: ISearchInterfaceConfiguration): Promise<ISearchInterfaceConfigurationResponse> {
        return this.api.put(`${SearchInterfaces.baseUrl}/${searchInterfaceConfig.id}`, searchInterfaceConfig);
    }

    delete(searchInterfaceConfigId: string) {
        return this.api.delete(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}`);
    }

    getAccesses(interfaceId: string): Promise<IAccesses> {
        return this.api.get(`${SearchInterfaces.baseUrl}/${interfaceId}/accesses`);
    }

    updateAccesses(searchInterfaceConfigId: string, accesses: IAccesses): Promise<IAccesses> {
        return this.api.put(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}/accesses`, accesses);
    }

    getAccessesUsers(interfaceId: string): Promise<string[]> {
        return this.api.get(`${SearchInterfaces.baseUrl}/${interfaceId}/accesses/users`);
    }

    updateAccessesUsers(interfaceId: string, users: string[]): Promise<string[]> {
        return this.api.put(`${SearchInterfaces.baseUrl}/${interfaceId}/accesses/users`, users);
    }

    addAccessesUsers(interfaceId: string, users: string[], notify?: boolean, message?: string): Promise<string[]> {
        const body = message ? {users, message} : {users};
        return this.api.post(
            `${SearchInterfaces.baseUrl}/${interfaceId}/accesses/users${notify ? '?notify=1' : ''}`,
            body,
        );
    }

    manifest(interfaceId: string, options?: IManifestParameters): Promise<IManifestResponse> {
        return this.api.post(`${SearchInterfaces.baseUrl}/${interfaceId}/manifest/v1`, options);
    }
}
