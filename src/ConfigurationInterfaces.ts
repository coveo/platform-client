import {IAPIFeature} from './features/APIFeature';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';

export interface APIConfiguration {
    organizationId: string;
    accessTokenRetriever: () => string;
    host?: string;
    responseHandlers?: ResponseHandler[];
    apiFeatures?: IAPIFeature[];
}

export interface PlatformClientOptions extends APIConfiguration {
    environment?: string;
}
