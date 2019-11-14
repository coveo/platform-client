import {APIConfiguration} from './ConfigurationInterfaces';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import handleResponse, {defaultResponseHandlers} from './handlers/ResponseHandlers';

type APIPrototype = typeof API.prototype;
export type IAPI = {[P in keyof APIPrototype]: APIPrototype[P]};

export default class API implements IAPI {
    static orgPlaceholder = '{organizationName}';

    private getRequestsController: AbortController;

    constructor(private config: APIConfiguration) {
        this.getRequestsController = new AbortController();
    }

    get organizationId() {
        return this.config.organizationId;
    }

    async get<T = {}>(url: string, args: RequestInit = {method: 'get'}): Promise<T> {
        args.signal = args.signal || this.getRequestsController.signal;
        try {
            return await this.request<T>(url, args);
        } catch (error) {
            if (error.name === 'AbortError') {
                return; // We don't want to resolve or reject the promise
            } else {
                throw error;
            }
        }
    }

    async post<T = {}>(
        url: string,
        body: any = {},
        args: RequestInit = {method: 'post', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async postForm<T = {}>(url: string, form: FormData, args: RequestInit = {method: 'post', body: form}): Promise<T> {
        return await this.request<T>(url, args);
    }

    async put<T = {}>(
        url: string,
        body: any,
        args: RequestInit = {method: 'put', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async delete<T = {}>(url: string, args: RequestInit = {method: 'delete'}): Promise<T> {
        return await this.request<T>(url, args);
    }

    abortGetRequests(): void {
        this.getRequestsController.abort();
        this.getRequestsController = new AbortController();
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
                Authorization: `Bearer ${this.config.accessTokenRetriever()}`,
                Accept: 'application/json',
                ...(args.headers || {}),
            },
        };

        const response = await fetch(this.getUrlFromRoute(route), init);
        return handleResponse<T>(response, this.handlers);
    }
}
