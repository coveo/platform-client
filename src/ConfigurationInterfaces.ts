import {Environment, Region} from './Endpoints';
import {IAPIFeature} from './features/APIFeature';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import {Retrievable} from './utils/Retriever';

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId: Retrievable<string>;
    host?: Retrievable<string>;
    environment?: Environment;
    region?: Region;
    responseHandlers?: ResponseHandler[];
    apiFeatures?: IAPIFeature[];
}
