import Resource from '../../Resource';
import {RegionConfigurationModel} from './RegionConfigurationInterfaces';

export default class RegionConfiguration extends Resource {
    static baseUrl = '/rest/global/regions';

    list() {
        return this.api.get<RegionConfigurationModel[]>(RegionConfiguration.baseUrl);
    }

    get(region: string) {
        return this.api.get<RegionConfigurationModel>(`${RegionConfiguration.baseUrl}/${region}`);
    }
}
