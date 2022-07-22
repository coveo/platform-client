import {RestUserIdType} from '../Enums';

export interface RestTokenParams {
    userIds: RestUserId[];
    userGroups?: string[];
    userDisplayName?: string;
    canSeeUserProfileOf?: string[];
    pipeline?: string;
    filter?: string;
    searchHub?: string;
    salesforceOrganizationId?: string;
    validFor?: number;
    salesforceUser?: string;
    salesforceCommunityUrl?: string;
    salesforceFallbackToAdmin?: boolean;
    usertype?: string; // this is really usertype and not userType
    licenseDefinitionKey?: string;
    superUserToken?: string;
    commerce?: RestCommerceParameters;
    scope?: number; // Deprecated: This property is exposed for backward compatibility reasons only.
}

export interface RestUserId {
    name: string;
    provider: string;
    type?: RestUserIdType;
    infos?: any;
    authCookie?: string;
    password?: string; // Deprecated: This property is exposed for backward compatibility reasons only.
}

export interface RestCommerceParameters {
    catalogId: string;
    filter: string;
    operation: string;
}

export interface TokenModel {
    token: string;
}

export type RestQueryParams = PostSearchBodyQueryParams & PostSearchQueryStringParams;

export interface PostSearchQueryStringParams {
    viewAllContent?: boolean | number;
}

/**
 * Defines the body parameters of the list field values request.
 */

export interface ListFieldValuesBodyQueryParams {
    /**
     * The unique identifier of the target Coveo Cloud organization.
     * Specifying a value for this parameter is only necessary when you are authenticating the API call with an OAuth2 token.
     */
    organizationId?: string;

    /**
     * Whether to treat accentuated characters as non-accentuated characters when retrieving field values (e.g., treat é, è, ê, etc., as e).
     *
     * Default: true
     */
    ignoreAccents?: boolean;

    /**
     * The sort criteria to use.
     *
     * Use:
     * - occurrences: to sort by number of occurrences, with field values having the highest number of occurrences appearing first.
     * - nosort: to avoid sorting the results of the Group By operation. The field values will appear in an unspecified order.
     *
     * @default `occurrences`
     */
    sortCriteria?: string;

    /**
     * The maximum number of values to return.
     *
     * @default `10`
     */
    maximumNumberOfValues?: number;

    /**
     * The query expression that should override the basic query expression on which the Group By operation is being performed (see the `q` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `Coveo Cloud V2 Platform`
     */
    queryOverride?: string;

    /**
     * The query expression that should override the constant query expression on which the Group By operation is being performed (see the `cq` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `@filetype==forumpost`
     */
    constantQueryOverride?: string;

    /**
     * The query expression that should override the disjunction query expression on which the Group By operation is being performed (see the `dq` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `@date=2016-12-01..2016-12-31`
     */
    disjunctionQueryOverride?: string;

    /**
     * The pattern that the field values must match.
     *
     * See also the patternType parameter."
     */
    pattern?: string;

    /**
     * The type of pattern that is being used to list field values.
     *
     * Use:
     * - wildcard: to parse the specified pattern as a wildcard expression.
     * - regularexpression: to parse the specified pattern as a regular expression.
     * - editdistance: to apply the Edit Distance algorithm to match values that are close to the specified pattern.
     * - phonetic to apply a phonetic algorithm to match values that are phonetically similar to the specified pattern.
     *
     * @default `wildcard`
     */
    patternType?: string;

    /**
     * The parameters for Coveo for Commerce.
     */
    commerce?: RestCommerceParameters;

    /**
     * A key-value store where each pair corresponds to the name of a dictionary field to query, along with the key to target within that field.
     *
     * @example
     * Suppose that in your index, the `@price` dictionary field contains different values for its `storeA` and `storeB` keys. Including `"dictionaryFieldContext": { "price": "storeA" }` in the query means that any part of the query expression that targets the `@price` field will in fact only query the `storeA` values of that field.
     */
    dictionaryFieldContext?: RestDictionaryFieldContextRequest;

    /**
     * The name of the query pipeline to use for this request (bypassing its conditions, if it has any).
     *
     * You can pass an empty `pipeline` value to use an empty query pipeline (i.e., `?pipeline=` or `"pipeline": ""`).
     *
     * If a query does not contain the `pipeline` parameter, the first query pipeline whose conditions are met by the request is used (query pipelines without conditions are not evaluated). Should the request fail to meet the conditions of each evaluated query pipeline, the default query pipeline of the target Coveo Cloud organization is used (bypassing its conditions, if it has any).
     *
     * **Notes:**
     * - This parameter will be overridden if the search request is authenticated by a search token that enforces a specific `pipeline`, or a `searchHub` that routes queries to a specific `pipeline` via a query pipeline condition.
     * - For reporting purposes, when logging a **Search** usage analytics event for a query, the `queryPipeline` field of that event should be set to the `pipeline` value of the query (or to the `"default"` string, if no `pipeline` value was specified in the query).
     *
     * See also [Managing Query Pipelines](https://docs.coveo.com/en/1450/).
     *
     * @example `CustomerQueryPipeline`
     */
    pipeline?: string;

    /**
     * The maximum age of cached results, in milliseconds.
     *
     * If the results of a specific request are available in the cache, and if those results are no older than the `maximumAge` value, the service returns those results rather than forwarding a new query to the index.
     *
     * **Note:** This parameter is automatically overridden when `staticQuery` is set to `true`.
     *
     * @default `-1` (which corresponds to the internal default value (15 minutes))
     */
    maximumAge?: number;

    /**
     * The first level of origin of the request, typically the identifier of the graphical search interface from which the request originates.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output.
     *
     * **Notes:**
     * - This parameter will be overridden if the search request is authenticated by a search token that enforces a specific `searchHub`.
     * - When logging a **Search** usage analytics event for a query, the `originLevel1` field of that event should be set to the value of the `searchHub` search request parameter.
     *
     * See also the `tab` parameter.
     *
     * @example `CustomerPortal`
     */
    searchHub?: string;

    /**
     * The second level of origin of the request, typically the identifier of the selected tab in the graphical search interface from which the request originates.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `originLevel2` field of that event should be set to the `tab` value of the query (or to the `"default"` string, if no `tab` value was specified in the query).
     *
     * See also the `searchHub` parameter.
     *
     * @example `ForumTab`
     */
    tab?: string;

    /**
     * The third level of origin of the request, typically the URL of the page that linked to the search interface from which the request originates (e.g., in JavaScript, this would correspond to the `document.referrer` value).
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `originLevel3` field of that event should be set to the `referrer` value of the query, if specified.
     *
     * See also the `context` parameter.
     *
     * @example `http://www.example.com`
     */
    referrer?: string;

    /**
     * The custom context information to send along with the request. Must be a dictionary of key-value pairs (JSON) where each key is a string, and each value is either a string or an array of strings.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output. Moreover, this information can be referred to in query expressions and QPL statements by using the `$context` object.
     *
     * **Note:**
     * When logging a **Search** usage analytics event for a query, the `customData` field of that event should include the same data as the `context` parameter of the query. However, each `context` key included in `customData` must be prefixed by `context_` (e.g., the `userRoles` key in `context` becomes `context_userRoles` in `customData`).
     *
     * See also the `referrer` parameter.
     *
     * @example
     * ```json
     * {
     *   "userAgeRange":"25-35",
     *   "userRoles": ["PremiumCustomer", "ProductReviewer"]
     * }
     * ```
     */
    context?: RestContextRequest;

    /**
     * The query and page view actions previously made by the current user.
     *
     * Coveo Machine Learning content recommendations models use this information to provide contextually relevant output.
     *
     * @type {RestActionHistory[]}
     */
    actionsHistory?: RestActionHistory[];

    /**
     * The identifier of the recommendation interface from which the request originates.
     *
     * Coveo Machine Learning content recommendations models may use this information to provide contextually relevant output.
     *
     * @example `RecommendedProducts`
     */
    recommendation?: string;

    /**
     * The locale of the current user. Must comply with IETF’s [BCP 47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt) definition.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output. Moreover, this information can be referred to in query expressions and QPL statements by using the `$locale` object.
     *
     * **Note:** When logging a **Search** usage analytics event, the language field of that event should match the language part of the `locale` value of the query (e.g., `en-US` in `locale` becomes `en` in `language`).
     *
     * @example `en-US`
     */
    locale?: string;

    /**
     * The [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) identifier of the time zone to use to correctly interpret dates in the query expression and result items.
     *
     * If not specified, the default time zone of the server hosting the index is used.
     *
     * **Note:** While no Coveo Machine Learning model uses this information, it can nevertheless affect the ranking scores (and thus, potentially the order) of result items, as ranking expressions may be based on time constants.
     *
     * @example `America/New_York`
     */
    timezone?: string;

    /**
     * The format of a successful response.
     *
     * - Use `json` to get the response in the JSON format.
     * - Use `opensearch-atom` or `opensearch-rss` to get the results in an OpenSearch format (XML).
     * - Use `xlsx` to generate an Excel file containing the results (binary).
     *
     * **Note:** Debug information (see the `debug` parameter) can only appear in a response in the JSON format.
     *
     * @default `json`
     */
    format?: RestFormat;

    /**
     * Whether to force a successful response to include debug information.
     *
     * **Notes:**
     * - Debug information can only appear in responses in the JSON format (see the `format` parameter).
     * - Avoid setting this parameter to `true` in production, as it has a negative impact on query performance.
     *
     * @default `false`
     */
    debug?: boolean;

    /**
     * The Base64 encoded identifier of the index mirror to forward the request to. See also the `index` parameter.
     *
     * If you do not specify an `indexToken` (or `index`) value, any index mirror could be used.
     *
     * **Note:** Passing an `indexToken` (or `index`) value has no effect when the results of a specific request can be returned from cache (see the `maximumAge` parameter).
     *
     * @example `ZXhhbXBsZWluZGV4bWlycm9yLS4uLg==`
     */
    indexToken?: string;

