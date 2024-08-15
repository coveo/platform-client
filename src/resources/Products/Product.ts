import API from '../../APICore.js';
import {New} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {ProductsRequestModel, ProductsResultModel} from './ProductInterfaces.js';

export default class Products extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/v1/products`;

    /**
     * @deprecated
     */
    get(productsRequest: New<ProductsRequestModel>, refreshCache = false) {
        return this.api.post<ProductsResultModel>(
            this.buildPath(`${Products.baseUrl}/listing`, {refreshCache: refreshCache}),
            productsRequest,
        );
    }
}
