import Resource from '../Resource.js';
import API from '../../APICore.js';

export default class Links extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/links`;

    deleteAll() {
        return this.api.delete(Links.baseUrl);
    }
}
