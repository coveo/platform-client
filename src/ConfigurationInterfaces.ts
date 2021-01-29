import {Environment, Region} from './Endpoints';
import {ResponseHandler} from './handlers/ResponseHandlerInterfaces';
import {Retrievable} from './utils/Retriever';

export type Feature = (currentOptions: PlatformClientOptions) => PlatformClientOptions;
export const NoOrgIDRequiredForGlobalOperations = 'Global';

export interface PlatformClientOptions {
    accessToken: Retrievable<string>;
    organizationId: Retrievable<string | typeof NoOrgIDRequiredForGlobalOperations>;
    host?: Retrievable<string>;
    serverlessHost?: Retrievable<string>;
    environment?: Environment;
    region?: Region;
    responseHandlers?: ResponseHandler[];
}
