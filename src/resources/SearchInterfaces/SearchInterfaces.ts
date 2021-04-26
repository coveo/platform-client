import API from '../../APICore';
import {New, PageModel} from '../../Entry';
import Resource from '../Resource';
import {ISearchInterfaceConfiguration} from './SearchInterfaces.model';

export interface IListSearchInterfacesParameters {
    /**
     * A substring that must appear in a search interface configuration name for this configuration to appear in results.
     */
    filter?: string;

    /**
     * The sort direction of the results.<br />Possible values:<br /> - `asc`: ascending order<br /> - `desc`: descending order.
     */
    order?: 'desc' | 'asc';

    /**
     * The 0-based number of the page of configurations to list.
     */
    page?: number;

    /**
     * The maximum number of configurations to include per page.
     */
    perPage?: number;
}

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
}
