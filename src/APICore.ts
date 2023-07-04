import {backOff} from 'exponential-backoff';
import {PlatformClientOptions} from './ConfigurationInterfaces.js';
import getEndpoint, {Environment, Region} from './Endpoints.js';
import {ResponseBodyFormat} from './handlers/ResponseHandlerInterfaces.js';
import handleResponse from './handlers/ResponseHandlers.js';
import {UserModel} from './resources/Users/index.js';
import {createFetcher} from './utils/createFetcher.js';
import retrieve from './utils/Retriever.js';
import {CoveoPlatformClientRequestInit, Predicate} from './utils/types.js';

interface TokenInfo {
    authentication: UserModel;
    [key: string]: any;
}

const HEADERS_JSON_CONTENT_TYPE: HeadersInit = Object.freeze({'Content-Type': 'application/json'});

/** Check whether the response status is `429 Too Many Requests`. */
const isTooManyRequests: Predicate<Response> = (response) => response.status === 429;
/** Check whether the method is 'GET' (case insensitive). */
const isGet: Predicate<string | undefined> = RegExp.prototype.test.bind(/^GET$/i);

/** "Logical OR" two optional abort signals. */
const abortOnEither = (
    signal1: AbortSignal | null | undefined,
    signal2: AbortSignal | null | undefined
): AbortSignal | null | undefined => {
    if (signal1 && signal2) {
        const joined = new AbortController();
        function forwardAbort(this: AbortSignal) {
            joined.abort(this.reason);
        }
        signal1.addEventListener('abort', forwardAbort);
        signal2.addEventListener('abort', forwardAbort);
        return joined.signal;
    }
    return signal1 ?? signal2;
};

const withBody = (
    body: any,
    userArgs: CoveoPlatformClientRequestInit | undefined
): CoveoPlatformClientRequestInit | undefined =>
    userArgs?.body ? undefined : {headers: HEADERS_JSON_CONTENT_TYPE, body: JSON.stringify(body)};

export default class API {
    static orgPlaceholder = '{organizationName}';

    private getRequestsController: AbortController;
    private tokenInfo: TokenInfo;

    constructor(private config: PlatformClientOptions, private isServerlessHost?: boolean) {
        this.getRequestsController = new AbortController();
    }

    get organizationId(): string {
        if (this.config.organizationId === undefined) {
            throw new Error('No organization ID found in the config.');
        }
        return retrieve(this.config.organizationId);
    }

    async get<T = Record<string, unknown>>(url: string, args?: CoveoPlatformClientRequestInit): Promise<T> {
        try {
            return await this.request<T>(url, this.buildRequestInit('GET', args), args?.responseBodyFormat);
        } catch (error) {
            // Warning: the logic below does not do what the original author intended/mentions.
            // It will fullfil the promise with `undefined`, instead of keeping it pending.
            if (error.name === 'AbortError') {
                return undefined as T; // We don't want to resolve or reject the promise
            } else {
                throw error;
            }
        }
    }

    /**
     * @deprecated Use `get` with `{responseBodyFormat: 'blob'}` argument instead. Will be removed in version 45
     */
    async getFile(url: string, args?: CoveoPlatformClientRequestInit): Promise<Blob> {
        try {
            return await this.request(url, this.buildRequestInit('GET', args), 'blob');
        } catch (error) {
            // Warning: the logic below does not do what the original author intended/mentions.
            // It will fullfil the promise with `undefined`, instead of keeping it pending.
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
        body: undefined,
        args?: CoveoPlatformClientRequestInit
    ): Promise<T>;
    async post<T = Record<string, unknown>>(
        url: string,
        body?: any,
        args?: Omit<CoveoPlatformClientRequestInit, 'body'>
    ): Promise<T>;
    async post<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args?: CoveoPlatformClientRequestInit
    ): Promise<T> {
        return await this.request<T>(
            url,
            this.buildRequestInit('POST', args, withBody(body, args)),
            args?.responseBodyFormat
        );
    }

    async postForm<T = Record<string, unknown>>(
        url: string,
        body: FormData,
        args?: Omit<CoveoPlatformClientRequestInit, 'body'>
    ): Promise<T> {
        return await this.request<T>(url, this.buildRequestInit('POST', args, {body}), args?.responseBodyFormat);
    }

    async put<T = Record<string, unknown>>(
        url: string,
        body: undefined,
        args?: CoveoPlatformClientRequestInit
    ): Promise<T>;
    async put<T = Record<string, unknown>>(
        url: string,
        body?: any,
        args?: Omit<CoveoPlatformClientRequestInit, 'body'>
    ): Promise<T>;
    async put<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args?: CoveoPlatformClientRequestInit
    ): Promise<T> {
        return await this.request<T>(
            url,
            this.buildRequestInit('PUT', args, withBody(body, args)),
            args?.responseBodyFormat
        );
    }

    async patch<T = Record<string, unknown>>(
        url: string,
        body: undefined,
        args?: CoveoPlatformClientRequestInit
    ): Promise<T>;
    async patch<T = Record<string, unknown>>(
        url: string,
        body?: any,
        args?: Omit<CoveoPlatformClientRequestInit, 'body'>
    ): Promise<T>;
    async patch<T = Record<string, unknown>>(
        url: string,
        body: any = {},
        args?: CoveoPlatformClientRequestInit
    ): Promise<T> {
        return await this.request<T>(
            url,
            this.buildRequestInit('PATCH', args, withBody(body, args)),
            args?.responseBodyFormat
        );
    }

    async delete<T = Record<string, unknown>>(url: string, args?: CoveoPlatformClientRequestInit): Promise<T> {
        return await this.request<T>(url, this.buildRequestInit('DELETE', args), args?.responseBodyFormat);
    }

    abortGetRequests(): void {
        this.getRequestsController.abort();
        this.getRequestsController = new AbortController();
    }

    async checkToken() {
        const formData = new FormData();
        formData.append('token', this.accessToken);
        this.tokenInfo = await this.postForm<TokenInfo>('/oauth/check_token', formData);
    }

    get currentUser(): UserModel {
        return this.tokenInfo?.authentication;
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

    private getUrlFromRoute(route: string): string {
        return `${this.endpoint}${route}`.replace(API.orgPlaceholder, this.organizationId);
    }

    private buildRequestInit(
        method: string,
        args: CoveoPlatformClientRequestInit | undefined,
        prefilled?: RequestInit
    ): RequestInit {
        const {responseBodyFormat, ...requestArgs} = args ?? {};
        const globalRequestSettings = this.config.globalRequestSettings;

        const init: RequestInit = {
            ...prefilled,
            ...globalRequestSettings,
            ...requestArgs,
            method,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                ...prefilled?.headers,
                ...globalRequestSettings?.headers,
                ...requestArgs?.headers,
            },
        };

        if (isGet(init.method)) {
            init.signal = abortOnEither(this.getRequestsController.signal, init.signal);
        }

        return init;
    }

    private async request<T>(route: string, init: RequestInit, responseBodyFormat?: ResponseBodyFormat): Promise<T> {
        const fetcher = createFetcher(this.getUrlFromRoute(route), init, isTooManyRequests);
        const response = await backOff(fetcher, {retry: isTooManyRequests});
        return handleResponse<T>(response, this.config.responseHandlers, responseBodyFormat);
    }
}
