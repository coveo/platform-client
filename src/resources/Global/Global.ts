import API from '../../APICore.js';
import Resource from '../Resource.js';
import OrganizationConfiguration from './OrganizationConfigurations/OrganizationConfiguration.js';
import OrganizationMonitoring from './OrganizationMonitoring/OrganizationMonitoring.js';
import RegionConfiguration from './RegionConfigurations/RegionConfiguration.js';

export default class Global extends Resource {
    region: RegionConfiguration;
    organization: OrganizationConfiguration;
    organizationMonitoring: OrganizationMonitoring;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.region = new RegionConfiguration(api, serverlessApi);
        this.organization = new OrganizationConfiguration(api, serverlessApi);
        this.organizationMonitoring = new OrganizationMonitoring(api, serverlessApi);
    }
}