    /**
     * A GUID representing the current user, who can be authenticated or anonymous. This GUID is normally generated by the usage analytics service and stored in a non-expiring browser cookie.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * @example `5cb98953-9c13-42ff-8176-e6fcba6a50bf`
     */
    visitorId?: string;

    /**
     * Whether the current user is anonymous.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the anonymous field of that event should be set to the `isGuestUser` value of the query.
     *
     * @default `false`
     */
    isGuestUser?: boolean;

    /**
     * A map of options to pass to the Coveo ML models associated with the request’s target query pipeline.
     *
     * **Available parameters:**
     * - `considerUserContext` (boolean): Whether the models should attempt to leverage the `context` object of the request to personalize their output. Applies to CR models only. Default is `true`.
     * - `maxActionsHistoryItemsToConsider` (unsigned integer): The maximum number of items in the `actionsHistory` array of the request that should be taken into account by the models. Applies to CR models only. By default, all `actionsHistory` items are considered.
     * - `num` (unsigned integer):  The maximum number of recommendations/suggestions to request from the models. Must be in range `[1, 50]`, if specified. Applies to ART, CR, and QS models. Default depends on model configuration.
     * - `padding` (string enum): The kind of padding the models should complete their output with, if their maximum number of recommendations/suggestions (i.e., `num`) has not been reached. Applies to CR models only. Allowed values are popular (i.e., pad recommendations with all time most popular items) and trending (i.e., pad recommendations with items that have recently been increasingly popular). By default, no padding applies.
     * - `wordSelection` (string): The ITD keyword selection options the models should use. Applies only to ART models with ITD enabled. If specified, must be a string in the format `option:value`. The only available option is `wordsKept` (i.e., the maximum number of `lq` keywords to inject in `q`); its default value is `5`.
     * - `minNumberOfWords` (unsigned integer): The minimum number of words a query suggestion may contain to be returned by the model. Applies to QS models only. Must be in range `[1, 10]` Default is `1`, which implies that the model will return all candidates.
     * - `itemId` (string): The unique identifier (e.g., SKU) of a product to get recommendations for. Only applies when querying a Product Recommendations model with an association strategy considering a single item as an input.
     * - `itemIds` (array of strings): The unique identifiers (e.g., SKUs) of the products to get recommendations for. Only applies when querying a Product Recommendations model with an association strategy considering multiple items as an input.
     * - `categoryFilter` (string): The name of a category of products to get recommendations for.
     * - `brandFilter` (string): The name of a brand of products to get recommendations for.
     * - `filters` (map of strings): The dimensions along with the values to be used at query time by the model as filters for potential suggestions. Only applies to Automatic relevance Tuning, Query Suggestions, or Dynamic Navigation Experience models that don’t use the default `filterFields` advanced parameter values. **Example:** `"filters": { "originContext": "<MY-VALUE>", "originLevel2": "<MY-VALUE>" }`.
     *
     * @example
     * ```json
     * {
     *   "num": 3,
     *   "padding": "trending",
     *   "maxActionsHistoryItemsToConsider": 10,
     *   "considerUserContext": false
     * }
     * ```
     *
     * @example
     * ```json
     * {"wordSelection": "wordsKept:4"}
     * ```
     */
    mlParameters?: Record<string, any>;

    /**
     * The type of index against which to execute the query. Must correspond to an index that has been configured for the target Coveo Cloud organization.
     *
     * @default `coveo`
     */
    indexType?: string;

    /**
     * The identifier of the index mirror to forward the request to. See also the `indexToken` parameter.
     *
     * If you do not specify an `index` (or `indexToken`) value, any index mirror could be used.
     *
     * **Note:** Passing an `index` (or `indexToken`) value has no effect when the results of a specific request can be returned from cache (see the `maximumAge` parameter).
     *
     * @example `myorg-nvoqun-Indexer1-pbi2nbuw`
     */
    index?: string;

    /**
     * The identifier for a logical group of indexes that have been configured to include documents form the same sources.
     *
     * If you do not specify a `logicalIndex` value, the `default` grouping will be used, typically including all indexes.
     *
     * @example `webcontentonly`
     */
    logicalIndex?: string;

    /**
     * The maximum number of milliseconds to allow the request to last before timing out. Maximum: 16000
     * Coveo determines the most appropriate timeout to use.
     *
     * @default: `0`
     */
    maximumTimeoutMs?: string;

    /**
     * Contextual information about the user performing the request and the request itself.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * Available parameters:
     * - `userId` (string): The ID of the logged user. If not present, the id is obtained from the authentication token.
     * - `clientId` (string): A GUID representing the client id. The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     * - `deviceId` (string): The name of the device that the end user is using. It has to be explicitly passed from native mobile apps. The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     * - `documentLocation` (string): The URL of the current page or component. If not present, the referrer is obtained from the [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header. This information can be obtained from `coveo.analytics.js`.
     * - `documentReferrer` (string): Typically the URL of the page that linked to the search interface from which the request originates (e.g., in JavaScript, this would correspond to the document.referrer value). This information can be obtained from `coveo.analytics.js`.
     * - `pageId` (string): A GUID representing the page ID. This information can be obtained from `coveo.analytics.js`.
     * - `userIp` (string): The user IP. If not present, the IP is obtained from the [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) and [Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) headers. This information is required when endpoints are behind a proxy.
     * - `clientRequestId` (string): A GUID generated by the client representing the current request. This information is used to identify operations across different apis related to the same request.
     * - `clientTimestamp` (string): Client ISO 8601 timestamp with milliseconds.
     * - `userAgent` (string): The user agent of the request. If not present, the user agent is obtained from the [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header. This information is required when endpoints are behind a proxy.
     *
     * @example
     * ```json
     * {
     *   "userId": "user@email.com",
     *   "clientId": "6d148f06-5f15-4639-81b4-792a9b94eb5f",
     *   "deviceId": "Chrome"
     * }
     * ```
     *
     * @example
     * ```json
     * {
     *   "clientTimestamp": "2020-09-09T19:00:45.603-04:00",
     *   "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
     * }
     * ```
     */
    analytics?: RestAnalyticsRequest;

    /**
     * Whether to bypass document permissions. Only effective if the access token grants the Search - View all content privilege.
     */
    viewAllContent?: boolean;
}

/**
 * Defines the body parameters of the search request.
 */
export interface PostSearchBodyQueryParams {
    /**
     * The query and page view actions previously made by the current user.
     *
     * Coveo Machine Learning content recommendations models use this information to provide contextually relevant output.
     *
     * @type {RestActionHistory[]}
     */
    actionsHistory?: RestActionHistory[];

    /**
     * Contextual information about the user performing the request and the request itself.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * Available parameters:
     * - `userId` (string): The ID of the logged user. If not present, the id is obtained from the authentication token.
     * - `clientId` (string): A GUID representing the client id. The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     * - `deviceId` (string): The name of the device that the end user is using. It has to be explicitly passed from native mobile apps. The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     * - `documentLocation` (string): The URL of the current page or component. If not present, the referrer is obtained from the [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header. This information can be obtained from `coveo.analytics.js`.
     * - `documentReferrer` (string): Typically the URL of the page that linked to the search interface from which the request originates (e.g., in JavaScript, this would correspond to the document.referrer value). This information can be obtained from `coveo.analytics.js`.
     * - `pageId` (string): A GUID representing the page ID. This information can be obtained from `coveo.analytics.js`.
     * - `userIp` (string): The user IP. If not present, the IP is obtained from the [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) and [Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) headers. This information is required when endpoints are behind a proxy.
     * - `clientRequestId` (string): A GUID generated by the client representing the current request. This information is used to identify operations across different apis related to the same request.
     * - `clientTimestamp` (string): Client ISO 8601 timestamp with milliseconds.
     * - `userAgent` (string): The user agent of the request. If not present, the user agent is obtained from the [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header. This information is required when endpoints are behind a proxy.
     *
     * @example
     * ```json
     * {
     *   "userId": "user@email.com",
     *   "clientId": "6d148f06-5f15-4639-81b4-792a9b94eb5f",
     *   "deviceId": "Chrome"
     * }
     * ```
     *
     * @example
     * ```json
     * {
     *   "clientTimestamp": "2020-09-09T19:00:45.603-04:00",
     *   "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
     * }
     * ```
     */
    analytics?: RestAnalyticsRequest;

    /**
     * The advanced query expression, typically generated by code (e.g., when toggling facet values).
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `advancedQuery` field of that event should be set to the `aq` value of the corresponding query (for reporting purposes).
     *
     * @example
     * `@year==2017`
     */
    aq?: string;

    /**
     * Data to easily query a hierarchical field using a path of hierarchical values.
     */
    categoryFacets?: RestCategoryFacetRequest[];

    /**
     * The `@`-prefixed name of the field to use to be able to identify an item as a child of another item in a folded query result (see [Result Folding](https://docs.coveo.com/en/1466/)).
     *
     * Use a field whose value points to the `parentField` value of the intended parent. Whenever an item is a child of another item, its `childField` value must be identical to the `parentField` value of that other item.
     *
     * See also the `filterField`, `parentField`, and `filterFieldRange` parameters.
     *
     * **Notes:**
     *
     * - In the index, the values of the `childField` must only contain alphanumerical characters. Using a `childField` whose values contain non-indexable characters (such as underscores) will make folding fail.
     * - The values of the `childField` must contain 60 characters or less (60 being the default maximum of characters for a word in the index).
     *
     * @example `@foldingparent`
     */
    childField?: string;

    /**
     * The parameters for Coveo for Commerce.
     */
    commerce?: RestCommerceParameters;

    /**
     * The custom context information to send along with the request. Must be a dictionary of key-value pairs (JSON) where each key is a string, and each value is either a string or an array of strings.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output. Moreover, this information can be referred to in query expressions and QPL statements by using the `$context` object.
     *
     * **Note:**
     * When logging a **Search** usage analytics event for a query, the `customData` field of that event should include the same data as the `context` parameter of the query. However, each `context` key included in `customData` must be prefixed by `context_` (e.g., the `userRoles` key in `context` becomes `context_userRoles` in `customData`).
     *
     * See also the `referrer` parameter.
     *
     * @example
     * ```json
     * {
     *   "userAgeRange":"25-35",
     *   "userRoles": ["PremiumCustomer", "ProductReviewer"]
     * }
     * ```
     */
    context?: RestContextRequest;

