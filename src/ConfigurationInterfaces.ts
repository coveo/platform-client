import {Environment} from './Endpoints';
import {IAPIFeature} from './features/APIFeature';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import {Retrievable} from './utils/Retriever';

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId: Retrievable<string>;
    host?: Retrievable<string>;
    environment?: Environment;
    responseHandlers?: ResponseHandler[];
    apiFeatures?: IAPIFeature[];
}
