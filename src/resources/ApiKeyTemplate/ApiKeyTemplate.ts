import Resource from "../Resource.js";
import { ApiKeyTemplateModel } from "./ApiKeyTemplateInterface.js";

export default class ApiKeyTemplate extends Resource {
    static baseUrl = '/rest/templates/apikeys'

    get(apiKeyTemplateId:string) {
        return this.api.get<ApiKeyTemplateModel[]>(`${ApiKeyTemplate.baseUrl}/${apiKeyTemplateId}`)
    }
}