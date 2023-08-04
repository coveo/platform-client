import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    SearchPageModel,
    ListSearchPagesParams,
    CreateSearchPageModel,
    UpdateSearchPageModel,
    SearchPageVersionModel,
    MajorMinorVersion,
    SearchPageHeadersModel,
    ReorderSearchPageHeadersModel,
    JavaScriptResourceModel,
    CSSResourceModel,
} from './SearchPagesInterfaces.js';

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

    getHeaders(pageId: string) {
        return this.api.get<SearchPageHeadersModel>(`${SearchPages.baseUrl}/${pageId}/header`);
    }

    reorderHeaders(pageId: string, resources: ReorderSearchPageHeadersModel) {
        return this.api.put<SearchPageHeadersModel>(`${SearchPages.baseUrl}/${pageId}/header`, resources);
    }

    createCssResource(pageId: string, resource: CSSResourceModel) {
        return this.api.post<SearchPageHeadersModel>(`${SearchPages.baseUrl}/${pageId}/header/css`, resource);
    }

    updateCssResource(pageId: string, resourceName: string, resource: CSSResourceModel) {
        return this.api.put<SearchPageHeadersModel>(
            `${SearchPages.baseUrl}/${pageId}/header/css/${resourceName}`,
            resource,
        );
    }

    deleteCssResource(pageId: string, resourceName: string) {
        return this.api.delete(`${SearchPages.baseUrl}/${pageId}/header/css/${resourceName}`);
    }

    createJsResource(pageId: string, resource: JavaScriptResourceModel) {
        return this.api.post<SearchPageHeadersModel>(`${SearchPages.baseUrl}/${pageId}/header/javascript`, resource);
    }

    updateJsResource(pageId: string, resourceName: string, resource: JavaScriptResourceModel) {
        return this.api.put<SearchPageHeadersModel>(
            `${SearchPages.baseUrl}/${pageId}/header/javascript/${resourceName}`,
            resource,
        );
    }

    deleteJsResource(pageId: string, resourceName: string) {
        return this.api.delete(`${SearchPages.baseUrl}/${pageId}/header/javascript/${resourceName}`);
    }
}
