import API from "../../APICore.js";
import Resource from "../Resource.js";
import { ProductListingReportingMetricsOptions, ProductListingReportingMetricsModel } from "./ProductListingReportingMetricsInterfaces.js";

export class ProductListingReportingMetrics extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/commerce/reports/v1`;

    get(productListingId: string, options?: ProductListingReportingMetricsOptions) {
        return this.api.get<ProductListingReportingMetricsModel>(
            this.buildPath(`${ProductListingReportingMetrics.baseUrl}/productListings/${productListingId}`, options)
        );
    }
}
