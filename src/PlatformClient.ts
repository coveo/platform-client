import API from './APICore.js';
import {Feature, PlatformClientOptions} from './ConfigurationInterfaces.js';
import {Environment} from './Endpoints.js';
import {ResponseHandlers} from './handlers/ResponseHandlers.js';
import PlatformResources from './resources/PlatformResources.js';

export class PlatformClient extends PlatformResources {
    static Handlers = ResponseHandlers;
    static Environment = Environment;

    constructor(private options: PlatformClientOptions) {
        super();

        this.API = new API(options);
        this.ServerlessAPI = new API(options, true);

        this.registerAll();
    }

    withFeatures(...features: Feature[]): this {
        const EnhancedClient = this.constructor as typeof PlatformClient;
        const enhancedOptions = features.reduce((current, feature) => feature(current), this.options);
        return new EnhancedClient(enhancedOptions) as this;
    }

    async initialize() {
        return this.API.checkToken();
    }

    abortPendingGetRequests() {
        this.API.abortGetRequests();
        this.ServerlessAPI.abortGetRequests();
    }
}

export default PlatformClient;