    /**
     * The constant query expression, typically populated with expressions that must apply to all queries sent from a specific search interface (e.g., from a specific tab). Once evaluated, the result sets of those expressions are kept in a special cache.
     *
     * **Tip:** Avoid including dynamic content in the constant query expression. Otherwise you risk filling up the cache with useless data, which can have a negative impact on performance.
     *
     * **Notes:**
     * - Other parts of the query expression can also benefit from the index cache (see the `maximumAge` parameter). However, using the constant query expression allows you to explicitly cache specific result sets.
     * - Temporal keywords (`now`, `today`, `yesterday`) in the constant query expression are only re-evaluated once per 3-4 minutes; therefore, you should avoid basing `cq` expressions on temporal keywords if you require split second accuracy.
     *
     * @example `@filetype==forumpost`
     */
    cq?: string;

    /**
     * Whether to force a successful response to include debug information.
     *
     * **Notes:**
     * - Debug information can only appear in responses in the JSON format (see the `format` parameter).
     * - Avoid setting this parameter to `true` in production, as it has a negative impact on query performance.
     *
     * @default `false`
     */
    debug?: boolean;

    /**
     * A key-value store where each pair corresponds to the name of a dictionary field to query, along with the key to target within that field.
     *
     * @example
     * Suppose that in your index, the `@price` dictionary field contains different values for its `storeA` and `storeB` keys. Including `"dictionaryFieldContext": { "price": "storeA" }` in the query means that any part of the query expression that targets the `@price` field will in fact only query the `storeA` values of that field.
     */
    dictionaryFieldContext?: RestDictionaryFieldContextRequest;

    /**
     * The disjunction query expression, typically populated by Coveo ML automatic relevance tuning models to ensure that relevant items are included in the query results. The disjunction query expression is merged with the other parts of the query expression using an `OR` operator. The resulting query expression is `(((q aq) OR (dq)) cq)`.
     *
     * @example `@permanentid=aadd702687c62910d6da8347304ec2cedfd0b06d5b4d2794a555ce5688bd`
     */
    dq?: string;
    enableCollaborativeRating?: boolean;

    /**
     * Whether to enable the *Did You Mean* feature of the index, which populates the `queryCorrections` property of a successful response with keyword correction suggestions.
     *
     * **Notes:**
     * - The Did You Mean feature only processes the basic query expression (see the `q` parameter).
     * - When both `enableDidYouMean` and `enableMLDidYouMean` parameter are set to `true`, the output of both features will appear in the `queryCorrections` array.
     * - The Did You Mean feature will return no corrections when the query is processed by an automatic relevance tuning (ART) model whose Intelligent Term Detection (ITD) feature is enabled.
     *
     * @default `false`
     */
    enableDidYouMean?: boolean;

    /**
     * Whether to filter out duplicates, so that items resembling one another only appear once in the query results.
     *
     * **Notes:**
     * - Two items must be at least 85% similar to one another to be considered duplicates.
     * - When a pair of duplicates is found, only the higher-ranked item of the two is kept in the result set.
     * - Enabling this feature can make the total result count less precise, since only results up to those being retrieved (see the `firstResult` and `numberOfResults` parameters) are submitted to duplicate filtering.
     *
     * @default `false`
     */
    enableDuplicateFiltering?: boolean;

    /**
     * **Important:** This feature is still in an experimental state.
     *
     * Whether to enable the Coveo ML query suggestions *Did You Mean* feature, which populates the `queryCorrections` property of a successful response with keyword correction suggestions.
     *
     * **Notes:**
     * - The Coveo ML query suggestions Did You Mean feature only processes the basic query expression (see the `q` parameter).
     * - When both `enableDidYouMean` and `enableMLDidYouMean` parameter are set to true, the output of both features will appear in the `queryCorrections` array.
     *
     * @default `false`
     */
    enableMLDidYouMean?: boolean;

    /**
     * Whether to interpret advanced Coveo Cloud query syntax as such in the basic query expression (see the `q` parameter). See also the `lowercaseOperators` parameter.
     *
     * @default `true`
     */
    enableQuerySyntax?: boolean;

    /**
     * The maximum length of result excerpts (in number of characters).
     *
     * The index generates result excerpts based on the keywords which are present in the query. Those excerpts include the most relevant sentences, in the order in which they appear in the item, up to the specified number of characters.
     *
     * **Notes:**
     * - The maximum length you set using this parameter also applies to retrieved first sentences, if those are included in the results (see the `retrieveFirstSentences` parameter).
     * - On an Elasticsearch index, actual excerpts may be slightly longer than the requested excerpt length.
     *
     * @default `200`
     */
    excerptLength?: number;

    /**
     * The global configuration options that apply to all facet requests performed along with the query (see the `facets` query parameter).
     */
    facetOptions?: RestFacetOptions;

    /**
     * The facet operations to perform on the query results.
     */
    facets?: RestFacetRequest[];

    /**
     * The names of the fields to exclude from the query results. All other fields will be included with each item in the query result.
     *
     * **Note:** If you specify both an array of fields to include (see the `fieldsToInclude` parameter) and an array of fields to exclude, the `fieldsToExclude` parameter has no effect at all.
     *
     * If you do not explicitly specify an array of values for this parameter (or for the `fieldsToInclude` parameter), each query result item will include all of its available fields.
     *
     * @example
     * ```json
     * ["documenttype","size","source"]
     * ```
     */
    fieldsToExclude?: string[];

    /**
     * The names of the fields to include with each item in the query results. If specified, no other fields will be included.
     *
     * **Note:** If you specify both an array of fields to include and an array of fields to exclude (see the `fieldsToExclude` parameter), the `fieldsToExclude` parameter has no effect at all.
     *
     * If you do not explicitly specify an array of values for this parameter (or for the `fieldsToExclude` parameter), each query result item will include all of its available fields.
     *
     * @example
     * ```json
     * ["clickableuri","author","date","filetype","language","coversationid","messageid","childid","adjustednumberoflikes"]
     * ```
     */
    fieldsToInclude?: string[];

    /**
     * The `@`-prefixed name of the field to use to group items into distinct folded query results (see [Result Folding](https://docs.coveo.com/en/1466/)).
     *
     * Use a field whose value is identical for all items to group under the same folded query result.
     *
     * See also the `parentField`, `childField`, and `filterFieldRange` parameters.
     *
     * **Note:** In an Elasticsearch index, the corresponding field must be configured as a *Facet* and/or *Sortable* field (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)). This limitation does not apply to a Coveo index.
     *
     * @example `@foldingcollection`
     */
    filterField?: string;

    /**
     * The maximum number of items to include in the `childResults` array of a folded query result (see [Result Folding](https://docs.coveo.com/en/1466/)).
     *
     * See also the `filterField`, `parentField`, and `childField`.
     *
     * @default `5`
     */
    filterFieldRange?: number;

    /**
     * The 0-based position of the first result to return in the non-paginated result set.
     *
     * Along with the `numberOfResults` parameter, this allows you to retrieve a specific page of result items.
     *
     * @default `0`
     */
    firstResult?: number;

    /**
     * The format of a successful response.
     *
     * - Use `json` to get the response in the JSON format.
     * - Use `opensearch-atom` or `opensearch-rss` to get the results in an OpenSearch format (XML).
     * - Use `xlsx` to generate an Excel file containing the results (binary).
     *
     * **Note:** Debug information (see the `debug` parameter) can only appear in a response in the JSON format.
     *
     * @default `json`
     */
    format?: RestFormat;

    /**
     * The Group By operations to perform on the query results, typically to extract facets.
     */
    groupBy?: RestGroupByRequest[];

    /**
     * The identifier of the index mirror to forward the request to. See also the `indexToken` parameter.
     *
     * If you do not specify an `index` (or `indexToken`) value, any index mirror could be used.
     *
     * **Note:** Passing an `index` (or `indexToken`) value has no effect when the results of a specific request can be returned from cache (see the `maximumAge` parameter).
     *
     * @example `myorg-nvoqun-Indexer1-pbi2nbuw`
     */
    index?: string;

    /**
     * The Base64 encoded identifier of the index mirror to forward the request to. See also the `index` parameter.
     *
     * If you do not specify an `indexToken` (or `index`) value, any index mirror could be used.
     *
     * **Note:** Passing an `indexToken` (or `index`) value has no effect when the results of a specific request can be returned from cache (see the `maximumAge` parameter).
     *
     * @example `ZXhhbXBsZWluZGV4bWlycm9yLS4uLg==`
     */
    indexToken?: string;

    /**
     * The type of index against which to execute the query. Must correspond to an index that has been configured for the target Coveo Cloud organization.
     *
     * @default `coveo`
     */
    indexType?: string;

    /**
     * Whether the current user is anonymous.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the anonymous field of that event should be set to the `isGuestUser` value of the query.
     *
     * @default `false`
     */
    isGuestUser?: boolean;

    /**
     * The locale of the current user. Must comply with IETF’s [BCP 47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt) definition.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output. Moreover, this information can be referred to in query expressions and QPL statements by using the `$locale` object.
     *
     * **Note:** When logging a **Search** usage analytics event, the language field of that event should match the language part of the `locale` value of the query (e.g., `en-US` in `locale` becomes `en` in `language`).
     *
     * @example `en-US`
     */
    locale?: string;

    /**
     * The identifier for a logical group of indexes that have been configured to include documents form the same sources.
     *
     * If you do not specify a `logicalIndex` value, the `default` grouping will be used, typically including all indexes.
     *
     * @example `webcontentonly`
     */
    logicalIndex?: string;

    /**
     * Whether to treat the `AND`, `NEAR`, `NOT`, and `OR` keywords in the basic query expression (see the `q` parameter) as Coveo Cloud query syntax operators even if those keywords are in lowercase.
     *
     * **Note:** Setting this parameter to `true` has no effect unless you also set the `enableQuerySyntax` parameter to `true`.
     *
     * @example
     * If you set this parameter, and the `enableQuerySyntax` parameter to `true`, the index interprets the `near` keyword in the basic query expression service center near me as the `NEAR` Coveo Cloud query syntax operator.
     *
     * @default `false`
     */
    lowercaseOperators?: boolean;

