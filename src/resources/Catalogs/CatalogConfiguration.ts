import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    CatalogConfigurationModel,
    CreateCatalogConfigurationModel,
    CatalogConfigurationsListOptions,
} from './CatalogInterfaces.js';

export default class CatalogConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogconfigurations`;

    list(options?: CatalogConfigurationsListOptions) {
        return this.api.get<PageModel<CatalogConfigurationModel>>(
            this.buildPath(CatalogConfiguration.baseUrl, options),
        );
    }

    create(configuration: New<CreateCatalogConfigurationModel>) {
        return this.api.post<CatalogConfigurationModel>(CatalogConfiguration.baseUrl, configuration);
    }

    delete(configurationId: string) {
        return this.api.delete(`${CatalogConfiguration.baseUrl}/${configurationId}`);
    }

    get(configurationId: string) {
        return this.api.get<CatalogConfigurationModel>(`${CatalogConfiguration.baseUrl}/${configurationId}`);
    }

    update(configuration: CreateCatalogConfigurationModel) {
        return this.api.put<CatalogConfigurationModel>(
            `${CatalogConfiguration.baseUrl}/${configuration.id}`,
            configuration,
        );
    }
}
