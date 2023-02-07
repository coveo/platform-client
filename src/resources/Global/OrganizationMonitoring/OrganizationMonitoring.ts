import Resource from '../../Resource.js';
import {OrganizationMonitoringEndpointUsageModel} from './OrganizationMonitoringInterfaces.js';

export default class OrganizationEndpointUsage extends Resource {
    static baseUrl = '/rest/monitoring/global/organizations';

    get(organizationId: string) {
        return this.api.get<OrganizationMonitoringEndpointUsageModel>(
            `${OrganizationEndpointUsage.baseUrl}/${organizationId}/endpoints/usage`
        );
    }
}
