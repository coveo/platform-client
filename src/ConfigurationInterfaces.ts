import {Environment, Region} from './Endpoints.js';
import {RequestHandler, ResponseHandler} from './handlers/index.js';
import {Retrievable} from './utils/Retriever.js';
export type Feature = (currentOptions: PlatformClientOptions) => PlatformClientOptions;

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId?: Retrievable<string>;
    host?: Retrievable<string>;
    serverlessHost?: Retrievable<string>;
    environment?: Environment;
    region?: Region;
    requestHandlers?: RequestHandler[];
    responseHandlers?: ResponseHandler[];
    globalRequestSettings?: RequestInit;
}
