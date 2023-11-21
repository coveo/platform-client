import API from '../../APICore.js';
import {New} from '../BaseInterfaces.js';
import {ListingPreviewRequestModel} from '../ProductListingConfiguration/ProductInterfaces.js';
import Resource from '../Resource.js';
import {PreviewResultModel, ProductsRequestModel, ProductsResultModel} from './ProductInterfaces.js';

export default class Products extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/v1/products`;

    get(productsRequest: New<ProductsRequestModel>, refreshCache = false) {
        return this.api.post<ProductsResultModel>(
            this.buildPath(`${Products.baseUrl}/listing`, {refreshCache: refreshCache}),
            productsRequest,
        );
    }

    preview(trackingId: string, previewRequest: ListingPreviewRequestModel) {
        return this.api.post<PreviewResultModel>(
            `${Products.baseUrl}/trackings/${trackingId}/commerce/v2/preview`,
            previewRequest,
        );
    }
}
