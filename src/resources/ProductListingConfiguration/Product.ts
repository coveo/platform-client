import API from "../../APICore.js";
import Resource from "../Resource.js";
import { ListingPreviewRequestModel, PreviewResultModel } from "./ProductInterfaces.js";

export class Products extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}`;

    preview(trackingId: string, previewRequest: ListingPreviewRequestModel) {
        return this.api.post<PreviewResultModel>(
            `${Products.baseUrl}/trackings/${trackingId}/commerce/v2/preview`,
            previewRequest
        );
    }
}
