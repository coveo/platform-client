import {Environment, Region} from './Endpoints.js';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces.js';
import {Retrievable} from './utils/Retriever.js';
export type Feature = (currentOptions: PlatformClientOptions) => PlatformClientOptions;

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId?: Retrievable<string>;
    host?: Retrievable<string>;
    serverlessHost?: Retrievable<string>;
    environment?: Environment;
    region?: Region;
    responseHandlers?: ResponseHandler[];
    globalRequestSettings?: RequestInit;
}