    /**
     * The large query expression, typically populated with a case description, long textual query, or any other form of text that can help refine a query. The Coveo ML Intelligent Term Detection (ITD) feature can extract relevant keywords from the large query expression and inject those keywords in the basic query expression (see the `q` parameter).
     *
     * @example `I am looking for an enterprise-class native cloud SaaS/PaaS solution that ...`
     */
    lq?: string;

    /**
     * The minimum number of keywords that need to be present in the large query expression (see the `lq` parameter) to convert it to a partial match expression in case the Coveo ML Intelligent Term Detection (ITD) feature cannot extract relevant keywords from the large query expression.
     *
     * **Note:** This parameter applies as a fallback setting when no Coveo ML automatic relevance tuning model is available in the query pipeline to process a query that contains a non-null large query expression (`lq`).
     *
     * See also the `lqPartialMatchThreshold` parameter.
     *
     * @default `5`
     */
    lqPartialMatchKeywords?: string;

    /**
     * The maximum number of keywords from the large query expression (see the `lq` parameter) that will be included in the partial match expression in case the Coveo ML Intelligent Term Detection (ITD) feature cannot extract relevant keywords from the large query expression.
     *
     * **Note:** This parameter applies as a fallback setting when no Coveo ML automatic relevance tuning model is available in the query pipeline to process a query that contains a non-null large query expression (`lq`).
     *
     * Setting this parameter to a high value can negatively impact the performance of queries, while setting it too low can produce less relevant results.
     *
     * See also the `lqPartialMatchThreshold` parameter.
     *
     * @default `100`
     */
    lqPartialMatchMaxKeywords?: number;

    /**
     * An absolute or relative value indicating the minimum number of partial match expression keywords an item must contain to match the large query expression in case the Coveo ML Intelligent Term Detection (ITD) feature cannot extract relevant keywords from the large query expression.
     *
     * If specified, the `lqPartialMatchThreshold` value must either be:
     * - a 32-bits unsigned integer (e.g., `3`),
     * - a percentage value between 0% and 100% (e.g., `75%`),
     * - the empty string (`""`), or
     * - the `all` string.
     *
     * The `""` and `all` values are both equivalent to `100%`.
     *
     * **Note:** This parameter applies when no Coveo ML automatic relevance tuning model is available in the query pipeline to process a query that contains a non-null large query expression (`lq`).
     *
     * See also the `lqPartialMatchKeywords` parameter.
     *
     * @example `3`
     * @example `75%`
     * @example `all`
     *
     * @default `50%`
     */
    lqPartialMatchThreshold?: RestThreshold;

    /**
     * The maximum age of cached results, in milliseconds.
     *
     * If the results of a specific request are available in the cache, and if those results are no older than the `maximumAge` value, the service returns those results rather than forwarding a new query to the index.
     *
     * **Note:** This parameter is automatically overridden when `staticQuery` is set to `true`.
     *
     * @default `-1` (which corresponds to the internal default value (15 minutes))
     */
    maximumAge?: number;

    /**
     * The maximum number of Coveo ML Did You Mean candidates to request from the query suggestions model.
     *
     * @default `3`
     */
    mlDidYouMeanMaxCandidates?: number;

    /**
     * The minimum score a query suggestion may have to be allowed as a candidate for the Coveo ML query suggestions Did You Mean feature. For best results, value should typically be in range `[0.8, 2]`.
     *
     * @default `1.0`
     */
    mlDidYouMeanMinScore?: number;

    /**
     * Whether to use facet counts for the Coveo ML Did You Mean feature. Can improve results, but requires more processing.
     *
     * @default `false`
     */
    mlDidYouMeanUseFacetCount?: boolean;

    /**
     * A map of options to pass to the Coveo ML models associated with the request’s target query pipeline.
     *
     * **Available parameters:**
     * - `considerUserContext` (boolean): Whether the models should attempt to leverage the `context` object of the request to personalize their output. Applies to CR models only. Default is `true`.
     * - `maxActionsHistoryItemsToConsider` (unsigned integer): The maximum number of items in the `actionsHistory` array of the request that should be taken into account by the models. Applies to CR models only. By default, all `actionsHistory` items are considered.
     * - `num` (unsigned integer):  The maximum number of recommendations/suggestions to request from the models. Must be in range `[1, 50]`, if specified. Applies to ART, CR, and QS models. Default depends on model configuration.
     * - `padding` (string enum): The kind of padding the models should complete their output with, if their maximum number of recommendations/suggestions (i.e., `num`) has not been reached. Applies to CR models only. Allowed values are popular (i.e., pad recommendations with all time most popular items) and trending (i.e., pad recommendations with items that have recently been increasingly popular). By default, no padding applies.
     * - `wordSelection` (string): The ITD keyword selection options the models should use. Applies only to ART models with ITD enabled. If specified, must be a string in the format `option:value`. The only available option is `wordsKept` (i.e., the maximum number of `lq` keywords to inject in `q`); its default value is `5`.
     * - `minNumberOfWords` (unsigned integer): The minimum number of words a query suggestion may contain to be returned by the model. Applies to QS models only. Must be in range `[1, 10]` Default is `1`, which implies that the model will return all candidates.
     * - `itemId` (string): The unique identifier (e.g., SKU) of a product to get recommendations for. Only applies when querying a Product Recommendations model with an association strategy considering a single item as an input.
     * - `itemIds` (array of strings): The unique identifiers (e.g., SKUs) of the products to get recommendations for. Only applies when querying a Product Recommendations model with an association strategy considering multiple items as an input.
     * - `categoryFilter` (string): The name of a category of products to get recommendations for.
     * - `brandFilter` (string): The name of a brand of products to get recommendations for.
     * - `filters` (map of strings): The dimensions along with the values to be used at query time by the model as filters for potential suggestions. Only applies to Automatic relevance Tuning, Query Suggestions, or Dynamic Navigation Experience models that don’t use the default `filterFields` advanced parameter values. **Example:** `"filters": { "originContext": "<MY-VALUE>", "originLevel2": "<MY-VALUE>" }`.
     *
     * @example
     * ```json
     * {
     *   "num": 3,
     *   "padding": "trending",
     *   "maxActionsHistoryItemsToConsider": 10,
     *   "considerUserContext": false
     * }
     * ```
     *
     * @example
     * ```json
     * {"wordSelection": "wordsKept:4"}
     * ```
     */
    mlParameters?: Record<string, any>;

    /**
     * The number of results to return.
     *
     * Along with the `firstResult` parameter, this allows you to retrieve a specific page of result items.
     *
     * This parameter also defines the maximum number of results which can be returned by the Coveo ML Recommendations feature.
     *
     * **Note:** The maximum `numberOfResults` value depends on the index settings of your Coveo Cloud V2 organization. By default, a Coveo Cloud V2 index can return a maximum of 1000 items per query.
     *
     * @default `10`
     */
    numberOfResults?: number;

    /**
     * The `@`-prefixed name of the field to use to be able to identify an item as a parent in a folded query result (see [Result Folding](https://docs.coveo.com/en/1466/)).
     *
     * Use a field whose value can uniquely identify each item. All items whose `childField` value is identical to the `parentField` value of another item are considered children of that other item.
     *
     * See also the `filterField`, `childField`, and `filterFieldRange` parameters.
     *
     * **Notes:**
     * - In the index, the values of the `parentField` must only contain alphanumerical characters. Using a `childField` whose values contain non-indexable characters (such as underscores) will make folding fail.
     * - The values of the `parentField` must contain 60 characters or less (60 being the default maximum of characters for a word in the index).
     *
     * @example `@foldingchild`
     */
    parentField?: string;

    /**
     * Whether to convert a basic expression containing at least `partialMatchKeywords` to a *partial match expression*, so that any item containing at least `partialMatchThreshold` of those keywords will match the expression.
     *
     * If you do not set this parameter to `true`, an item must contain all of the basic expression keywords to match the expression.
     *
     * **Notes:**
     * - This feature only applies to the basic expression (`q`) of a query, and to the basic `queryOverride` of its Group By operations.
     * - When the `enableQuerySyntax` parameter is set to `true`, this feature has no effect on a basic expression containing advanced Coveo Cloud query syntax (field expressions, operators, etc.).
     *
     * @default `false`
     */
    partialMatch?: boolean;

    /**
     * The minimum number of keywords that need to be present in a basic expression to convert it to a partial match expression.
     *
     * **Notes:**
     * - This parameter has no meaning unless the `partialMatch` parameter is set to `true`.
     * - Repeated keywords in a basic expression count as a single keyword.
     * - Thesaurus expansions in a basic expression count towards the `partialMatchKeywords` count.
     * - Stemming expansions **do not** count towards the `partialMatchKeywords` count.
     *
     * See also the `partialMatchThreshold` parameter.
     *
     * @default `5`
     */
    partialMatchKeywords?: string;

    /**
     * An absolute or relative value indicating the minimum number (rounded up) of partial match expression keywords an item must contain to match the expression.
     *
     * If specified, the `partialMatchThreshold` value must either be:
     * - a 32-bits unsigned integer (e.g., `3`),
     * - a percentage value between 0% and 100% (e.g., `75%`),
     * - the empty string, or
     * - the `all` string.
     *
     * The `""` and the `all` value are both equivalent to `100%`.
     *
     * **Notes:**
     * - This parameter has no meaning unless the `partialMatch` parameter is set to `true`.
     * - A keyword and its stemming expansions count as a single keyword when evaluating whether an item meets the `partialMatchThreshold`.
     *
     * See also the `partialMatchKeywords` parameter.
     *
     * @example `3`
     * @example `75%`
     * @example `all`
     *
     * @default `50%`
     */
    partialMatchThreshold?: RestThreshold;

