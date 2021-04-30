import {DimensionEventTypes} from '../../../Enums';
import Resource from '../../../Resource';
import {
    CreateCustomDimensionParams,
    CustomDimensionModel,
    CustomDimensionSuggestionModel,
    DimensionModel,
    DimensionValuesModel,
    GetDimensionValuesParams,
    ListDimensionsParams,
    ListUncreatedDimensionsParams,
} from './DimensionsInterfaces';

export default class Dimensions extends Resource {
    static baseUrl = '/rest/ua/v15/dimensions';

    list(params?: ListDimensionsParams) {
        return this.api.get<DimensionModel[]>(
            this.buildPath(Dimensions.baseUrl, {...params, org: this.api.organizationId})
        );
    }

    listExportableDimensions(params?: ListDimensionsParams) {
        return this.api.get<DimensionModel[]>(
            this.buildPath(`${Dimensions.baseUrl}/exportables`, {...params, org: this.api.organizationId})
        );
    }

    get(apiName: string) {
        return this.api.get<DimensionModel>(
            this.buildPath(`${Dimensions.baseUrl}/${apiName}`, {org: this.api.organizationId})
        );
    }

    getValues(dimension: string, params?: GetDimensionValuesParams) {
        return this.api.get<DimensionValuesModel>(
            this.buildPath(`${Dimensions.baseUrl}/${dimension}/values`, {...params, org: this.api.organizationId})
        );
    }

    getStatus() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/status`);
    }

    checkHealth() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/monitoring/health`);
    }

    listCustomDimensions(includeOnlyParents = false) {
        return this.api.get<DimensionModel[]>(
            this.buildPath(`${Dimensions.baseUrl}/custom`, {includeOnlyParents, org: this.api.organizationId})
        );
    }

    createCustomDimension(model: CustomDimensionModel, params: CreateCustomDimensionParams) {
        return this.api.post<DimensionModel>(
            this.buildPath(`${Dimensions.baseUrl}/custom`, {...params, org: this.api.organizationId}),
            model
        );
    }

    getCustomDimension(apiName: string) {
        return this.api.get<DimensionModel>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${apiName}`, {org: this.api.organizationId})
        );
    }

    getCustomDimensionValues(dimension: string, params?: GetDimensionValuesParams) {
        return this.api.get<DimensionValuesModel>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${dimension}/values`, {
                ...params,
                org: this.api.organizationId,
            })
        );
    }

    updateCustomDimension(apiName: string, model: CustomDimensionModel, updatePastEvents = false) {
        return this.api.put<DimensionModel>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${apiName}`, {updatePastEvents, org: this.api.organizationId}),
            model
        );
    }

    deleteCustomDimension(apiName: string) {
        return this.api.delete<void>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${apiName}`, {org: this.api.organizationId})
        );
    }

    getCustomDimensionStatus() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/custom/status`);
    }

    checkCustomDimensionHealth() {
        return this.api.get<Record<string, string>>(`${Dimensions.baseUrl}/custom/monitoring/health`);
    }

    listUncreatedDimensions(event: DimensionEventTypes, params?: ListUncreatedDimensionsParams) {
        return this.api.get<CustomDimensionSuggestionModel[]>(
            this.buildPath(`${Dimensions.baseUrl}/custom/${event}/suggestions`, {
                ...params,
                org: this.api.organizationId,
            })
        );
    }
}
