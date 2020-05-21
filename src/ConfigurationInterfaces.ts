import {IAPIFeature} from './features/APIFeature';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import {Retrievable} from './utils/Retriever';

export interface APIConfiguration {
    accessToken: Retrievable<string>;
    organizationId: Retrievable<string>;
    host?: Retrievable<string>;
    responseHandlers?: ResponseHandler[];
    apiFeatures?: IAPIFeature[];
}

export interface PlatformClientOptions extends APIConfiguration {
    environment?: Retrievable<string>;
}
