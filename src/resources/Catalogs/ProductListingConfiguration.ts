import API from '../../APICore';
import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {ProductListingConfigurationModel} from './ProductListingConfigurationInterfaces';

export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(catalogId: string, productListingId: string) {
        return this.api.get(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`
        );
    }
    create(catalogId: string, productListingId: string, rankingConfiguration: New<ProductListingConfigurationModel>) {
        return this.api.post(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
            rankingConfiguration
        );
    }

    delete(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.delete(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`
        );
    }

    get(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.get(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`
        );
    }

    update(
        catalogId: string,
        productListingId: string,
        productListingConfigurationId: string,
        rankingConfiguration: New<ProductListingConfigurationModel>
    ) {
        return this.api.put(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
            rankingConfiguration
        );
    }
}
