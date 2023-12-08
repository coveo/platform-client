import API from "../../APICore.js";
import Resource from "../Resource.js";
import { IAccesses, ListHostedInterfacesParams, New, PageModel } from "../index.js";
import { SearchPageInterfaceConfiguration } from "./NextGenSearchPages.model.js";

export class NextGenSearchPageResource extends Resource {
    static getBaseUrl = `/rest/organizations/${API.orgPlaceholder}/searchpage/v1/interfaces`;

    list(options?: ListHostedInterfacesParams): Promise<PageModel<SearchPageInterfaceConfiguration>> {
        return this.api.get<PageModel<SearchPageInterfaceConfiguration>>(this.buildPath(NextGenSearchPageResource.getBaseUrl, options));
    }
    
    create(searchPageConfiguration: New<SearchPageInterfaceConfiguration>): Promise<SearchPageInterfaceConfiguration> {
        return this.api.post<SearchPageInterfaceConfiguration>(NextGenSearchPageResource.getBaseUrl, searchPageConfiguration);
    }

    delete(searchPageId: string): Promise<void> {
        return this.api.delete(`${NextGenSearchPageResource.baseUrl}/${searchPageId}`);
    }    
    
    get(searchPageId: string): Promise<SearchPageInterfaceConfiguration> {
        return this.api.get<SearchPageInterfaceConfiguration>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}`);
    }

    update(searchPageConfiguration: SearchPageInterfaceConfiguration): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageConfiguration.id}`, searchPageConfiguration);
    }

    generatePreview(searchPageConfiguration: SearchPageInterfaceConfiguration): Promise<string> {
        return this.api.post<string>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageConfiguration.id}/preview`, searchPageConfiguration);
    }

    getView(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/preview`);
    }

    getToken(searchPageId: string): Promise<{token: string}> {
        return this.api.get<{token: string}>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/token`);
    }

    getEditInterface(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/edit`);
    }

    getLoader(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/loader`);
    }

    getLoginPage(searchPageId: string): Promise<string> {
        return this.api.get<string>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/login`);
    }

    getAccesses(searchPageId: string): Promise<IAccesses> {
        return this.api.get<IAccesses>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses`);
    }

    updateAccesses(searchPageId: string, accesses: IAccesses): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses`, accesses);
    }

    getAccessesUsers(searchPageId: string): Promise<string[]> {
        return this.api.get<string[]>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses/users`);
    }

    updateAccessesUsers(searchPageId: string, users: string[]): Promise<SearchPageInterfaceConfiguration> {
        return this.api.put<SearchPageInterfaceConfiguration>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses/users`, users);
    }

    addAccessesUsers(searchPageId: string, users: string[], notify?: boolean, message?: string): Promise<SearchPageInterfaceConfiguration> {
        const body = message ? {users, message} : {users};
        return this.api.post<SearchPageInterfaceConfiguration>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses/users${notify ? '?notify=1' : ''}`, body);
    }

    requestAccess(searchPageId: string): Promise<void> {
        return this.api.post<void>(`${NextGenSearchPageResource.getBaseUrl}/${searchPageId}/accesses/request`);
    }
}
