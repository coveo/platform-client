import API from './APICore';
import {APIConfiguration, PlatformClientOptions} from './ConfigurationInterfaces';
import {HostUndefinedError} from './Errors';
import {ResponseHandlers} from './handlers/ResponseHandlers';
import PlatformResources from './resources/PlatformResources';

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
    private tokenInfo: Record<string, any>; // define a better type

    constructor(options: PlatformClientOptions) {
        super();

        this.options = {
            ...PlatformClient.defaultOptions,
            ...options,
        };

        if (!this.host) {
            throw new HostUndefinedError();
        }

        this.API = new API(this.apiConfiguration);
        this.registerAll();
    }

    async initialize() {
        try {
            this.tokenInfo = await this.checkToken();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    private get apiConfiguration(): APIConfiguration {
        const {environment, ...apiConfig} = this.options;
        return {
            ...apiConfig,
            host: this.host,
        };
    }

    private get host(): string {
        return this.options.host || PlatformClient.Hosts[this.options.environment];
    }

    private async checkToken() {
        const formData = new FormData();
        formData.set('token', this.options.accessTokenRetriever());
        return this.API.postForm<any>('/oauth/check_token', formData);
    }
}

export default PlatformClient;
