import {IAPI} from '../APICore';
import {UserModel} from '../resources/Users';

export interface IAPIHooks {
    beforeRequest?: (url: string, args: RequestInit) => void;
    afterSuccess?: <T>(url: string, args: RequestInit, response: T) => T;
    afterException?: (url: string, args: RequestInit, exception: Error) => boolean;
}

export class APIWithHooks<TAPI extends IAPI = IAPI> implements IAPI {
    constructor(private api: TAPI, private hooks: IAPIHooks) {}

    get organizationId() {
        return this.api.organizationId;
    }

    async get<T = {}>(url: string, args: RequestInit = {method: 'get'}): Promise<T> {
        return this.wrapInGenericHandler(url, args, () => this.api.get<T>(url, args));
    }

    async getFile(url: string, args: RequestInit = {method: 'get'}): Promise<Blob> {
        return this.wrapInGenericHandler(url, args, () => this.api.getFile(url, args));
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

    async checkToken() {
        return this.api.checkToken();
    }

    get currentUser(): UserModel {
        return this.api.currentUser;
    }

    private async wrapInGenericHandler<T>(url: string, args: RequestInit, request: () => Promise<T>) {
        this.hooks.beforeRequest?.(url, args);

        try {
            const response = await request();
            this.hooks.afterSuccess?.<T>(url, args, response);
            return response;
        } catch (exception) {
            if (!this.hooks.afterException?.(url, args, exception)) {
                throw exception;
            }
        }
    }
}
