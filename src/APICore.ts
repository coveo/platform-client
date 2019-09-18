import {IRestResponse} from './handlers/HandlerConstants';
import {Handlers} from './handlers/Handlers';

const removeEmptyEntries = (obj) =>
    Object.keys(obj).reduce((memo, key) => {
        const val = obj[key];
        if (val && typeof val === 'object') {
            memo[key] = removeEmptyEntries(obj);
        } else if (val != null || val !== '') {
            memo[key] = obj[key];
        }
        return memo;
    }, {});

export default class API {
    static orgPlaceholder = '{organizationName}';

    constructor(private host: string, private orgId: string, private accessTokenRetriever: () => string) {}

    static toQueryString(parameters: any) {
        return parameters ? `?${new URLSearchParams(Object.entries(removeEmptyEntries(parameters))).toString()}` : '';
    }

    async get<T>(url: string, queryParams?: any, args: RequestInit = {method: 'get'}): Promise<IRestResponse<T>> {
        return await this.request<T>(url + API.toQueryString(queryParams), args);
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
