import {Paginated, WithRequired} from '../BaseInterfaces.js';

/**
 * Defines the options to list Insight Panel configurations.
 */
export interface InsightPanelConfigListOptions extends Paginated {
    /**
     * The zero-based page to retrieve.
     *
     * @default `0`
     */
    page?: number;
    /**
     * The number of configurations to return per page.
     *
     * @default `10`
     */
    perPage?: number;
    /**
     * A substring that must appear in a search interface configuration name for this configuration to appear in results.
     */
    filter?: string;
    /**
     * The sort order to apply on the Insight Panel configuration name.
     *
     * **Allowed values:**
     * - `undefined`: Configurations are returned in no specific order.
     * - `asc`: Sort configurations by name in ascending order.
     * - `desc`: Sort configurations by name in descending order.
     *
     * @default `undefined`
     */
    order?: 'asc' | 'desc';
}

/**
 * Defines the parameters required to create an Insight Panel configuration.
 */
export interface InsightPanelConfigCreationParams {
    /**
     * The ID of the Insight Panel configuration.
     */
    id: string;

    /**
     * The name of the Insight Panel configuration.
     */
    name: string;

    /**
     * The ID of the associated query pipeline.
     */
    pipeline: string;

    /**
     * The context field mappings to use when performing queries. This mapping allows an Insight Panel integration to retrieve the context information from the CRM and pass it to the Coveo platform when executing Insight Panel queries.
     *
     * The key is the context information such as `subject` or `description`.
     *
     * The value is a CRM reference allowing the Insight Panel integration to retrieve the context information from the CRM.
     *
     * @example
     * ```json
     * {
     *   "subject": "Case_subject",
     *   "description": "Case_description"
     * }
     * ```
     */
    contextFields?: Record<string, string>;
}

/**
 * Defines the parameters required to update an Insight Panel configuration.
 */
export interface InsightPanelConfigUpdateParams
    extends WithRequired<InsightPanelConfigCreationParams, 'contextFields'> {
    /**
     * A list of the associated interface configs.
     */
    interfaces?: string[];
}

/**
 * Defines an Insight Panel configuration.
 */
export interface InsightPanelConfigModel {
    /**
     * The Insight Panel configuration ID.
     */
    id: string;
    /**
     * The Insight Panel configuration name.
     */
    name: string;
    /**
     * The summary information specific to the associated query pipeline.
     */
    pipeline: {
        /**
         * The query pipeline ID.
         */
        id: string;
        /**
         * The query pipeline name.
         */
        name: string;
        /**
         * The associated ML models information.
         */
        models: {
            /**
             * Information related to the Automatic Relevance Tuning (ART) ML model.
             */
            art: {
                /**
                 * Indicates whether an ART ML model is configured in the query pipeline.
                 */
                enabled: boolean;
            };
            /**
             * Information related to the Dynamic Navigation Experience (DNE) ML model.
             */
            dne: {
                /**
                 * Indicates whether a DNE ML model is configured in the query pipeline.
                 */
                enabled: boolean;
            };
            /**
             * Information related to the Query Suggestions (QS) ML model.
             */
            qs: {
                /**
                 * Indicates whether a QS ML model is configured in the query pipeline.
                 */
                enabled: boolean;
            };
        };
    };
    /**
     * The search hub value affected to this Insight Panel configuration.
     */
    searchHub: string;
    /**
     * The context field mappings to use when performing queries. This mapping allows an Insight Panel integration to retrieve the context information from the CRM and pass it to the Coveo platform when executing Insight Panel queries.
     *
     * The key is the context information such as `subject` or `description`.
     *
     * The value is a CRM reference allowing the Insight Panel integration to retrieve the context information from the CRM.
     *
     * @example
     * ```json
     * {
     *   "subject": "Case_subject",
     *   "description": "Case_description"
     * }
     * ```
     */
    contextFields: Record<string, string>;
    /**
     * A list of the associated interface configs.
     */
    interfaces: string[];
}
