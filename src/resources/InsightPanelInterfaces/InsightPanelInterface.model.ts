import {Paginated} from '../BaseInterfaces';

export enum InsightPanelConditionOperator {
    isDefined = 'isDefined',
    isNotDefined = 'isNotDefined',
    MustMatch = 'mustMatch',
    MustNotMatch = 'mustNotMatch',
}

export enum InsightPanelResultTemplateLayout {
    Default = 'default',
    Thumbnail = 'thumbnail',
}

interface InsightPanelOption {
    enabled: boolean;
}

interface InsightPanelResultTagOptions {
    enabled: boolean;
    color: string;
}

export interface InsightPanelResultTemplateBadge {
    /**
     * The field who's value should be displayed in the badge.
     */
    field: string;

    /**
     * The text to display in the badge.
     */
    label?: string;

    /**
     * The RGB HEX code for the color of the badge.
     */
    color: string;
}

export interface InsightPanelCondition {
    /**
     * The [field](https://docs.coveo.com/en/200) to evaluate.
     */
    field: string;

    /**
     * The operator used to evaluate the field condition.
     * Possible values are:
     * - `'isDefined'`
     * - `'isNotDefined'`
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    conditionType: InsightPanelConditionOperator;

    /**
     * The values used as the right side operand when the `operator` is one of:
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    values?: string[];
}

export interface InsightPanelResultTemplateDetail {
    /**
     * The [field](https://docs.coveo.com/en/200) containing the metadata to display.
     */
    field: string;
    /**
     * The label to show describing the metadata.
     */
    label?: string;
}

export interface InsightPanelResultActions {
    /**
     * An option enabling the ability to attach a given result to a case record.
     */
    attachToCase?: InsightPanelOption;
    /**
     * An option enabling the ability to copy result metadata to the clipboard.
     */
    copyToClipboard?: InsightPanelOption;
    /**
     * An option enabling the ability to view the result document in a quick view modal.
     */
    quickView?: InsightPanelOption;
    /**
     * An option enabling the ability to send the result as an email.
     */
    sendAsEmail?: InsightPanelOption;
    /**
     * An option enabling the ability to send the result to the case feed.
     */
    sendToFeed?: InsightPanelOption;
}

export interface InsightPanelResultTags {
    /**
     * An option enabling a tag identifying results that have been viewed by the customer who submitted the case.
     */
    viewedByCustomer?: InsightPanelResultTagOptions;
    /**
     * An option enabling a tag identifying recommended results.
     */
    recommended?: InsightPanelResultTagOptions;
}

export interface InsightPanelResultTemplate {
    /**
     * The name of the result template.
     */
    name: string;

    /**
     * The template layout to use.
     * Possible values are:
     * - `'default'`
     * - `'thumbnail'`
     */
    layout: InsightPanelResultTemplateLayout;

    /**
     * The conditions a result needs to meet to use the template.
     */
    conditions: InsightPanelCondition[];

    /**
     * The badge to display.
     */
    badge: InsightPanelResultTemplateBadge;

    /**
     * The metadata details to display.
     */
    details: InsightPanelResultTemplateDetail[];

    /**
     * The available result actions.
     */
    resultActions: InsightPanelResultActions;

    /**
     * The tags allowed to be displayed.
     */
    tags: InsightPanelResultTags;
}

export type DisplayValueType = 'checkbox' | 'link';

export interface InsightPanelFacet {
    /**
     * The [field](https://docs.coveo.com/en/200) on which the facet is based.
     */
    field: string;

    /**
     * The label of the facet.
     */
    label: string;

    /**
     * Whether to display the facet values as checkboxes (multiple selection) or links (single selection).
     * Possible values are:
     * - `'checkbox'`
     * - `'link'`
     */
    displayValuesAs: DisplayValueType;
}

export interface InsightPanelTab {
    /**
     * The label to be displayed in the tab.
     */
    label: string;

    /**
     * A constant query expression or filter that the Tab should add to any outgoing query.
     *
     * **Example:**
     *
     * `@objecttype==Message`
     */
    conditions: InsightPanelCondition[];
}

export interface UserActionsOptions {
    /**
     * Whether to enable the feature.
     */
    enabled: boolean;
    /**
     * Whether to show documents recently clicked by the user.
     */
    recentClickedDocuments: InsightPanelOption;
    /**
     * Whether to show recent queries performed by the user.
     */
    recentQueries: InsightPanelOption;
    /**
     * Whether to show a timeline of the user's actions.
     */
    timeline: InsightPanelOption;
}

export interface InsightPanelSettings {
    /**
     * Display a button to create a knowledge article.
     */
    createArticle: InsightPanelOption;
    /**
     * Display a button to open a full search page.
     */
    fullSearch: InsightPanelOption;
    /**
     * Options to configure a view of the actions taken by the user who submitted the case.
     */
    userActions: UserActionsOptions;
}

export interface InsightPanelInterfaceConfiguration {
    /**
     * The configuration identifier.
     */
    id: string;

    /**
     * The name of the insight panel interface configuration.
     */
    name: string;

    /**
     * The list of result templates defined for the insight panel.
     */
    resultTemplates: InsightPanelResultTemplate[];

    /**
     * The list of facets to display.
     */
    facets: InsightPanelFacet[];

    /**
     * The list of tabs to display.
     */
    tabs: InsightPanelTab[];

    /**
     * The insight panel settings.
     */
    settings: InsightPanelSettings;
}

export interface IListInsightPanelInterfacesParameters extends Paginated {
    /**
     * A substring that must appear in an insight panel interface configuration name for this configuration to appear in results.
     */
    filter?: string;

    /**
     * The sort direction of the results.
     * Possible values:
     * - `'asc'`: ascending order
     * - `'desc'`: descending order.
     */
    order?: 'desc' | 'asc';

    /**
     * The 0-based number of the page of configurations to list.
     */
    page?: number;

    /**
     * The maximum number of configurations to include per page.
     */
    perPage?: number;
}
