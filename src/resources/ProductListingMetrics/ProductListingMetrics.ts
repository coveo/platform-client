import API from "../../APICore.js";
import Resource from "../Resource.js";
import { ProductListingMetricsModel, ProductListingMetricsOptions } from "./ProductListingMetricsInterfaces.js";

export class ProductListingMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/v2/listings/metrics`;

    list(options?: ProductListingMetricsOptions): Promise<ProductListingMetricsModel> {
        return this.api.get<ProductListingMetricsModel>(this.buildPath(`${ProductListingMetrics.baseUrl}`, options));
    }
}
