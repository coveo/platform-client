import API from '../../APICore.js';
import Resource from '../Resource.js';
import {IAccesses, ListHostedInterfacesParams, PageModel} from '../index.js';
import {NewSearchPageInterfaceConfiguration, SearchPageInterfaceConfiguration} from './NextGenSearchPages.model.js';

export default class NextGenSearchPages extends Resource {
    static getBaseUrl = `/rest/organizations/${API.orgPlaceholder}/searchpage/v1/interfaces`;

    list(options?: ListHostedInterfacesParams): Promise<PageModel<SearchPageInterfaceConfiguration>> {
        return this.api.get<PageModel<SearchPageInterfaceConfiguration>>(
            this.buildPath(NextGenSearchPages.getBaseUrl, options),
        );
    }

    create(searchPageConfiguration: NewSearchPageInterfaceConfiguration): Promise<SearchPageInterfaceConfiguration> {
        return this.api.post<SearchPageInterfaceConfiguration>(NextGenSearchPages.getBaseUrl, searchPageConfiguration);
    }

    delete(searchPageId: string): Promise<void> {
        return this.api.delete(`${NextGenSearchPages.baseUrl}/${searchPageId}`);
    }

    get(searchPageId: string): Promise<SearchPageInterfaceConfiguration> {
        return this.api.get<SearchPageInterfaceConfiguration>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}`);
    }

    update(
        searchPageId: string,
        searchPageConfiguration: NewSearchPageInterfaceConfiguration,
    ): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.getBaseUrl}/${searchPageId}`,
            searchPageConfiguration,
        );
    }

    generatePreview(searchPageConfiguration: NewSearchPageInterfaceConfiguration & {id: string}): Promise<string> {
        return this.api.post<string>(
            `${NextGenSearchPages.getBaseUrl}/${searchPageConfiguration.id}/preview`,
            searchPageConfiguration,
        );
    }

    getView(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/preview`);
    }

    getToken(searchPageId: string): Promise<{token: string}> {
        return this.api.get<{token: string}>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/token`);
    }

    getEditInterface(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/edit`);
    }

    getLoader(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/loader`);
    }

    getLoginPage(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/login`);
    }

    getAccesses(searchPageId: string): Promise<IAccesses> {
        return this.api.get<IAccesses>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses`);
    }

    updateAccesses(searchPageId: string, accesses: IAccesses): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses`,
            accesses,
        );
    }

    getAccessesUsers(searchPageId: string): Promise<string[]> {
        return this.api.get<string[]>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses/users`);
    }

    updateAccessesUsers(searchPageId: string, users: string[]): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses/users`,
            users,
        );
    }

    addAccessesUsers(
        searchPageId: string,
        users: string[],
        notify?: boolean,
        message?: string,
    ): Promise<SearchPageInterfaceConfiguration> {
        const body = message ? {users, message} : {users};
        return this.api.post<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses/users${notify ? '?notify=1' : ''}`,
            body,
        );
    }

    requestAccess(searchPageId: string): Promise<void> {
        return this.api.post<void>(`${NextGenSearchPages.getBaseUrl}/${searchPageId}/accesses/request`);
    }
}
