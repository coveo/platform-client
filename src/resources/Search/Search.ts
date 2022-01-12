import API from '../../APICore';
import Ressource from '../Resource';
import {RestQueryParams, RestTokenParams, TokenModel} from './SearchInterfaces';

export default class Search extends Ressource {
    static baseUrl = `/rest/search/v2`;

    createToken(tokenParams: RestTokenParams) {
        return this.api.post<TokenModel>(`${Search.baseUrl}/token?organizationId=${API.orgPlaceholder}`, tokenParams);
    }

    // For more info about restQueryParameters values available
    // See: https://platform.cloud.coveo.com/docs?api=SearchApi#!/Search/post_rest_search_v2
    // or : https://docs.coveo.com/en/13/cloud-v2-api-reference/search-api#operation/searchUsingGet
    query(restQueryParameters: RestQueryParams) {
        const {viewAllContent, ...bodyParameters} = restQueryParameters;

        return this.api.post<any>(
            this.buildPath(Search.baseUrl, {
                organizationId: this.api.organizationId,
                viewAllContent: viewAllContent ? 1 : undefined,
            }),
            bodyParameters
        );
    }
}
