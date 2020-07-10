import API from '../../APICore';
import Resource from '../Resource';
import OrganizationConfiguration from './OrganizationConfigurations/OrganizationConfiguration';
import RegionConfiguration from './RegionConfigurations/RegionConfiguration';

export default class Global extends Resource {
    region: RegionConfiguration;
    organization: OrganizationConfiguration;

    constructor(protected api: API) {
        super(api);

        this.region = new RegionConfiguration(api);
        this.organization = new OrganizationConfiguration(api);
    }
}
