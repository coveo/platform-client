import API from '../../APICore.js';
import {normalizePaginatedOptions} from '../../utils/normalizePaginatedOptions.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    ProductListingConfigurationModel,
    ProductListingConfigurationOptions,
} from './ProductListingConfigurationInterfaces.js';

/**
 * @deprecated
 */
export default class ProductListingConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    /**
     * @param catalogId
     * @param productListingId
     * @param options
     * @deprecated
     */
    list(catalogId: string, productListingId: string, options?: ProductListingConfigurationOptions) {
        const normalizedOptions = normalizePaginatedOptions(options);
        return this.api.get<PageModel<ProductListingConfigurationModel>>(
            this.buildPath(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
                normalizedOptions,
            ),
        );
    }

    /**
     * @param catalogId
     * @param productListingId
     * @param rankingConfiguration
     * @deprecated
     */
    create(catalogId: string, productListingId: string, rankingConfiguration: New<ProductListingConfigurationModel>) {
        return this.api.post(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
            rankingConfiguration,
        );
    }

    /**
     * @param catalogId
     * @param productListingId
     * @param productListingConfigurationId
     * @deprecated
     */
    delete(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.delete(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
        );
    }

    /**
     * @param catalogId
     * @param productListingId
     * @param productListingConfigurationId
     * @deprecated
     */
    get(catalogId: string, productListingId: string, productListingConfigurationId: string) {
        return this.api.get<ProductListingConfigurationModel>(
            `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationId}`,
        );
    }

    /**
     * @param catalogId
     * @param productListingId
     * @param productListingConfigurationId
     * @param rankingConfiguration
     * @deprecated
     */
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
