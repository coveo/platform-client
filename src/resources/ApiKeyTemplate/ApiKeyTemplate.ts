import API from '../../APICore.js';
import Resource from '../Resource.js';
import {ApiKeyTemplateEligibilityResponseModel, ApiKeyTemplateModel} from './ApiKeyTemplateInterface.js';

export default class ApiKeyTemplate extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/templates/apikeys`;

    get(apiKeyTemplateId: string) {
        return this.api.get<ApiKeyTemplateModel>(`${ApiKeyTemplate.baseUrl}/${apiKeyTemplateId}`);
    }

    listAPIKeysEligibility() {
        return this.api.get<ApiKeyTemplateEligibilityResponseModel[]>(
            `${ApiKeyTemplate.baseUrl}/privileges/eligibility`,
        );
    }
}
