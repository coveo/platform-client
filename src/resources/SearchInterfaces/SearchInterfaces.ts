import API from '../../APICore';
import {New, PageModel} from '../../Entry';
import Resource from '../Resource';
import {
    IAccesses,
    IListSearchInterfacesParameters,
    ISearchInterfaceConfiguration,
    ISearchInterfaceConfigurationResponse,
} from './SearchInterfaces.model';

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
}
