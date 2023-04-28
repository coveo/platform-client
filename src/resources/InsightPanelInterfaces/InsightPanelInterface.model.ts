import {
    HostedInterfaceCondition,
    HostedInterfaceConfiguration,
    HostedInterfaceFacet,
    HostedInterfaceResultTemplate,
    HostedInterfaceResultTemplateBadge,
    HostedInterfaceResultTemplateDetail,
    HostedInterfaceTab,
    ListHostedInterfacesParams,
} from '../HostedInterfacesCore/index.js';

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

export interface InsightPanelResultTemplateBadge extends HostedInterfaceResultTemplateBadge {}

export interface InsightPanelCondition extends HostedInterfaceCondition {}

export interface InsightPanelResultTemplateDetail extends HostedInterfaceResultTemplateDetail {}

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
    /**
     * An option enabling a tag identifying featured results.
     */
    featured?: InsightPanelResultTagOptions;
}

export interface InsightPanelResultTemplate extends HostedInterfaceResultTemplate {
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

export interface InsightPanelFacet extends HostedInterfaceFacet {}

export interface InsightPanelTab extends HostedInterfaceTab {
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

export interface InsightPanelInterfaceConfiguration extends HostedInterfaceConfiguration {
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

export interface IListInsightPanelInterfacesParameters extends ListHostedInterfacesParams {}
