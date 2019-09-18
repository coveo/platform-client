import API from './APICore';
import {CoveoPlatformResources, Resources} from './resources/Resources';

export interface CoveoPlatformOptions {
    organizationId: string;
    accessTokenRetriever: () => string;
    environment?: string;
    host?: string;
}

const Environments = {
    local: 'local',
    dev: 'development',
    staging: 'staging',
    prod: 'production',
    hipaa: 'hipaa',
};

const Hosts = {
    [Environments.dev]: 'https://platformdev.cloud.coveo.com',
    [Environments.staging]: 'https://platformqa.cloud.coveo.com',
    [Environments.prod]: 'https://platform.cloud.coveo.com',
    [Environments.hipaa]: 'https://platformhipaa.cloud.coveo.com',
};

export default class CoveoPlatform extends CoveoPlatformResources {
    static defaultOptions: Partial<CoveoPlatformOptions> = {
        environment: Environments.prod,
    };

    private options: CoveoPlatformOptions;
    private tokenInfo: any; // define a better type
    private readonly API: API;

    constructor(options: CoveoPlatformOptions) {
        super();

        this.options = {
            ...CoveoPlatform.defaultOptions,
            ...options,
        };

        const host = this.options.host || Hosts[this.options.environment];
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
