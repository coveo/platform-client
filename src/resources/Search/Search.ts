import API from '../../APICore';
import Ressource from '../Resource';
import {RestTokenParams, TokenModel} from './SearchInterfaces';

export default class Search extends Ressource {
    static baseUrl = `rest/search/v2`;

    createToken(tokenParams: RestTokenParams) {
        return this.api.post<TokenModel>(`${Search.baseUrl}/token?organizationId=${API.orgPlaceholder}`, tokenParams);
    }
}
