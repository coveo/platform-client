import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    ItemPreviewHtmlParameters,
    ListFieldValuesResponse,
    RestFacetSearchParameters,
    RestFacetSearchResponse,
    RestQueryParams,
    RestQueryResult,
    RestTokenParams,
    SearchListFieldsParams,
    SearchListFieldsResponse,
    SearchResponse,
    SingleItemParameters,
    TokenModel,
} from './SearchInterfaces.js';
import {ListFieldValuesBodyQueryParams, PostSearchQuerySuggestBodyParams} from './index.js';

export default class Search extends Resource {
    static baseUrl = `/rest/search/v2`;

    createToken(tokenParams: RestTokenParams) {
        return this.api.post<TokenModel>(`${Search.baseUrl}/token?organizationId=${API.orgPlaceholder}`, tokenParams);
    }

    listFields(params?: SearchListFieldsParams) {
        return this.api.get<SearchListFieldsResponse>(
            this.buildPath(
                `${Search.baseUrl}/fields`,
                {
                    ...params,
                    organizationId: params?.organizationId ?? this.api.organizationId,
                },
                {skipEmptyString: false}, // otherwise we cannot use the empty pipeline (`pipeline=`)
            ),
        );
    }

    getFieldValues(fieldName: string, params?: ListFieldValuesBodyQueryParams) {
        return this.api.get<ListFieldValuesResponse>(
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.api.post<any>(
            this.buildPath(`${Search.baseUrl}/querySuggest`, {
                organizationId: this.api.organizationId,
            }),
            restQuerySuggestParameters,
        );
    }

    /**
     * Get an item's preview in HTML format
     * @param root0
     * @param root0.enableNavigation
     * @param root0.findNext
     * @param root0.findPrevious
     * @param root0.organizationId
     * @param root0.page
     * @param root0.requestedOutputSize
     * @param root0.uniqueId
     * @param root0.viewAllContent
     */
    previewHTML({
        enableNavigation,
        findNext,
        findPrevious,
        organizationId,
        page,
        requestedOutputSize,
        uniqueId,
        viewAllContent,
        ...body
    }: ItemPreviewHtmlParameters) {
        return this.api.post<string>(
            this.buildPath(`${Search.baseUrl}/html`, {
                enableNavigation,
                findNext,
                findPrevious,
                page,
                requestedOutputSize,
                uniqueId,
                viewAllContent,
                organizationId: organizationId ?? this.api.organizationId,
            }),
            body,
            {responseBodyFormat: 'text'},
        );
    }

    /**
     * Get item in JSON format
     * @param params
     */
    getDocument(params: SingleItemParameters) {
        return this.api.get<RestQueryResult>(
            this.buildPath(
                `${Search.baseUrl}/document`,
                {
                    ...params,
                    organizationId: params.organizationId ?? this.api.organizationId,
                },
                {skipEmptyString: false}, // otherwise we cannot use the empty pipeline (`pipeline=`)
            ),
        );
    }

    /**
     * Executes a facet search request.
     * @param params
     */
    searchFacet(params: RestFacetSearchParameters) {
        const {viewAllContent, organizationId, ...bodyParameters} = params;

        return this.api.post<RestFacetSearchResponse>(
            this.buildPath(`${Search.baseUrl}/facet`, {
                organizationId: organizationId ?? this.api.organizationId,
                viewAllContent,
            }),
            bodyParameters,
        );
    }
}
