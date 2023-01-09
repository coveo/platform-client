import API from '../../APICore.js';
import Resource from '../Resource.js';
import OrganizationConfiguration from './OrganizationConfigurations/OrganizationConfiguration.js';
import RegionConfiguration from './RegionConfigurations/RegionConfiguration.js';

export default class Global extends Resource {
    region: RegionConfiguration;
    organization: OrganizationConfiguration;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.region = new RegionConfiguration(api, serverlessApi);
        this.organization = new OrganizationConfiguration(api, serverlessApi);
    }
}