    /**
     * The name of the query pipeline to use for this request (bypassing its conditions, if it has any).
     *
     * You can pass an empty `pipeline` value to use an empty query pipeline (i.e., `?pipeline=` or `"pipeline": ""`).
     *
     * If a query does not contain the `pipeline` parameter, the first query pipeline whose conditions are met by the request is used (query pipelines without conditions are not evaluated). Should the request fail to meet the conditions of each evaluated query pipeline, the default query pipeline of the target Coveo Cloud organization is used (bypassing its conditions, if it has any).
     *
     * **Notes:**
     * - This parameter will be overridden if the search request is authenticated by a search token that enforces a specific `pipeline`, or a `searchHub` that routes queries to a specific `pipeline` via a query pipeline condition.
     * - For reporting purposes, when logging a **Search** usage analytics event for a query, the `queryPipeline` field of that event should be set to the `pipeline` value of the query (or to the `"default"` string, if no `pipeline` value was specified in the query).
     *
     * See also [Managing Query Pipelines](https://docs.coveo.com/en/1450/).
     *
     * @example `CustomerQueryPipeline`
     */
    pipeline?: string;

    /**
     * The basic query expression, typically the keywords entered by the end user in a query box.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `queryText` field of that event should be set to the `q` value of the corresponding query.
     *
     * @example `Coveo "Cloud V2" platform`
     */
    q?: string;

    /**
     * The array of [query functions](https://docs.coveo.com/en/1451/) to execute on each query result item.
     *
     * The result of a query function is stored in a temporary, dynamic field created at query time.
     */
    queryFunctions?: RestQueryFunctionRequest[];

    /**
     * Whether to enable question mark characters (`?`) in the wildcards feature of the index in order to expand basic expression keywords (see the `q` parameter) containing question mark characters (`?`) to the possible matching keywords.
     *
     * **Note:** Setting this parameter to true has no effect unless you also set the `wildcards` parameter to `true`.
     *
     * See [Using Wildcards in Queries](https://docs.coveo.com/en/1580/).
     *
     * @default `false`
     */
    questionMark?: boolean;

    /**
     * The array of [ranking functions](https://docs.coveo.com/en/1448/) to execute on each query result item.
     *
     * The result of a ranking function is added to the result score, which can affect sorting (see the `Relevancy` and `qre` values of the `sortCriteria` parameter).
     */
    rankingFunctions?: RestRankingFunctionRequest[];

    /**
     * The identifier of the recommendation interface from which the request originates.
     *
     * Coveo Machine Learning content recommendations models may use this information to provide contextually relevant output.
     *
     * @example `RecommendedProducts`
     */
    recommendation?: string;

    /**
     * The third level of origin of the request, typically the URL of the page that linked to the search interface from which the request originates (e.g., in JavaScript, this would correspond to the `document.referrer` value).
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `originLevel3` field of that event should be set to the `referrer` value of the query, if specified.
     *
     * See also the `context` parameter.
     *
     * @example `http://www.example.com`
     */
    referrer?: string;
    resultRankings?: any[];

    /**
     * Whether to include the first sentences of textual items in the query results.
     *
     * First sentences are typically useful when rendering result items such as emails, since the first few sentences of these kinds of items are often more relevant than a contextually generated excerpt (see the `excerptLength` parameter).
     *
     * **Note:** The maximum length of the retrieved sentences (in number of characters) is determined by the value of the `excerptLength` parameter.
     *
     * @default `false`
     */
    retrieveFirstSentences?: boolean;

    /**
     * Whether the `q` value contains the URI hash of a specific item that should be returned.
     *
     * @default `false`
     */
    searchById?: boolean;

    /**
     * The first level of origin of the request, typically the identifier of the graphical search interface from which the request originates.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output.
     *
     * **Notes:**
     * - This parameter will be overridden if the search request is authenticated by a search token that enforces a specific `searchHub`.
     * - When logging a **Search** usage analytics event for a query, the `originLevel1` field of that event should be set to the value of the `searchHub` search request parameter.
     *
     * See also the `tab` parameter.
     *
     * @example `CustomerPortal`
     */
    searchHub?: string;

    /**
     * The criteria to use for sorting the query results.
     *
     * **Allowed values:**
     * - `relevancy`: use standard index ranking factors (adjacency, TDIDF, etc.) and custom ranking expressions (QREs and QRFs) to compute a ranking `score` for each query result item, and sort the query results by descending `score` value.
     * - `date ascending`/`date descending`: use the `@date` field to sort the query results. This field typically contains the last modification date of each item.
     * - `qre`: use only custom ranking expressions (QREs and QRFs) to compute a ranking `score` for each query result item, and sort the query results by descending `score` value.
     * - `nosort`: do not sort the query results; the index will return result items in an essentially random order.
     * - `@[field] ascending`/`@[field] descending`: sort using the value of a specific sortable field (replace `[field]` by the target field name).
     *
     * You can specify a list of comma-separated sort criteria. However, this only works when combining:
     * - two or more field criteria (e.g., `@views descending,@likes descending`).
     * - a single date criteria with one or more field criteria (e.g., `date ascending,@views descending`).
     *
     * @example `date ascending`
     * @example `@author ascending`
     * @example `date descending,@views descending,@likes descending`
     *
     * @default `relevancy`
     */
    sortCriteria?: string;

    /**
     * Whether to execute this query in a way that does not count against the allowed number of queries per month of a Coveo Cloud organization (QPM), but may produce cached/outdated query results (see [Rendering Static Content Using Persistent Queries](https://docs.coveo.com/en/1009/)).
     *
     * **Note:** Setting this parameter to `true` overwrites the `maximumAge` parameter value for this query.
     *
     * @default `false`
     */
    staticQuery?: boolean;

    /**
     * The length of the automatically generated item summary.
     *
     * The index generates a result item *summary* independently from the query, as opposed to a result item *excerpt*, which is generated based on query keywords.
     *
     * @default `0`
     */
    summaryLength?: number;

    /**
     * The name of the query syntax to apply when interpreting the basic query expression (see the `q` parameter).
     *
     * The only value you can specify for this parameter is `SOSL` (to use the [Salesforce Object Search Language syntax](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_syntax.htm)). You do not need to set `enableQuerySyntax` to `true` to apply SOSL syntax when interpreting the basic query expression.
     *
     * If you do not specify a value for this parameter and the `enableQuerySyntax` parameter is set to `true`, the default Coveo Cloud query syntax is applied (see [Coveo Cloud Query Syntax Reference](https://docs.coveo.com/en/1552/)).
     */
    syntax?: string;

    /**
     * The second level of origin of the request, typically the identifier of the selected tab in the graphical search interface from which the request originates.
     *
     * Coveo Machine Learning models use this information to provide contextually relevant output.
     *
     * **Note:** When logging a **Search** usage analytics event for a query, the `originLevel2` field of that event should be set to the `tab` value of the query (or to the `"default"` string, if no `tab` value was specified in the query).
     *
     * See also the `searchHub` parameter.
     *
     * @example `ForumTab`
     */
    tab?: string;

    /**
     * The [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) identifier of the time zone to use to correctly interpret dates in the query expression and result items.
     *
     * If not specified, the default time zone of the server hosting the index is used.
     *
     * **Note:** While no Coveo Machine Learning model uses this information, it can nevertheless affect the ranking scores (and thus, potentially the order) of result items, as ranking expressions may be based on time constants.
     *
     * @example `America/New_York`
     */
    timezone?: string;

    /**
     * The parameters allowing user actions to be retrieved in query results.
     */
    userActions?: RestUserActionsParameters;

    /**
     * A GUID representing the current user, who can be authenticated or anonymous. This GUID is normally generated by the usage analytics service and stored in a non-expiring browser cookie.
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * @example `5cb98953-9c13-42ff-8176-e6fcba6a50bf`
     */
    visitorId?: string;

    /**
     * Whether to enable the wildcards feature of the index in order to expand basic expression keywords (see the `q` parameter) containing wildcard characters (`*`) to the possible matching keywords. See also the `questionMark` parameter.
     *
     * See [Using Wildcards in Queries](https://docs.coveo.com/en/1580/).
     *
     * @default `false`
     */
    wildcards?: boolean;
}

export type RestFacetRequest =
    | RestSpecificFacetRequest
    | RestDateRangeFacetRequest
    | RestNumericalRangeFacetRequest
    | RestHierarchicalFacetRequest;

export type RestThreshold = string | number;

export type RestComputedFieldOperation = 'average' | 'maximum' | 'minimum' | 'sum';

export type RestHierarchicalFacetSortCriteria = 'score' | 'alphanumeric' | 'occurrences';

export type RestRangeFacetSortCriteria = 'score' | 'alphanumeric' | 'ascending' | 'descending';

export type RestSpecificFacetSortCriteria = 'score' | 'alphanumeric';

export type RestFormat = 'json' | 'opensearch-atom' | 'opensearch-rss' | 'xlsx';

export type RestGroupBySortCriteria =
    | 'alphaascending'
    | 'alphadescending'
    | 'chisquare'
    | 'computedfieldascending'
    | 'computedfielddescending'
    | 'nosort'
    | 'occurrences'
    | 'score';

export type RestMLParametersPadding = 'popular' | 'trending';

export type RestRangeAlgorithm = 'equiprobable' | 'even';

/**
 * A single query or page view action (see the `actionsHistory` top-level search request parameter).
 */
export interface RestActionHistory {
    /**
     * The action history event name.
     *
     * @example `PageView`
     *
     * Allowed values are:
     * - `Query`
     * - `PageView`
     */
    name?: string;

    /**
     * The time when the action history event was sent from the client.
     *
     * @example `2017-08-15T17:34:08.398Z`
     */
    time?: string;

    /**
     * The action history value, which is either a query expression or a page URI, depending on the action history event `name`.
     *
     * @example `http://www.example.com/`
     */
    value?: string;
}

/**
 * Contextual information about the user performing the request and the request itself (see the `analytics` top-level search request parameter).
 */
export interface RestAnalyticsRequest {
    /**
     * A GUID representing the client id.
     *
     * **Note:** The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     *
     * @example `6d148f06-5f15-4639-81b4-792a9b94eb5f`
     */
    clientId?: string;

