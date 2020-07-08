import API from '../../APICore';
import Resource from '../Resource';
import {ExtensionModel} from './ExtensionsInterfaces';

export default class Extension extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/extensions`;

    list() {
        return this.api.get<ExtensionModel[]>(Extension.baseUrl);
    }
}
