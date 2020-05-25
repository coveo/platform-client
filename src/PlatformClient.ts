import API from './APICore';
import {Feature, PlatformClientOptions} from './ConfigurationInterfaces';
import {Environment} from './Endpoints';
import {ResponseHandlers} from './handlers/ResponseHandlers';
import PlatformResources from './resources/PlatformResources';

export class PlatformClient extends PlatformResources {
    static Handlers = ResponseHandlers;
    static Environment = Environment;

    constructor(private options: PlatformClientOptions) {
        super();

        this.API = new API(options);
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
    }
}

export default PlatformClient;