    /**
     * A GUID generated by the client representing the current request.
     *
     * This information is used to identify operations across different apis related to the same request.
     *
     * @example `6c59a3aa-cb66-492e-9c08-9f1937467b60`
     */
    clientRequestId?: string;

    /**
     * Client ISO 8601 timestamp with milliseconds.
     *
     * @example `2020-09-09T19:00:45.603-04:00`
     */
    clientTimestamp?: string;

    /**
     * The name of the device that the end user is using. It has to be explicitly passed from native mobile apps.
     *
     * **Note:** The `clientId` and `deviceId` replaces the deprecated `visitorId`.
     *
     * @example `Chrome`
     */
    deviceId?: string;

    /**
     * The URL of the current page or component.
     *
     * If not present, the referrer is obtained from the [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header.
     *
     * **Note:** This information can be obtained from `coveo.analytics.js`.
     *
     * @example `http://www.example.com/`
     */
    documentLocation?: string;

    /**
     * Typically the URL of the page that linked to the search interface from which the request originates (e.g., in JavaScript, this would correspond to the `document.referrer` value).
     *
     * Coveo Machine Learning models may use this information to provide contextually relevant output.
     *
     * **Note:** This information can be obtained from `coveo.analytics.js`.
     *
     * @example `http://www.example.com/`
     */
    documentReferrer?: string;

    /**
     * A GUID representing the page ID.
     *
     * **Note:** This information can be obtained from `coveo.analytics.js`.
     *
     * @example `c4e3aa42-5afa-4b01-8bfd-79b7b49668f7`
     */
    pageId?: string;

    /**
     * The user agent of the request. If not present, the user agent is obtained from the [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header.
     *
     * **Note:** This information is required when endpoints are behind a proxy.
     *
     * @example `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36`
     */
    userAgent?: string;

    /**
     * The ID of the logged user. If not present, the id is obtained from the authentication token.
     *
     * @example `user@email.com`
     */
    userId?: string;

    /**
     * The user IP. If not present, the IP is obtained from the [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) and [Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) headers.
     *
     * **Note:** This information is required when endpoints are behind a proxy.
     *
     * @example `127.0.0.1`
     */
    userIp?: string;
}

/**
 * A single category facet to request along with the query (see the `categoryFacets` top-level search request parameter).
 */
export interface RestCategoryFacetRequest {
    /**
     * The character to use to split field values into a hierarchical sequence.
     *
     * @example
     * For a multi-value `field` containing the following values:
     * `c; c>folder2; c>folder2>folder3;`
     * The delimiting character is `>`.
     *
     * @default `|`
     */
    delimitingCharacter?: string;

    /**
     * The name of the field in which to look for hierarchical values.
     *
     * **Note:** You must ensure that the **Multi-value facet** option is enabled for this field in your index (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * @example `@categories`
     */
    field: string;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * The maximum number of query result items to scan.
     *
     * **Note:** Specifying a high `injectionDepth` value can negatively impact query performance.
     *
     * @default `1000`
     */
    injectionDepth?: number;

    /**
     * The maximum number of values to return.
     *
     * @default `10`
     */
    maximumNumberOfValues?: number;

    /**
     * The retrieved sequence of hierarchical field values.
     */
    path?: string[];
}

export interface RestComputedField {
    /**
     * The name of the numeric field on which to perform the aggregate operation.
     *
     * **Tip:** You should ensure that the **Use cache for computed fields** option is enabled for that field in your index in order to speed up evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * @example `@wordcount`
     */
    field: string;

    /**
     * The aggregate operation to perform on the `field` values.
     *
     * **Allowed values:**
     * - `sum`: get the sum of all values.
     * - `average`: get the average of all values.
     * - `minimum`: get the smallest value.
     * - `maximum`: get the largest value.
     */
    operation: RestComputedFieldOperation;
}

export interface RestContextRequest {
    [fieldName: string]: string | string[];
}

export interface RestDictionaryFieldContextRequest {
    [fieldName: string]: string;
}

export interface RestFacetOptions {
    /**
     * Whether to take the scores generated by the index into account when reordering facets.
     *
     * **Note:** Setting this to `false` implies that only the scores generated by a Coveo ML DNE model will be taken into account when automatically reordering facets. To disable automatic facet reordering entirely, set `freezeFacetOrder` to `true` instead.
     *
     * @default `true`
     */
    enableIndexFacetOrdering?: boolean;

    /**
     * Whether facets should be returned in the same order they were requested.
     *
     * **Note:** Setting this to `true` entirely prevents automatic score-based facet reordering. To allow automatic facet reordering, but only take into account the scores generated by a Coveo ML DNE model, set `enableIndexFacetOrdering` to `false` instead.
     *
     * @default `false`
     */
    freezeFacetOrder?: boolean;
}

export interface RestSpecificFacetRequest {
    /**
     * The values displayed by the facet in the search interface at the moment of the request.
     *
     * @default `[]`
     */
    currentValues?: RestFacetValue[];

    /**
     * The facet unique ID.
     */
    facetId?: string;

    /**
     * The name of the field on which to base the facet request.
     *
     * **Note:** Must reference a field whose **Facet** option is enabled (see [Add or Edit Fields](https://docs.coveo.com/en/1982)).
     *
     * @example `author`
     */
    field: string;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * Whether to include the facet request’s `currentValues` in corresponding facet response’s `values` array.
     *
     * **Note:** Setting this to `true` is useful to ensure that the facet does not move around while the end-user is interacting with it in the search interface.
     *
     * @default `false`
     */
    freezeCurrentValues?: boolean;

    /**
     * The maximum number of items to scan for facet values.
     *
     * **Note:** A high `injectionDepth` may negatively impact the facet request performance.
     *
     * @default `100`
     */
    injectionDepth?: number;

    /**
     * Whether the facet is expanded in the search interface at the moment of the request.
     *
     * @default `false`
     */
    isFieldExpanded?: boolean;
    mlDebugTitle?: string;

    /**
     * The maximum number of facet values to fetch.
     *
     * **Notes:**
     * - If `freezeCurrentValues` is `true` or if requesting range facet values, `numberOfValues` is automatically set to the `currentValues` array length.
     * - When requesting hierarchical facet values, `numberOfValues` is only taken account when the `currentValues` array is empty (i.e., when retrieving the first level of values).
     *
     * @default `8`
     */
    numberOfValues?: number;

    /**
     * Whether to prevent Coveo ML from automatically selecting values.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * The sort criterion to apply to the returned facet values.
     *
     * **Allowed values:**
     * - `score`: Sort values in descending score order. On a Coveo index, facet value scores are based on number of occurrences and position in the ranked query result set. On an Elasticsearch index, score values are based on number of occurrences only.
     * - `alphanumeric`: Sort values in ascending alphanumeric order.
     *
     * **Notes:**
     * - The Coveo ML DNE feature only works with the `score` sort criterion.
     *
     * By default:
     * - When `isFieldExpanded` is `false` in the facet request, and `moreValuesAvailable` is `true` in the corresponding facet response, use `score`
     * - Otherwise, use `alphanumeric`.
     */
    sortCriteria?: RestSpecificFacetSortCriteria;

    /**
     * The kind of values to request for the facet.
     */
    type?: 'specific';
}

export interface RestDateRangeFacetRequest {
    /**
     * The values displayed by the facet in the search interface at the moment of the request.
     *
     * @default `[]`
     */
    currentValues?: RestFacetValue[];

    /**
     * The facet unique ID.
     */
    facetId?: string;

    /**
     * The name of the field on which to base the facet request.
     *
     * **Note:** Must reference a field whose **Facet** option is enabled (see [Add or Edit Fields](https://docs.coveo.com/en/1982)).
     *
     * @example `author`
     */
    field: string;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * Whether to include the facet request’s `currentValues` in corresponding facet response’s `values` array.
     *
     * **Note:** Setting this to `true` is useful to ensure that the facet does not move around while the end-user is interacting with it in the search interface.
     *
     * @default `false`
     */
    freezeCurrentValues?: boolean;

    /**
     * Whether the index should automatically create range values.
     *
     * **Tip:** If you set this parameter to `true`, you should ensure that the **Use cache for numeric queries** option is enabled for the Facet `field` in your index in order to speed up automatic range evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * **Notes:**
     * - Setting `generateAutomaticRanges` to `true` only makes sense when the Facet `field` references a numeric or date field in the index.
     * - The index cannot automatically generate range values of a field generated by a query function. In such cases, you must rather use the `rangeValues` Facet parameter.
     * - Automatic range generation will fail if the referenced `field` is dynamically generated by a query function.
     *
     * @default `false`
     */
    generateAutomaticRanges?: boolean;

    /**
     * The maximum number of items to scan for facet values.
     *
     * **Note:** A high `injectionDepth` may negatively impact the facet request performance.
     *
     * @default `100`
     */
    injectionDepth?: number;

    /**
     * Whether the facet is expanded in the search interface at the moment of the request.
     *
     * @default `false`
     */
    isFieldExpanded?: boolean;
    mlDebugTitle?: string;

    /**
     * The maximum number of facet values to fetch.
     *
     * **Notes:**
     * - If `freezeCurrentValues` is `true` or if requesting range facet values, `numberOfValues` is automatically set to the `currentValues` array length.
     * - When requesting hierarchical facet values, `numberOfValues` is only taken account when the `currentValues` array is empty (i.e., when retrieving the first level of values).
     *
     * @default `8`
     */
    numberOfValues?: number;

    /**
     * Whether to prevent Coveo ML from automatically selecting values.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * Determines which algorithm is used to generate the ranges if `generateAutomaticRanges` is enabled.
     *
     * **Allowed values:**
     * - `equiprobable`
     * - `even`
     *
     * **Equiprobable**
     *
     * This algorithm creates ranges which represent the distribution of the results. For example, if you have a single facet value that matches most of the results, the `equiprobable` algorithm will resize the ranges to balance the weights.
     *
     * | Start | End | Matching results |
     * |:------|:----|:-----------------|
     * |0      |62   |100               |
     * |62     |423  |100               |
     * |423    |1500 |100               |
     *
     * **Even**
     *
     * This algorithm creates ranges of the same length. For example, it could generate the following price ranges:
     *
     * | Start | End | Matching results |
     * |:------|:----|:-----------------|
     * |0      |500  |299               |
     * |500    |1000 |0                 |
     * |1000   |1500 |1                 |
     *
     * @default `equiprobable`
     */
    rangeAlgorithm?: RestRangeAlgorithm;

