import {APIConfiguration} from './ConfigurationInterfaces';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import handleResponse, {defaultResponseHandlers} from './handlers/ResponseHandlers';

function removeEmptyEntries(obj) {
    return Object.keys(obj).reduce((memo, key) => {
        const val = obj[key];
        if (val && typeof val === 'object') {
            memo[key] = removeEmptyEntries(obj);
        } else if (val != null || val !== '') {
            memo[key] = obj[key];
        }
        return memo;
    }, {});
}

function convertToQueryString(parameters: any) {
    return parameters ? `?${new URLSearchParams(Object.entries(removeEmptyEntries(parameters))).toString()}` : '';
}

export default class API {
    static orgPlaceholder = '{organizationName}';

    constructor(private config: APIConfiguration) {}

    async get<T>(url: string, queryParams?: any, args: RequestInit = {method: 'get'}): Promise<T> {
        return await this.request<T>(url + convertToQueryString(queryParams), args);
    }

    async post<T>(
        url: string,
        body: any,
        args: RequestInit = {method: 'post', body: JSON.stringify(body)}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async put<T>(url: string, body: any, args: RequestInit = {method: 'put', body: JSON.stringify(body)}): Promise<T> {
        return await this.request<T>(url, args);
    }

    async delete<T = void>(url: string, args: RequestInit = {method: 'delete'}): Promise<T> {
        return await this.request<T>(url, args);
    }

    private get handlers(): ResponseHandler[] {
        const customHandlers = this.config.responseHandlers || [];
        return customHandlers.length ? customHandlers : defaultResponseHandlers;
    }

    private getUrlFromRoute(route: string): string {
        return `${this.config.host}${route}`.replace(API.orgPlaceholder, this.config.organizationId);
    }

    private async request<T>(route: string, args: RequestInit): Promise<T> {
        const init: RequestInit = {
            ...args,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.config.accessTokenRetriever()}`,
                ...(args.headers || {}),
            },
        };

        const response = await fetch(this.getUrlFromRoute(route), init);
        return handleResponse<T>(response, this.handlers);
    }
}
