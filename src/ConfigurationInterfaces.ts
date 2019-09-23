import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';

export interface APIConfiguration {
    organizationId: string;
    accessTokenRetriever: () => string;
    host?: string;
    responseHandlers?: ResponseHandler[];
}

export interface PlatformClientOptions extends APIConfiguration {
    environment?: string;
}
