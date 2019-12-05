import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';

export interface APIConfiguration {
    /**
     * @deprecated Use the organizationIdRetriever instead
     */
    organizationId?: string;
    organizationIdRetriever?: () => string;
    accessTokenRetriever: () => string;
    host?: string;
    responseHandlers?: ResponseHandler[];
}

export interface PlatformClientOptions extends APIConfiguration {
    environment?: string;
}
