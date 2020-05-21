import API, {IAPI} from './APICore';
import {PlatformClientOptions} from './ConfigurationInterfaces';
import {Environment} from './Endpoints';
import {IAPIFeature} from './features/APIFeature';
import {ResponseHandlers} from './handlers/ResponseHandlers';
import PlatformResources from './resources/PlatformResources';

export class PlatformClient extends PlatformResources {
    static Handlers = ResponseHandlers;
    static Environment = Environment;

    constructor(private options: PlatformClientOptions) {
        super();

        const api: IAPI = new API(this.options);
        this.API = this.options.apiFeatures
            ? this.options.apiFeatures.reduce((current, feature) => feature(current), api)
            : api;
        this.registerAll();
    }

    withFeatures(...features: IAPIFeature[]): this {
        const type = this.constructor as typeof PlatformClient;
        return new type({
            ...this.options,
            apiFeatures: [...(this.options.apiFeatures || []), ...features],
        } as PlatformClientOptions) as this;
    }

    async initialize() {
        return this.API.checkToken();
    }

    abortPendingGetRequests() {
        this.API.abortGetRequests();
    }
}

export default PlatformClient;
