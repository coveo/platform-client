import API from '../../APICore.js';
import Resource from '../Resource.js';
import {PageModel} from '../BaseInterfaces.js';
import {
    ExistingHostedInterface,
    IAccesses,
    IManifestParameters,
    IManifestResponse,
    ListHostedInterfacesParams,
    NewHostedInterface,
} from '../HostedInterfacesCore/index.js';
import {SearchPageInterfaceConfiguration} from './NextGenSearchPages.model.js';

export default class NextGenSearchPages extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/searchpage/v1/interfaces`;

    list(options?: ListHostedInterfacesParams): Promise<PageModel<SearchPageInterfaceConfiguration>> {
        return this.api.get<PageModel<SearchPageInterfaceConfiguration>>(
            this.buildPath(NextGenSearchPages.baseUrl, options),
        );
    }

    create(
        searchPageConfiguration: NewHostedInterface<SearchPageInterfaceConfiguration>,
    ): Promise<SearchPageInterfaceConfiguration> {
        return this.api.post<SearchPageInterfaceConfiguration>(NextGenSearchPages.baseUrl, searchPageConfiguration);
    }

    delete(searchPageId: string): Promise<void> {
        return this.api.delete(`${NextGenSearchPages.baseUrl}/${searchPageId}`);
    }

    get(searchPageId: string): Promise<SearchPageInterfaceConfiguration> {
        return this.api.get<SearchPageInterfaceConfiguration>(`${NextGenSearchPages.baseUrl}/${searchPageId}`);
    }

    update(
        searchPageId: string,
        searchPageConfiguration: NewHostedInterface<SearchPageInterfaceConfiguration>,
    ): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.baseUrl}/${searchPageId}`,
            searchPageConfiguration,
        );
    }

    generatePreview(
        searchPageId: string,
        searchPageConfiguration: ExistingHostedInterface<SearchPageInterfaceConfiguration>,
    ): Promise<string> {
        return this.api.post<string>(`${NextGenSearchPages.baseUrl}/${searchPageId}/preview`, searchPageConfiguration);
    }

    getView(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.baseUrl}/${searchPageId}/preview`);
    }

    getToken(searchPageId: string): Promise<{token: string}> {
        return this.api.get<{token: string}>(`${NextGenSearchPages.baseUrl}/${searchPageId}/token`);
    }

    getEditInterface(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.baseUrl}/${searchPageId}/edit`);
    }

    getLoader(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.baseUrl}/${searchPageId}/loader`);
    }

    getLoginPage(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPages.baseUrl}/${searchPageId}/login`);
    }

    getAccesses(searchPageId: string): Promise<IAccesses> {
        return this.api.get<IAccesses>(`${NextGenSearchPages.baseUrl}/${searchPageId}/accesses`);
    }

    updateAccesses(searchPageId: string, accesses: IAccesses): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.baseUrl}/${searchPageId}/accesses`,
            accesses,
        );
    }

    getAccessesUsers(searchPageId: string): Promise<string[]> {
        return this.api.get<string[]>(`${NextGenSearchPages.baseUrl}/${searchPageId}/accesses/users`);
    }

    updateAccessesUsers(searchPageId: string, users: string[]): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(
            `${NextGenSearchPages.baseUrl}/${searchPageId}/accesses/users`,
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
            `${NextGenSearchPages.baseUrl}/${searchPageId}/accesses/users${notify ? '?notify=1' : ''}`,
            body,
        );
    }

    requestAccess(searchPageId: string): Promise<void> {
        return this.api.post<void>(`${NextGenSearchPages.baseUrl}/${searchPageId}/accesses/request`);
    }

    manifest(
        interfaceId: string,
        options?: IManifestParameters,
    ): Promise<IManifestResponse<SearchPageInterfaceConfiguration>> {
        return this.api.post(`${NextGenSearchPages.baseUrl}/${interfaceId}/manifest`, options);
    }
}