    /**
     * The sort criterion to apply to the returned facet values.
     *
     * **Allowed values:**
     * - `score`: Sort values in descending score order. On a Coveo index, facet value scores are based on number of occurrences and position in the ranked query result set. On an Elasticsearch index, score values are based on number of occurrences only.
     * - `alphanumeric`: Sort values in ascending alphanumeric order.
     * - `ascending`: Sort in ascending order of range facet values.
     * - `descending`: Sort in descending order of range facet values.
     *
     * **Notes:**
     * - The Coveo ML DNE feature only works with the `score` sort criterion.
     *
     * @default `ascending`
     */
    sortCriteria?: RestRangeFacetSortCriteria;

    /**
     * The kind of values to request for the facet.
     */
    type: 'dateRange';
}

export interface RestNumericalRangeFacetRequest {
    /**
     * The values displayed by the facet in the search interface at the moment of the request.
     *
     * @default `[]`
     */
    currentValues?: RestFacetValue[];

    /**
     * The facet unique ID.
     */
    facetId?: string;

    /**
     * The name of the field on which to base the facet request.
     *
     * **Note:** Must reference a field whose **Facet** option is enabled (see [Add or Edit Fields](https://docs.coveo.com/en/1982)).
     *
     * @example `author`
     */
    field: string;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * Whether to include the facet request’s `currentValues` in corresponding facet response’s `values` array.
     *
     * **Note:** Setting this to `true` is useful to ensure that the facet does not move around while the end-user is interacting with it in the search interface.
     *
     * @default `false`
     */
    freezeCurrentValues?: boolean;

    /**
     * Whether the index should automatically create range values.
     *
     * **Tip:** If you set this parameter to `true`, you should ensure that the **Use cache for numeric queries** option is enabled for the Facet `field` in your index in order to speed up automatic range evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * **Notes:**
     * - Setting `generateAutomaticRanges` to `true` only makes sense when the Facet `field` references a numeric or date field in the index.
     * - The index cannot automatically generate range values of a field generated by a query function. In such cases, you must rather use the `rangeValues` Facet parameter.
     * - Automatic range generation will fail if the referenced `field` is dynamically generated by a query function.
     *
     * @default `false`
     */
    generateAutomaticRanges?: boolean;

    /**
     * The maximum number of items to scan for facet values.
     *
     * **Note:** A high `injectionDepth` may negatively impact the facet request performance.
     *
     * @default `100`
     */
    injectionDepth?: number;

    /**
     * Whether the facet is expanded in the search interface at the moment of the request.
     *
     * @default `false`
     */
    isFieldExpanded?: boolean;
    mlDebugTitle?: string;

    /**
     * The maximum number of facet values to fetch.
     *
     * **Notes:**
     * - If `freezeCurrentValues` is `true` or if requesting range facet values, `numberOfValues` is automatically set to the `currentValues` array length.
     * - When requesting hierarchical facet values, `numberOfValues` is only taken account when the `currentValues` array is empty (i.e., when retrieving the first level of values).
     *
     * @default `8`
     */
    numberOfValues?: number;

    /**
     * Whether to prevent Coveo ML from automatically selecting values.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * Determines which algorithm is used to generate the ranges if `generateAutomaticRanges` is enabled.
     *
     * **Allowed values:**
     * - `equiprobable`
     * - `even`
     *
     * **Equiprobable**
     *
     * This algorithm creates ranges which represent the distribution of the results. For example, if you have a single facet value that matches most of the results, the `equiprobable` algorithm will resize the ranges to balance the weights.
     *
     * | Start | End | Matching results |
     * |:------|:----|:-----------------|
     * |0      |62   |100               |
     * |62     |423  |100               |
     * |423    |1500 |100               |
     *
     * **Even**
     *
     * This algorithm creates ranges of the same length. For example, it could generate the following price ranges:
     *
     * | Start | End | Matching results |
     * |:------|:----|:-----------------|
     * |0      |500  |299               |
     * |500    |1000 |0                 |
     * |1000   |1500 |1                 |
     *
     * @default `equiprobable`
     */
    rangeAlgorithm?: RestRangeAlgorithm;

    /**
     * The sort criterion to apply to the returned facet values.
     *
     * **Allowed values:**
     * - `score`: Sort values in descending score order. On a Coveo index, facet value scores are based on number of occurrences and position in the ranked query result set. On an Elasticsearch index, score values are based on number of occurrences only.
     * - `alphanumeric`: Sort values in ascending alphanumeric order.
     * - `ascending`: Sort in ascending order of range facet values.
     * - `descending`: Sort in descending order of range facet values.
     *
     * **Notes:**
     * - The Coveo ML DNE feature only works with the `score` sort criterion.
     *
     * @default `ascending`
     */
    sortCriteria?: RestRangeFacetSortCriteria;

    /**
     * The kind of values to request for the facet.
     */
    type: 'numericalRange';
}

export interface RestHierarchicalFacetRequest {
    /**
     * The base path shared by all values for the facet.
     */
    basePath?: string[];

    /**
     * The values displayed by the facet in the search interface at the moment of the request.
     *
     * @default `[]`
     */
    currentValues?: RestFacetValue[];

    /**
     * The character to use to split field values into a hierarchical sequence.
     *
     * @example
     * For a multi-value field containing the following values:
     *
     * `c; c>folder2; c>folder2>folder3;`
     *
     * The delimiting character is `>`.
     *
     * For a hierarchical field containing the following values: `c;folder2;folder3;`
     *
     * The delimiting character is `;`.
     *
     * @default `;`
     */
    delimitingCharacter?: string;

    /**
     * The facet unique ID.
     */
    facetId?: string;

    /**
     * The name of the field on which to base the facet request.
     *
     * **Note:** Must reference a field whose **Facet** option is enabled (see [Add or Edit Fields](https://docs.coveo.com/en/1982)).
     *
     * @example `author`
     */
    field: string;

    /**
     * Whether to use `basePath` as a filter for the results.
     *
     * @default `true`
     */
    filterByBasePath?: boolean;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * The maximum number of items to scan for facet values.
     *
     * **Note:** A high `injectionDepth` may negatively impact the facet request performance.
     *
     * @default `100`
     */
    injectionDepth?: number;

    /**
     * Whether the facet is expanded in the search interface at the moment of the request.
     *
     * @default `false`
     */
    isFieldExpanded?: boolean;
    mlDebugTitle?: string;

    /**
     * The maximum number of facet values to fetch.
     *
     * **Notes:**
     * - If `freezeCurrentValues` is `true` or if requesting range facet values, `numberOfValues` is automatically set to the `currentValues` array length.
     * - When requesting hierarchical facet values, `numberOfValues` is only taken account when the `currentValues` array is empty (i.e., when retrieving the first level of values).
     *
     * @default `8`
     */
    numberOfValues?: number;

    /**
     * Whether to prevent Coveo ML from automatically selecting values.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * The sort criterion to apply to the returned facet values.
     *
     * **Allowed values:**
     * - `score`: Sort values in descending score order. On a Coveo index, facet value scores are based on number of occurrences and position in the ranked query result set. On an Elasticsearch index, score values are based on number of occurrences only.
     * - `alphanumeric`: Sort values in ascending alphanumeric order.
     * - `occurrences`: Sort by number of occurrences, with field values having the highest number of occurrences appearing first.
     *
     * **Notes:**
     * - The Coveo ML DNE feature only works with the `score` sort criterion.
     *
     * @default `occurrences`
     */
    sortCriteria?: RestHierarchicalFacetSortCriteria;

    /**
     * The kind of values to request for the facet.
     */
    type: 'hierarchical';
}

/**
 * A single item in the `currentValues` array of a `RestFacetRequest` (see the `facets` query parameter).
 */
export interface RestFacetValue {
    /**
     * The children of this hierarchical facet value.
     *
     * Each child is a full-fledged hierarchical facet value that may in turn have its own children and so forth, up to a maximum depth of 50 levels.
     */
    children?: RestHierarchicalFacetValue[];

    /**
     * The value to end the range at. Must be greater (or later) than the `start` value.
     *
     * **Note:** Timezone of date ranges are determined by the timezone parameter of the search request.
     *
     * @example `100`
     * @example `2019/12/31@23:59:59`
     */
    end?: string;

    /**
     * Whether to include the `end` value in the range.
     *
     * **Note:** In an Elasticsearch index, this parameter cannot be set to `true`.
     *
     * @default `false`
     */
    endInclusive?: boolean;

    /**
     * Whether to prevent Coveo ML from automatically selecting the facet value.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * Whether to retrieve the children of this hierarchical facet value. Can only be used on leaf values.
     */
    retrieveChildren?: boolean;

    /**
     * The maximum number of children to retrieve for this hierarchical facet value. Ignored if `retrieveChildren` is `false`.
     */
    retrieveCount?: number;

    /**
     * The value to start the range at.
     *
     * **Note:** Timezone of date ranges are determined by the timezone parameter of the search request.
     *
     * @example `0`
     * @example `2019/01/01@00:00:00`
     */
    start?: string;

    /**
     * The current facet value state in the search interface.
     *
     * @default `idle`
     */
    state?: string;

    /**
     * The facet value name.
     *
     * **Note:** In the case of a hierarchical facet value, this represents a single path segment.
     *
     * @example `Alice Smith`
     */
    value: string;
}

/**
 * Describes a single range value for a Group By operation (see the `rangeValues` Group By parameter).
 */
export interface RestGroupByRangeValue {
    /**
     * The value to end the range at. Must be greater (or later) than the `start` value.
     *
     * **Note:** Timezone of date ranges are determined by the timezone parameter of the search request.
     *
     * @example `100`
     * @example `2019/12/31@23:59:59`
     */
    end: number;

