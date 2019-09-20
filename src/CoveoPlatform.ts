import API from './APICore';
import {CoveoPlatformResources, Resources} from './resources/Resources';

export interface CoveoPlatformOptions {
    organizationId: string;
    accessTokenRetriever: () => string;
    environment?: string;
    host?: string;
}

export default class CoveoPlatform extends CoveoPlatformResources {
    static Environments = {
        dev: 'development',
        staging: 'staging',
        prod: 'production',
        hipaa: 'hipaa',
    };
    static Hosts = {
        [CoveoPlatform.Environments.dev]: 'https://platformdev.cloud.coveo.com',
        [CoveoPlatform.Environments.staging]: 'https://platformqa.cloud.coveo.com',
        [CoveoPlatform.Environments.prod]: 'https://platform.cloud.coveo.com',
        [CoveoPlatform.Environments.hipaa]: 'https://platformhipaa.cloud.coveo.com',
    };
    static defaultOptions: Partial<CoveoPlatformOptions> = {
        environment: CoveoPlatform.Environments.prod,
    };

    private options: CoveoPlatformOptions;
    private tokenInfo: Record<string, any>; // define a better type
    private readonly API: API;

    constructor(options: CoveoPlatformOptions) {
        super();

        this.options = {
            ...CoveoPlatform.defaultOptions,
            ...options,
        };

        const host = this.options.host || CoveoPlatform.Hosts[this.options.environment];
        if (!host) {
            throw new Error(`CoveoPlatform's host is undefined.`);
        }

        this.API = new API(host, this.options.organizationId, this.options.accessTokenRetriever);
        Resources.registerAll(this, this.API);
    }

    async initialize() {
        try {
            this.tokenInfo = await this.checkToken();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    private async checkToken() {
        return this.API.post('/oauth/check_token', {token: this.options.accessTokenRetriever()});
    }
}
