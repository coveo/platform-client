import API from '../../APICore';
import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {ProductsRequestModel, ProductsResultModel} from './ProductInterfaces';

export default class Products extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/v1/products`;

    get(productsRequest: New<ProductsRequestModel>, refreshCache = false) {
        return this.api.post<ProductsResultModel>(
            this.buildPath(`${Products.baseUrl}/listing`, {refreshCache: refreshCache}),
            productsRequest
        );
    }
}
