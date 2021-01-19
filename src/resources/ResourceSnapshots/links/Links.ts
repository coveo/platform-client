import Resource from '../../Resource';
import API from '../../../APICore';

export default class Links extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/links`;

    deleteAll() {
        return this.api.delete(Links.baseUrl);
    }
}
