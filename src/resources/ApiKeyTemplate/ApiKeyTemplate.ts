import Resource from "../Resource.js";
import { ApiKeyTemplateModel } from "./ApiKeyTemplateInterface.js";

export default class ApiKeyTemplate extends Resource {
    static baseUrl = '/rest/templates/apikeys/'

    purpose() {
        return this.api.get<ApiKeyTemplateModel[]>(`${ApiKeyTemplate.baseUrl}keyPurpose`)
    }
}