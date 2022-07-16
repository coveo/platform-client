import {Paginated} from '../BaseInterfaces';

export enum IPConditionOperator {
    MustBeDefined = 'mustBeDefined',
    MustNotBeDefined = 'mustNotBeDefined',
    MustMatch = 'mustMatch',
    MustNotMatch = 'mustNotMatch',
}

export enum IPResultTag {
    Recommended = 'recommended',
    ViewedByCustomer = 'viewedByCustomer',
}

export enum IPResultAction {
    AttachToCase = 'attachToCase',
    CopyToClipboard = 'copyToClipboard',
    QuickView = 'quickView',
    SendAsEmail = 'sendAsEmail',
    SendToFeed = 'sendToFeed',
}

export enum IPResultTemplateLayout {
    Default = 'default',
    Thumbnail = 'thumbnail',
}

export interface IPResultTemplateBadge {
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

export interface IPResultTemplateCondition {
    /**
     * The [field](https://docs.coveo.com/en/200) to evaluate.
     */
    field: string;

    /**
     * The operator used to evaluate the field condition.
     * Possible values are:
     * - `'mustBeDefined'`
     * - `'mustNotBeDefined'`
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    operator: IPConditionOperator;

    /**
     * The values used as the right side operand when the `operator` is one of:
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    values?: string[];
}

export interface IPResultTemplateDetail {
    /**
     * The [field](https://docs.coveo.com/en/200) containing the metadata to display.
     */
    field: string;
    /**
     * The label to show describing the metadata.
     */
    label: string;
}

export interface IPResultTemplate {
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
    layout: IPResultTemplateLayout;

    /**
     * The conditions a result needs to meet to use the template.
     */
    conditions: IPResultTemplateCondition[];

    /**
     * The badge to display.
     */
    badge: IPResultTemplateBadge;

    /**
     * The metadata details to display.
     */
    details: IPResultTemplateDetail[];

    /**
     * The available result actions.
     */
    resultActions: IPResultAction[];

    /**
     * The tags allowed to be displayed.
     */
    tags: IPResultTag[];
}

export type DisplayValueType = 'checkbox' | 'link';

export interface IPFacet {
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

export interface IPTab {
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
    condition: string;
}

interface IPOption {
    enabled: boolean;
}

export interface UserActionsOptions {
    /**
     * Whether to enable the feature.
     */
    enabled: boolean;
    /**
     * Whether to show documents recently clicked by the user.
     */
    recentClickedDocuments: IPOption;
    /**
     * Whether to show recent queries performed by the user.
     */
    recentQueries: IPOption;
    /**
     * Whether to show a timeline of the user's actions.
     */
    timeline: IPOption;
}

export interface IPSettings {
    /**
     * Display a button to create a knowledge article.
     */
    createArticle: IPOption;
    /**
     * Display a button to open a full search page.
     */
    fullSearch: IPOption;
    /**
     * Options to configure a view of the actions taken by the user who submitted the case.
     */
    userActions: UserActionsOptions;
}

export interface IPInterfaceConfiguration {
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
    resultTemplates: IPResultTemplate[];

    /**
     * The list of facets to display.
     */
    facets: IPFacet[];

    /**
     * The list of tabs to display.
     */
    tabs: IPTab[];

    /**
     * The insight panel settings.
     */
    settings: IPSettings;
}

export interface IListIPInterfacesParameters extends Paginated {
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
