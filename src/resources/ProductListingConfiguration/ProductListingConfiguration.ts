import API from '../../APICore.js';
import {PageModel, New} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ListingConfigurationModel, ProductListingsListOptions} from './ProductListingConfigurationInterfaces.js';

export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/v2/configurations/listings`;

    list(options?: ProductListingsListOptions) {
        return this.api.get<PageModel<ListingConfigurationModel>>(
            this.buildPath(ProductListingConfiguration.baseUrl, options),
        );
    }

    create(model: New<ListingConfigurationModel>) {
        return this.api.post<ListingConfigurationModel>(ProductListingConfiguration.baseUrl, model);
    }

    delete(configurationId: string) {
        return this.api.delete(`${ProductListingConfiguration.baseUrl}/${configurationId}`);
    }

    get(configurationId: string) {
        return this.api.get<ListingConfigurationModel>(`${ProductListingConfiguration.baseUrl}/${configurationId}`);
    }

    update(configurationId: string, model: ListingConfigurationModel) {
        return this.api.put<ListingConfigurationModel>(
            `${ProductListingConfiguration.baseUrl}/${configurationId}`,
            model,
        );
    }

    getGlobal() {
        return this.api.get<ListingConfigurationModel>(`${ProductListingConfiguration.baseUrl}/global`);
    }

    updateGlobal(model: ListingConfigurationModel) {
        return this.api.put<ListingConfigurationModel>(`${ProductListingConfiguration.baseUrl}/global`, model);
    }
}
