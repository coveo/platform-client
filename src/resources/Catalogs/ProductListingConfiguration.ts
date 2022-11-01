import API from '../../APICore';
import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {ProductListingConfigurationModel} from './ProductListingConfigurationInterfaces';

export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(catalogId: string, productlistingId: string) {
        return this.api.get(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productlistingId}/configurations`
        );
    }
    create(catalogId: string, productlistingId: string, rankingConfiguration: New<ProductListingConfigurationModel>) {
        return this.api.post(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productlistingId}/configurations`,
            rankingConfiguration
        );
    }

    delete(catalogId: string, productlistingId: string, productListingConfigurationId: string) {
        return this.api.delete(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productlistingId}/configurations/${productListingConfigurationId}`
        );
    }

    get(catalogId: string, productlistingId: string, productListingConfigurationId: string) {
        return this.api.get(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productlistingId}/configurations/${productListingConfigurationId}`
        );
    }

    update(
        catalogId: string,
        productlistingId: string,
        productListingConfigurationId: string,
        rankingConfiguration: New<ProductListingConfigurationModel>
    ) {
        return this.api.put(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productlistingId}/configurations/${productListingConfigurationId}`,
            rankingConfiguration
        );
    }
}
