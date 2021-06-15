import API from '../../APICore';
import {New, PageModel} from '../../Entry';
import Resource from '../Resource';
import {IAccesses, IListSearchInterfacesParameters, ISearchInterfaceConfiguration} from './SearchInterfaces.model';

export default class SearchInterfaces extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchinterfaces`;

    list(options: IListSearchInterfacesParameters): Promise<PageModel<ISearchInterfaceConfiguration>> {
        return this.api.get(this.buildPath(SearchInterfaces.baseUrl, options));
    }

    create(searchInterfaceConfig: New<ISearchInterfaceConfiguration>): Promise<ISearchInterfaceConfiguration> {
        return this.api.post(SearchInterfaces.baseUrl, searchInterfaceConfig);
    }

    get(searchInterfaceConfigId: string): Promise<ISearchInterfaceConfiguration> {
        return this.api.get(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}`);
    }

    update(searchInterfaceConfig: ISearchInterfaceConfiguration): Promise<ISearchInterfaceConfiguration> {
        return this.api.put(`${SearchInterfaces.baseUrl}/${searchInterfaceConfig.id}`, searchInterfaceConfig);
    }

    delete(searchInterfaceConfigId: string) {
        return this.api.delete(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}`);
    }

    updateAccesses(searchInterfaceConfigId: string, accesses: IAccesses): Promise<IAccesses> {
        return this.api.put(`${SearchInterfaces.baseUrl}/${searchInterfaceConfigId}/accesses`, accesses);
    }
}
