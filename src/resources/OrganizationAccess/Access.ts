import API from '../../APICore.js';
import Resource from '../Resource.js';
import {AccessModel, AccessParams} from './AccessInterfaces.js';

export default class Access extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/access`;

    getApiKeys(params: AccessParams) {
        return this.api.get<AccessModel[]>(this.buildPath(`${Access.baseUrl}/apikeys`, params));
    }

    getGroups(params: AccessParams) {
        return this.api.get<AccessModel[]>(this.buildPath(`${Access.baseUrl}/groups`, params));
    }
}
