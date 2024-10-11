import API from '../../APICore.js';
import {normalizePaginatedOptions} from '../../utils/normalizePaginatedOptions.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    ProductListingsListOptions,
    ProductListingModel,
    CatalogProductListingsGroupModel,
} from './ProductListingInterfaces.js';

/**
 * @deprecated
 */
export default class ProductListing extends Resource {
    static baseCatalogsUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;
    static baseProductListingsUrl = `/rest/organizations/${API.orgPlaceholder}/productlistings`;

    /**
     * @param catalogId
     * @param options
     * @deprecated
     */
    list(catalogId: string, options?: ProductListingsListOptions) {
        const normalizedOptions = normalizePaginatedOptions(options);
        return this.api.get<PageModel<ProductListingModel>>(
            this.buildPath(`${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings`, normalizedOptions),
        );
    }

    /**
     * @param catalogId
     * @param model
     * @deprecated
     */
    create(catalogId: string, model: New<ProductListingModel>) {
        return this.api.post<ProductListingModel>(
            `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings`,
            model,
        );
    }

    /**
     * @param catalogId
     * @param productListingId
     * @deprecated
     */
    delete(catalogId: string, productListingId: string) {
        return this.api.delete(`${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingId}`);
    }

    /**
     * @param catalogId
     * @param productListingId
     * @deprecated
     */
    get(catalogId: string, productListingId: string) {
        return this.api.get<ProductListingModel>(
            `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingId}`,
        );
    }

    /**
     * @param catalogId
     * @param model
     * @deprecated
     */
    update(catalogId: string, model: ProductListingModel) {
        return this.api.put<ProductListingModel>(
            `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${model.id}`,
            model,
        );
    }

    /**
     * @deprecated
     */
    getByCatalog() {
        return this.api.get<PageModel<CatalogProductListingsGroupModel>>(
            `${ProductListing.baseProductListingsUrl}/catalogs`,
        );
    }

    /**
     * @deprecated
     */
    getUrls() {
        return this.api.get<string[]>(`${ProductListing.baseProductListingsUrl}/urls`);
    }
}
