import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {HostedPageResponse, ListHostedPagesParams, HostedPage} from './HostedPages.model.js';

/**
 * Hosted Pages Swagger documentation can be found at
 * https://platform.cloud.coveo.com/docs?urls.primaryName=Search%20Interface%20Service#/Hosted%20Page.
 */
export default class HostedPages extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/hostedpages`;

    list(options?: ListHostedPagesParams) {
        return this.api.get<PageModel<HostedPageResponse>>(this.buildPath(HostedPages.baseUrl, options));
    }

    create(hostedPage: New<HostedPage>) {
        return this.api.post<HostedPageResponse>(HostedPages.baseUrl, hostedPage);
    }

    delete(hostedPageId: string) {
        return this.api.delete(`${HostedPages.baseUrl}/${hostedPageId}`);
    }

    get(hostedPageId: string) {
        return this.api.get<HostedPageResponse>(`${HostedPages.baseUrl}/${hostedPageId}`);
    }

    update(hostedPage: HostedPage) {
        const {id, ...body} = hostedPage;

        return this.api.put<HostedPageResponse>(`${HostedPages.baseUrl}/${id}`, body);
    }
}
