import {Environment, Region} from './Endpoints';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import {Retrievable} from './utils/Retriever';

export type Feature = (currentOptions: PlatformClientOptions) => PlatformClientOptions;

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId: Retrievable<string>;
    host?: Retrievable<string>;
    serverlessHost?: string;
    environment?: Environment;
    region?: Region;
    responseHandlers?: ResponseHandler[];
}
