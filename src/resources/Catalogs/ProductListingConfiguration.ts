import API from '../../APICore.js';
import {normalizePaginatedOptions} from '../../utils/normalizePaginatedOptions.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    ProductListingConfigurationModel,
    ProductListingConfigurationOptions,
} from './ProductListingConfigurationInterfaces.js';

export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(catalogId: string, productListingId: string, options?: ProductListingConfigurationOptions) {
        const normalizedOptions = normalizePaginatedOptions(options);
        return this.api.get<PageModel<ProductListingConfigurationModel>>(
            this.buildPath(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
                normalizedOptions,
            ),
        );
    }
    create(catalogId: string, productListingId: string, rankingConfiguration: New<ProductListingConfigurationModel>) {
        return this.api.post(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
            rankingConfiguration,
        );
    }

    delete(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.delete(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
        );
    }

    get(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.get<ProductListingConfigurationModel>(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
        );
    }

    update(
        catalogId: string,
        productListingId: string,
        productListingConfigurationId: string,
        rankingConfiguration: New<ProductListingConfigurationModel>,
    ) {
        return this.api.put(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
            rankingConfiguration,
        );
    }
}
