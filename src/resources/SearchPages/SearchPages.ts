import API from '../../APICore';
import Resource from '../Resource';
import {
    SearchPageModel,
    ListSearchPagesParams,
    CreateSearchPageModel,
    UpdateSearchPageModel,
    SearchPageVersionModel,
    MajorMinorVersion,
} from './SearchPagesInterfaces';

export default class SearchPages extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/pages`;

    list(params?: ListSearchPagesParams) {
        return this.api.get<SearchPageModel[]>(this.buildPath(SearchPages.baseUrl, params));
    }

    create(page: CreateSearchPageModel) {
        return this.api.post<SearchPageModel>(SearchPages.baseUrl, page);
    }

    delete(pageId: string) {
        return this.api.delete(`${SearchPages.baseUrl}/${pageId}`);
    }

    get(pageId: string) {
        return this.api.get<SearchPageModel>(`${SearchPages.baseUrl}/${pageId}`);
    }

    update(pageId: string, page: UpdateSearchPageModel) {
        return this.api.put(`${SearchPages.baseUrl}/${pageId}`, page);
    }

    getVersion(pageId: string) {
        return this.api.get<SearchPageVersionModel>(`${SearchPages.baseUrl}/${pageId}/searchui`);
    }

    updateVersion(pageId: string, version: MajorMinorVersion) {
        return this.api.put(this.buildPath(`${SearchPages.baseUrl}/${pageId}/searchui`, version));
    }
}
