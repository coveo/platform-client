import API from '../../APICore';
import {normalizePaginatedOptions} from '../../utils/normalizePaginatedOptions';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    ProductListingConfigurationModel,
    ProductListingConfigurationOptions,
} from './ProductListingConfigurationInterfaces';

export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(catalogId: string, productListingId: string, options?: ProductListingConfigurationOptions) {
        const normalizedOptions = normalizePaginatedOptions(options);
        return this.api.get<PageModel<ProductListingConfigurationModel>>(
            this.buildPath(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
                normalizedOptions
            )
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
        return this.api.get<ProductListingConfigurationModel>(
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
