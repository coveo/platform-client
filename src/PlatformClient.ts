import API, {IAPI} from './APICore';
import {APIConfiguration, PlatformClientOptions} from './ConfigurationInterfaces';
import {HostUndefinedError} from './Errors';
import {IAPIFeature} from './features/APIFeature';
import {ResponseHandlers} from './handlers/ResponseHandlers';
import PlatformResources from './resources/PlatformResources';
import retrieve from './utils/Retriever';

export class PlatformClient extends PlatformResources {
    static Environments = {
        dev: 'development',
        staging: 'staging',
        prod: 'production',
        hipaa: 'hipaa',
    };
    static Hosts = {
        [PlatformClient.Environments.dev]: 'https://platformdev.cloud.coveo.com',
        [PlatformClient.Environments.staging]: 'https://platformqa.cloud.coveo.com',
        [PlatformClient.Environments.prod]: 'https://platform.cloud.coveo.com',
        [PlatformClient.Environments.hipaa]: 'https://platformhipaa.cloud.coveo.com',
    };
    static Handlers = ResponseHandlers;
    static defaultOptions: Partial<PlatformClientOptions> = {
        environment: PlatformClient.Environments.prod,
        responseHandlers: [],
    };

    private options: PlatformClientOptions;

    constructor(options: PlatformClientOptions) {
        super();

        this.options = {
            ...PlatformClient.defaultOptions,
            ...options,
        };

        if (!this.host) {
            throw new HostUndefinedError();
        }

        const api: IAPI = new API(this.apiConfiguration);
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

    private get apiConfiguration(): APIConfiguration {
        const {environment, ...apiConfig} = this.options;
        return {
            ...apiConfig,
            host: this.host,
        };
    }

    private get environment(): string {
        return retrieve(this.options.environment);
    }

    private get host(): string {
        return retrieve(this.options.host) || PlatformClient.Hosts[this.environment];
    }
}

export default PlatformClient;
