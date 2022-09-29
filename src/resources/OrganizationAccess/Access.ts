import API from '../../APICore';
import Resource from '../Resource';
import {AccessModel, AccessParams} from './AccessInterfaces';

export default class Access extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/access`;

    getApiKeys(params: AccessParams) {
        return this.api.get<AccessModel[]>(this.buildPath(`${Access.baseUrl}/apikeys`, params));
    }

    getGroups(params: AccessParams) {
        return this.api.get<AccessModel[]>(this.buildPath(`${Access.baseUrl}/groups`, params));
    }
}
