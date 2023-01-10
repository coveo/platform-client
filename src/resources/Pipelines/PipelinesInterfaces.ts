import {GranularResource, PageModel, Paginated} from '../BaseInterfaces.js';
import {ConditionModel} from './Conditions/index.js';

export interface PipelineBackendVersion {
    version: '1' | '2';
}

interface PipelineInterfaceUrl {
    /**
     * Url of the pages affected by this query pipeline.
     *
     * string
     *
     * @example: 'www.acme.com'
     */
    url: string;
}

interface PipelineAduiConfigTooltipsDismissed {
    /**
     * The identifier of the tooltip that was dismissed.
     *
     * string
     */
    id: string;
}

interface PipelineAduiConfig {
    /**
     * A list of tooltips that were dismissed by the user.
     */
    tooltipsDismissed?: PipelineAduiConfigTooltipsDismissed[];
}

interface PipelineShared {
    /**
     * The name of this query pipeline.
     *
     * string
     *
     * @example: 'Community'
     */
    name: string;
    /**
     * The intended purpose of this query pipeline.
     * 
     * string
     *
     * @example: 'Provide contextually relevant query recommendations/results to Community site users.'
     
     */
    description?: string;
    /**
     * Whether this query pipeline is the default query pipeline.
     *
     * **Note**: There must be one and only one default query pipeline in a Coveo Cloud organization.
     * Therefore, setting isDefault to true on this query pipeline will automatically
     * set it to false in the current default query pipeline as a side effect
     * (assuming, of course, that this query pipeline is not the current default query pipeline).
     *
     * boolean
     *
     * @example: false
     */
    isDefault?: boolean;
    /**
     *
     */
    condition?: ConditionModel;
    /**
     * Whether to enable the A/B test.
     *
     * See also the `splitTestName`, `splitTestTarget`, and `splitTestRatio` properties.
     *
     * boolean
     */
    splitTestEnabled?: boolean;
    /**
     * A name which summarizes the intended purpose of the A/B test.
     *
     * See also the `splitTestTarget`, `splitTestRatio`, and `splitTestEnabled` properties.
     *
     * string
     *
     * @example: 'Community VS default'
     */
    splitTestName?: string;
    /**
     * The percentage of queries to route through query pipeline B if the A/B test is enabled.
     * Remaining queries will be routed through this query pipeline.
     *
     * See also the `splitTestName`, `splitTestTarget`, and `splitTestEnabled` properties.
     *
     * double
     * maximum: 1
     * minimum: 0
     *
     * @example: 0.5
     */
    splitTestRatio?: number;
    /**
     * The unique identifier of query pipeline B in the A/B test.
     *
     * See also the `splitTestName`, `splitTestRatio`, and `splitTestEnabled` properties.
     *
     * string
     *
     * @example: '22a3860e-fa6f-4e64-a9f1-ef738af0786e'
     */
    splitTestTarget?: string;
    /**
     * A constant query expression to add to all queries routed through this query pipeline.
     *
     * **Notes**:
     * - The filter expression is added to the constant part of the query expression (cq)
     * using an AND operator;
     * - Avoid including dynamically evaluated values in the filter expression,
     * otherwise you risk filling up the cache with useless data.
     *
     * string
     *
     * @example: '@source==CommunityForum OR @source==CommunityDocumentation'
     */
    filter?: string;
    /**
     * The use case for which this query pipeline should apply.
     * This option allows you to categorize your query pipeline and enables Coveo
     * to provide better support and improve the tools we provide.
     *
     * string
     *
     * @example: 'Service & Support'
     */
    useCase?: string;
    interfaceUrls?: PipelineInterfaceUrl[];
    aduiConfig?: PipelineAduiConfig;
}

export interface PipelineModel extends PipelineShared {
    /**
     * The unique identifier of this query pipeline.
     *
     * string
     *
     * @example: '120deecf-7822-4d7b-885f-53f184a3a76c'
     */
    id: string;
    /**
     * The 0-based position of this query pipeline relative to other query pipelines
     * in this Coveo Cloud organization.
     *
     * integer
     *
     * @example: 3
     */
    position?: number;
    /**
     * The identifier of the Coveo Cloud platform user who originally created this query pipeline.
     *
     * string
     *
     * @example: 'asmith@coveo.com'
     */
    created_by?: string;
    /**
     * The identifier of the Coveo Cloud platform user who last modified this query pipeline.
     *
     * string
     *
     * @example: 'bjones@coveo.com'
     */
    last_modified_by?: string;
    statementComposition?: {
        totalCount?: number;
        [key: string]: number | undefined;
    };
}

export interface NewPipelineModel extends PipelineShared, GranularResource {}
export interface UpdatePipelineModel extends PipelineModel, GranularResource {}

export interface ListPipelinesOptions extends Paginated {
    /**
     * Whether to sort the results in ascending order.
     */
    isOrderAscending?: boolean;
    /**
     * The query filter to match.
     *
     * This allows you to search within query pipeline statement definitions and descriptions.
     *
     * By default, results are not required to match a specific query filter.
     */
    filter?: string;
    /**
     * The sort criteria to apply on the results.
     *
     * Allowed values: `definition`, `description`, and `position`.
     *
     * Default: `position`
     */
    sortby?: 'definition' | 'description' | 'position';
    feature?: string;
    /**
     * The unique identifier of the target Coveo Cloud organization.
     *
     * Specifying a value for this parameter is only necessary when you are authenticating the API call with an OAuth2 token.
     */
    organizationId?: string;
    /**
     * Whether to enable pagination.
     */
    enablePagination?: boolean;
}

export type PaginatedListPipelinesModel = Omit<PageModel<PipelineModel>, 'totalPages'>;

export type ListPipelinesReturnVariant<ListPipelineVariant> = ListPipelineVariant extends {enablePagination: true}
    ? PaginatedListPipelinesModel
    : PipelineModel[];
