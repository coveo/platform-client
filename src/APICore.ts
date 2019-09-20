import {IRestResponse} from './handlers/HandlerConstants';
import {Handlers} from './handlers/Handlers';

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

    constructor(private host: string, private orgId: string, private accessTokenRetriever: () => string) {}

    async get<T>(url: string, queryParams?: any, args: RequestInit = {method: 'get'}): Promise<IRestResponse<T>> {
        return await this.request<T>(url + convertToQueryString(queryParams), args);
    }

    async post<T>(
        url: string,
        body: any,
        args: RequestInit = {method: 'post', body: JSON.stringify(body)}
    ): Promise<IRestResponse<T>> {
        return await this.request<T>(url, args);
    }

    async put<T>(
        url: string,
        body: any,
        args: RequestInit = {method: 'put', body: JSON.stringify(body)}
    ): Promise<IRestResponse<T>> {
        return await this.request<T>(url, args);
    }

    async delete<T = void>(url: string, args: RequestInit = {method: 'delete'}): Promise<IRestResponse<T>> {
        return await this.request<T>(url, args);
    }

    private handleResponse<T>(response: Response) {
        const canProcess = Handlers.filter((handler) => handler.canProcess(response));
        return canProcess[0].process<T>(response);
    }

    private async request<T>(urlWithOrg: string, args: RequestInit): Promise<IRestResponse<T>> {
        const init: RequestInit = {
            ...args,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.accessTokenRetriever()}`,
                ...(args.headers || {}),
            },
        };
        const url = `${this.host}${urlWithOrg}`.replace(API.orgPlaceholder, this.orgId);

        const response = await fetch(url, init);
        return this.handleResponse(response);
    }
}
