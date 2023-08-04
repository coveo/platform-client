import {ListFieldValuesBodyQueryParams, PostSearchQuerySuggestBodyParams} from './index.js';
import API from '../../APICore.js';
import Ressource from '../Resource.js';
import {
    SingleItemParameters,
    ItemPreviewHtmlParameters,
    RestQueryParams,
    RestQueryResult,
    RestTokenParams,
    SearchListFieldsParams,
    SearchListFieldsResponse,
    SearchResponse,
    TokenModel,
} from './SearchInterfaces.js';

export default class Search extends Ressource {
    static baseUrl = `/rest/search/v2`;

    createToken(tokenParams: RestTokenParams) {
        return this.api.post<TokenModel>(`${Search.baseUrl}/token?organizationId=${API.orgPlaceholder}`, tokenParams);
    }

    listFields(params?: SearchListFieldsParams) {
        return this.api.get<SearchListFieldsResponse>(
            this.buildPath(`${Search.baseUrl}/fields`, {
                ...params,
                organizationId: params?.organizationId ?? this.api.organizationId,
            }),
        );
    }

    getFieldValues(fieldName: string, params?: ListFieldValuesBodyQueryParams) {
        return this.api.get<any>(
            this.buildPath(`${Search.baseUrl}/values`, {
                field: encodeURI(`${fieldName}`),
                ...params,
                organizationId: params?.organizationId ?? this.api.organizationId,
            }),
        );
    }

    // For more info about restQueryParameters values available
    // See: https://platform.cloud.coveo.com/docs?api=SearchApi#!/Search/post_rest_search_v2
    // or : https://docs.coveo.com/en/13/cloud-v2-api-reference/search-api#operation/searchUsingGet
    query(restQueryParameters: RestQueryParams) {
        const {viewAllContent, ...bodyParameters} = restQueryParameters;

        return this.api.post<SearchResponse>(
            this.buildPath(Search.baseUrl, {
                organizationId: this.api.organizationId,
                viewAllContent: viewAllContent ? 1 : undefined,
            }),
            bodyParameters,
        );
    }

    /**
     * Exports search results to a Microsoft Excel™ spreadsheet
     *
     * @param restQueryParameters Parameters of the query
     * @returns A .xlsx file containing the search results of the specified query
     */
    exportQuery(restQueryParameters: RestQueryParams) {
        const {viewAllContent, ...bodyParameters} = restQueryParameters;

        return this.api.post<Blob>(
            this.buildPath(Search.baseUrl, {
                organizationId: this.api.organizationId,
                viewAllContent: viewAllContent ? 1 : undefined,
            }),
            {...bodyParameters, format: 'xlsx'},
            {responseBodyFormat: 'blob'},
        );
    }

    querySuggestPost(restQuerySuggestParameters: PostSearchQuerySuggestBodyParams) {
        return this.api.post<any>(
            this.buildPath(`${Search.baseUrl}/querySuggest`, {
                organizationId: this.api.organizationId,
            }),
            restQuerySuggestParameters,
        );
    }

    /**
     * Get an item's preview in HTML format
     */
    previewHTML(params: ItemPreviewHtmlParameters) {
        return this.api.get<string>(
            this.buildPath(`${Search.baseUrl}/html`, {
                ...params,
                organizationId: params.organizationId ?? this.api.organizationId,
            }),
            {responseBodyFormat: 'text'},
        );
    }

    /**
     * Get item in JSON format
     */
    getDocument(params: SingleItemParameters) {
        return this.api.get<RestQueryResult>(
            this.buildPath(`${Search.baseUrl}/document`, {
                ...params,
                organizationId: params.organizationId ?? this.api.organizationId,
            }),
        );
    }
}
