import {backOff} from 'exponential-backoff';
import {PlatformClientOptions} from './ConfigurationInterfaces';
import getEndpoint, {Environment, Region} from './Endpoints';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import handleResponse, {defaultResponseHandlers, ResponseHandlers} from './handlers/ResponseHandlers';
import {UserModel} from './resources/Users';
import retrieve from './utils/Retriever';

export default class API {
    static orgPlaceholder = '{organizationName}';

    private getRequestsController: AbortController;
    private tokenInfo: Record<string, any>;

    constructor(private config: PlatformClientOptions, private isServerlessHost?: boolean) {
        this.getRequestsController = new AbortController();
    }

    get organizationId(): string {
        return retrieve(this.config.organizationId!); // Assuming that resources calling this method would have a defined organizationId
    }

    async get<T = Record<string, unknown>>(url: string, args: RequestInit = {method: 'get'}): Promise<T> {
        args.signal = args.signal || this.getRequestsController.signal;
        try {
            return await this.request<T>(url, args);
        } catch (error) {
            if (error.name === 'AbortError') {
                return undefined as T; // We don't want to resolve or reject the promise
            } else {
                throw error;
            }
        }
    }

    async getFile(url: string, args: RequestInit = {method: 'get'}): Promise<Blob> {
        args.signal = args.signal || this.getRequestsController.signal;
        try {
            return await this.requestFile(url, args);
        } catch (error) {
            if (error.name === 'AbortError') {
                // We don't want to resolve or reject the promise
                return undefined as unknown as Blob;
            } else {
                throw error;
            }
        }
    }

    async post<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args: RequestInit = {method: 'post', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async postForm<T = Record<string, unknown>>(
        url: string,
        form: FormData,
        args: RequestInit = {method: 'post', body: form}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async put<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args: RequestInit = {method: 'put', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async patch<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args: RequestInit = {method: 'PATCH', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return await this.request<T>(url, args);
    }

    async delete<T = Record<string, unknown>>(url: string, args: RequestInit = {method: 'delete'}): Promise<T> {
        return await this.request<T>(url, args);
    }

    abortGetRequests(): void {
        this.getRequestsController.abort();
        this.getRequestsController = new AbortController();
    }

    async checkToken() {
        const formData = new FormData();
        formData.append('token', this.accessToken);
        this.tokenInfo = await this.postForm<any>('/oauth/check_token', formData);
    }

    get currentUser(): UserModel {
        return this.tokenInfo?.authentication;
    }

    private get handlers(): ResponseHandler[] {
        const customHandlers = this.config.responseHandlers || [];
        return customHandlers.length ? customHandlers : defaultResponseHandlers;
    }

    private get environment(): Environment {
        return this.config.environment || Environment.prod;
    }

    private get region(): Region {
        return this.config.region || Region.US;
    }

    private get endpoint(): string {
        return (
            retrieve(this.isServerlessHost ? this.config.serverlessHost : this.config.host) ||
            getEndpoint(this.environment, this.region, this.isServerlessHost)
        );
    }

    private get accessToken(): string {
        return retrieve(this.config.accessToken);
    }

    private get globalRequestSettings(): RequestInit {
        return this.config.globalRequestSettings || {};
    }

    private getUrlFromRoute(route: string): string {
        return `${this.endpoint}${route}`.replace(API.orgPlaceholder, this.organizationId);
    }

    private async request<T>(route: string, args: RequestInit): Promise<T> {
        const init: RequestInit = {
            ...this.globalRequestSettings,
            ...args,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                ...(this.globalRequestSettings.headers || {}),
                ...(args.headers || {}),
            },
        };

        const req = async () => {
            const response = await fetch(this.getUrlFromRoute(route), init);
            if (this.isThrottled(response.status)) {
                throw response;
            }
            return response;
        };

        const out = await backOff(req, {retry: (e: Response) => this.isThrottled(e.status)});
        return handleResponse<T>(out, this.handlers);
    }

    private async requestFile(route: string, args: RequestInit): Promise<Blob> {
        const init: RequestInit = {
            ...this.globalRequestSettings,
            ...args,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                ...(this.globalRequestSettings.headers || {}),
                ...(args.headers || {}),
            },
        };
        const response = await fetch(this.getUrlFromRoute(route), init);
        return handleResponse<Blob>(response, [
            ResponseHandlers.noContent,
            ResponseHandlers.successBlob,
            ResponseHandlers.error,
        ]);
    }

    private isThrottled(status: number): boolean {
        return status === 429;
    }
}
