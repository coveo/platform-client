import API from '../../APICore';
import Resource from '../Resource';
import {AccessModel} from './AccessInterfaces';

export default class Access extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/access`;

    getApiKeys(params: AccessModel) {
        return this.api.get(this.buildPath(`${Access.baseUrl}/apikeys`, params));
    }

    getGroups(params: AccessModel) {
        return this.api.get(this.buildPath(`${Access.baseUrl}/groups`, params));
    }
}