    /**
     * Whether to include the `end` value in the range.
     *
     * **Note:** In an Elasticsearch index, this parameter cannot be set to `true`.
     *
     * @default `false`
     */
    endInclusive?: boolean;

    /**
     * The label to associate with the range.
     *
     * **Note:** Not currently leveraged.
     *
     * @example `0 - 100`
     * @example `In 2019`
     */
    label?: string;

    /**
     * The value to start the range at.
     *
     * **Note:** Timezone of date ranges are determined by the timezone parameter of the search request.
     *
     * @example `0`
     * @example `2019/01/01@00:00:00`
     */
    start: number;
}

export interface RestGroupByRequest {
    /**
     * The query expression that should override the advanced query expression on which the Group By operation is being performed (see the `aq` query parameter).
     *
     * **Note:**  If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `@year==2017`
     */
    advancedQueryOverride?: string;

    /**
     * The field values allowed in the Group By operation results. You can use trailing wildcards (`*`) to include ranges of values.
     *
     * See also the `completeFacetWithStandardValues` Group By operation parameter.
     *
     * If you do not explicitly specify an array of `allowedValues`, or if you specify an empty array, all field values are allowed.
     *
     * @example
     * ```json
     * [
     *   "Anonymous",
     *   "Bob Jones",
     *   "Carrie Green",
     *   "David Allen"
     * ]
     * ```
     */
    allowedValues?: string[];

    /**
     * The type of pattern being used in the allowed field values.
     *
     * See also the `allowedValues` Group By operation parameter.
     *
     * If you do not explicitly specify a pattern type, the legacy pattern is used by default, which only support trailing wildcards.
     *
     * @example `regex`
     */
    allowedValuesPatternType?: string;

    /**
     * Whether to complete the Group By operation result set with standard values.
     *
     * If you set this parameter to `true` and the number of specified `allowedValues` is lower than the `maximumNumberOfValues`, the Group By operation also attempts to returns standard values until the result set contains the `maximumNumberOfValues`.
     *
     * @default `false`
     */
    completeFacetWithStandardValues?: boolean;

    /**
     * The computed fields to evaluate for each Group By value.
     *
     * A computed field stores the result of an aggregate operation performed on the values of a specific numerical field for all the query result items that share the same Group By `field` value.
     */
    computedFields?: RestComputedField[];

    /**
     * The query expression that should override the constant query expression on which the Group By operation is being performed (see the `cq` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `@filetype==forumpost`
     */
    constantQueryOverride?: string;

    /**
     * The query expression that should override the disjunction query expression on which the Group By operation is being performed (see the `dq` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `@date=2016-12-01..2016-12-31`
     */
    disjunctionQueryOverride?: string;

    /**
     * The name of the field on which to perform the Group By operation. The operation returns a Group By value for each distinct value of this field found in the query result items.
     *
     * **Note:** You must ensure that the **Facet** option is enabled for this field in your index (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * @example `@author`
     */
    field: string;

    /**
     * Whether to exclude folded result parents when estimating the result count for each facet value.
     *
     * @default `true`
     */
    filterFacetCount?: boolean;

    /**
     * Whether the index should automatically create range values.
     *
     * **Tip:** If you set this parameter to `true`, you should ensure that the **Use cache for numeric queries** option is enabled for the Group By `field` in your index in order to speed up automatic range evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * **Notes:**
     * - Setting `generateAutomaticRanges` to `true` only makes sense when the Group By `field` references a numeric or date field in the index.
     * - The index cannot automatically generate range values of a field generated by a query function. In such cases, you must rather use the `rangeValues` Group By parameter.
     * - Automatic range generation will fail if the referenced `field` is dynamically generated by a query function.
     *
     * @default `false`
     */
    generateAutomaticRanges?: boolean;

    /**
     * The maximum number of query result items to scan for Group By values.
     *
     * **Note:** Specifying a high `injectionDepth` value can negatively impact query performance.
     *
     * @default `1000`
     */
    injectionDepth?: number;

    /**
     * The maximum number of values the Group By operation should return.
     *
     * @default `10`
     */
    maximumNumberOfValues?: number;

    /**
     * The query expression that should override the basic query expression on which the Group By operation is being performed (see the `q` query parameter).
     *
     * **Note:** If *any* query override parameter (e.g., `queryOverride`, `advancedQueryOverride`, etc.) is set in a Group By operation, **all** original parts of the query expression (i.e., `q`, `aq`, `cq`, and `dq`) will be ignored.
     *
     * @example `Coveo Cloud V2 Platform`
     */
    queryOverride?: string;

    /**
     * The ranges for which to generate Group By values.
     *
     * **Notes:**
     * - Specifying `rangeValues` only makes sense when the Group By `field` references a numeric or date field in the index.
     * - You can set the `generateAutomaticRanges` Group By parameter to `true` rather than explicitly specifying `rangeValues` (unless the Group By `field` was generated by a query function).
     */
    rangeValues?: RestGroupByRangeValue[];

    /**
     * The criterion to use when sorting the Group By operation results.
     *
     * **Allowed values:**
     * - `score`: sort using the score value which is computed from the number of occurrences of a field value, as well as from the position where query result items having this field value appear in the ranked query result set. When using this sort criterion, a field value with 100 occurrences might appear after one with only 10 occurrences, if the occurrences of the latter field value tend to appear higher in the ranked query result set.
     * - `occurrences`: sort by number of occurrences, with field values having the highest number of occurrences appearing first.
     * - `alphaascending`/`alphadescending`: sort alphabetically on the field values.
     * - `computedfieldascending`/`computedfielddescending`: sort on the value of the first computed field for each Group By operation result (see the `ComputedFields` Group By parameter).
     * - `chisquare`: sort based on the relative frequency of field values in the query result set compared to their frequency in the entire index. This means that a field value that does not appear often in the index, but does appear often in the query result set will tend to appear higher.
     * - `nosort`: do not sort the results of the Group By operation. The field values will be appear in a random order.
     *
     * @default `score`
     */
    sortCriteria?: RestGroupBySortCriteria;
}

/**
 * A single item in the `currentValues` array of a `RestFacetRequest` whose type is set to `hierarchical` (see the `facets` query parameter).
 */
export interface RestHierarchicalFacetValue {
    /**
     * The children of this hierarchical facet value.
     *
     * Each child is a full-fledged hierarchical facet value that may in turn have its own children and so forth, up to a maximum depth of 50 levels.
     */
    children?: RestHierarchicalFacetValue[];

    /**
     * Whether to prevent Coveo ML from automatically selecting the facet value.
     *
     * @default `false`
     */
    preventAutoSelect?: boolean;

    /**
     * Whether to retrieve the children of this hierarchical facet value. Can only be used on leaf values.
     */
    retrieveChildren?: boolean;

    /**
     * The maximum number of children to retrieve for this hierarchical facet value. Ignored if `retrieveChildren` is `false`.
     */
    retrieveCount?: number;

    /**
     * The current facet value state in the search interface.
     *
     * @default `idle`
     */
    state?: string;

    /**
     * The facet value name.
     *
     * **Note:**  In the case of a hierarchical facet value, this represents a single path segment.
     *
     * @example `Alice Smith`
     */
    value?: string;
}

export interface RestQueryFunctionRequest {
    /**
     * The name of the dynamic, temporary field in which to store the query function expression output.
     *
     * **Note:** The `fieldName` value must not correspond to an existing field in the index.
     *
     * @example `numberoflikesplusone`
     */
    fieldName: string;

    /**
     * The mathematical expression whose output should be stored in a dynamic, temporary field.
     *
     * **Notes:**
     * - The `function` expression can be defined using the ExprTk library syntax, but control and loop structures (e.g., if-then-else, while loop, etc.) are **not** supported.
     * - If the `function` expression references a numeric field, enable the **Use cache for computed fields** option on that field to speed up evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * @example `@numberoflikes+1`
     */
    function: string;
}

export interface RestRankingFunctionRequest {
    /**
     * A mathematical expression to evaluate for each query result. The result of this expression for a given query result generates a boost which is then added to the ranking score of that query result.
     *
     * **Note:** Query ranking function expressions support the [ExprTk](http://www.partow.net/programming/exprtk/index.html) library syntax. However, the following statements are disabled:
     * - `if`/`else`
     * - `switch`
     * - `while`
     * - `repeat until`
     *
     * The following time constants are also available in query ranking functions:
     *
     * - `NOW`: A value corresponding to the precise moment when the query reaches the index.
     * - `YEAR`: A value corresponding to the duration of a year (i.e., 365.25 days).
     * - `WEEK`: A value corresponding to the duration of a week.
     * - `DAY`: A value corresponding to the duration of a day.
     *
     * **Tip:** If your query ranking function expression references certain numeric fields, you should ensure that the **Use cache for computed fields** option is enabled for each of those fields in order to speed up evaluation (see [Add or Edit Fields](https://docs.coveo.com/en/1982/)).
     *
     * @example `-sqrt(dist(@longitude, @latitude, 46.8167, -71.2167))`
     */
    expression: string;

    /**
     * The maximum boost this query ranking function can add to the ranking score of any given query result.
     *
     * This property only has a meaning if `normalizeWeight` is set to `true`.
     *
     * @default `600`
     */
    modifier?: number;

    /**
     * Whether to normalize the ranking score boosts resulting from the evaluation of this query ranking function using the standard index scale.
     *
     * Unless you want to completely override the index ranking and use the results of this query ranking function directly to boost the ranking scores of query results, you should set this to `true`.
     *
     * @default `false`
     */
    normalizeWeight?: boolean;
}

/**
 * The options that can be passed with the query to retrieve user actions the results (see the `userActions` query parameter).
 */
export interface RestUserActionsParameters {
    /**
     * The user ID or visitor ID to retrieve user actions for.
     *
     * @example `asmith@example.com`
     * @example `c7ab60e2-e6b8-41e8-be6a-ad5c8edc662e`
     */
    tagViewsOfUser?: string;
}
