import {DimensionEventTypes} from '../../../Enums.js';
import {ReadServiceHealthResponse, ReadServiceHealthApi, ReadServiceStatusResponse} from '../ReadServiceCommon.js';
import ReadServiceResource from '../ReadServiceResource.js';
import {
    CreateCustomDimensionParams,
    CustomDimensionModel,
    CustomDimensionSuggestionsModel,
    DimensionModel,
    DimensionValuesModel,
    GetDimensionValuesParams,
    ListDimensionsParams,
    ListUncreatedDimensionsParams,
} from './DimensionsInterfaces.js';

export default class Dimensions extends ReadServiceResource implements ReadServiceHealthApi {
    static baseUrl = '/rest/ua/v15/dimensions';

    /**
     * Get all the dimensions.
     * @param params
     */
    list(params?: ListDimensionsParams) {
        return this.api.get<DimensionModel[]>(this.buildPathWithOrg(Dimensions.baseUrl, params));
    }

    /**
     * Get all the exportable dimensions.
     * @param params
     */
    listExportableDimensions(params?: ListDimensionsParams) {
        return this.api.get<DimensionModel[]>(this.buildPathWithOrg(`${Dimensions.baseUrl}/exportables`, params));
    }

    /**
     * Get a dimension.
     * @param apiName Format must be `EVENT.DIMENSION` where EVENT is the event type and DIMENSION is the name of the dimension.
     */
    get(apiName: string) {
        return this.api.get<DimensionModel>(this.buildPathWithOrg(`${Dimensions.baseUrl}/${apiName}`));
    }

    /**
     * Get the values for a dimension.
     * @param dimension The dimension to fetch.
     * @param params
     */
    getValues(dimension: string, params?: GetDimensionValuesParams) {
        return this.api.get<DimensionValuesModel>(
            this.buildPathWithOrg(`${Dimensions.baseUrl}/${dimension}/values`, params),
        );
    }

    /**
     * Get all the custom dimensions.
     * @param includeOnlyParents This will filter out dimensions which are covered by others.
     * Only parent/master dimensions will be output.
     */
    listCustomDimensions(includeOnlyParents = false) {
        return this.api.get<DimensionModel[]>(
            this.buildPathWithOrg(`${Dimensions.baseUrl}/custom`, {includeOnlyParents}),
        );
    }

    /**
     * Create a custom dimension.
     * @param model
     * @param params
     */
    createCustomDimension(model: CustomDimensionModel, params: CreateCustomDimensionParams) {
        return this.api.post<DimensionModel>(this.buildPathWithOrg(`${Dimensions.baseUrl}/custom`, params), model);
    }

    /**
     * Get a custom dimension.
     * @param apiName Format must be `EVENT.DIMENSION` where EVENT is the event type and DIMENSION is the name of the dimension.
     */
    getCustomDimension(apiName: string) {
        return this.api.get<DimensionModel>(
            this.buildPathWithOrg(`${Dimensions.baseUrl}/custom/${apiName}`, {org: this.api.organizationId}),
        );
    }

    /**
     * Get the values for a custom dimension.
     * @param dimension The dimension to fetch.
     * @param params
     */
    getCustomDimensionValues(dimension: string, params?: GetDimensionValuesParams) {
        return this.api.get<DimensionValuesModel>(
            this.buildPathWithOrg(`${Dimensions.baseUrl}/custom/${dimension}/values`, params),
        );
    }

    /**
     * Create or edit a custom dimension.
     * @param apiName Format must be `EVENT.DIMENSION` where EVENT is the event type and DIMENSION is the name of the dimension.
     * @param model
     * @param updatePastEvents Whether to update the custom dimension in past events (deprecated).
     */
    updateCustomDimension(apiName: string, model: CustomDimensionModel, updatePastEvents = false) {
        return this.api.put<DimensionModel>(
            this.buildPathWithOrg(`${Dimensions.baseUrl}/custom/${apiName}`, {updatePastEvents}),
            model,
        );
    }

    /**
     * Delete a custom dimension.
     * @param apiName Format must be `EVENT.DIMENSION` where EVENT is the event type and DIMENSION is the name of the dimension.
     */
    deleteCustomDimension(apiName: string) {
        return this.api.delete<void>(this.buildPathWithOrg(`${Dimensions.baseUrl}/custom/${apiName}`));
    }

    /**
     * Get the custom dimensions service status.
     */
    getCustomDimensionStatus() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/custom/status`);
    }

    /**
     * Health check for the custom dimensions service.
     */
    checkCustomDimensionHealth() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/custom/monitoring/health`);
    }

    /**
     * Get a list of dimensions that have data but are not created yet.
     * @param event The type of event for which to look for suggestions.
     * @param params
     */
    listUncreatedDimensions(event: DimensionEventTypes, params?: ListUncreatedDimensionsParams) {
        return this.api.get<CustomDimensionSuggestionsModel>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${event}/suggestions`, {
                ...params,
                org: this.api.organizationId,
            }),
        );
    }

    checkHealth() {
        return this.api.get<ReadServiceHealthResponse>(`${Dimensions.baseUrl}/monitoring/health`);
    }

    checkStatus() {
        return this.api.get<ReadServiceStatusResponse>(`${Dimensions.baseUrl}/status`);
    }
}
