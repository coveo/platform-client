import {IAPI} from '../APICore';

export interface IAPIHooks {
    beforeAnyRequest?: (url: string, args: RequestInit) => void;
    afterAnySuccess?: <T>(url: string, args: RequestInit, response: T) => T;
    afterAnyException?: (url: string, args: RequestInit, exception: Error) => boolean;
}

export class APIWithHooks<TAPI extends IAPI = IAPI> implements IAPI {
    constructor(private api: TAPI, private hooks: IAPIHooks) {}

    get organizationId() {
        return this.api.organizationId;
    }

    async get<T = {}>(url: string, args: RequestInit = {method: 'get'}): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.get<T>(url, args));
    }

    async post<T = {}>(
        url: string,
        body: any = {},
        args: RequestInit = {method: 'post', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.post<T>(url, body, args));
    }

    async postForm<T = {}>(url: string, form: FormData, args: RequestInit = {method: 'post', body: form}): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.postForm<T>(url, form, args));
    }

    async put<T = {}>(
        url: string,
        body: any,
        args: RequestInit = {method: 'put', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}
    ): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.put<T>(url, body, args));
    }

    async delete<T = {}>(url: string, args: RequestInit = {method: 'delete'}): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.delete<T>(url, args));
    }

    abortGetRequests(): void {
        this.api.abortGetRequests();
    }

    private async wrapInGenericHandler<T>(url: string, args: RequestInit, request: () => Promise<T>) {
        this.hooks.beforeAnyRequest?.(url, args);

        try {
            const response = await request();
            this.hooks.afterAnySuccess?.<T>(url, args, response);
            return response;
        } catch (exception) {
            if (!this.hooks.afterAnyException?.(url, args, exception)) {
                throw exception;
            }
        }
    }
}
