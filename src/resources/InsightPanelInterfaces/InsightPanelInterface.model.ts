import { HostedInterfaceCondition, HostedInterfaceFacet, HostedInterfaceResultTemplateBadge, HostedInterfaceResultTemplateDetail, HostedInterfaceResultTemplateLayout, HostedInterfaceTab } from "../HostedInterfacesCore";

export enum InsightPanelConditionOperator {
    isDefined = 'isDefined',
    isNotDefined = 'isNotDefined',
    MustMatch = 'mustMatch',
    MustNotMatch = 'mustNotMatch',
}

interface InsightPanelOption {
    enabled: boolean;
}

interface InsightPanelResultTagOptions {
    enabled: boolean;
    color: string;
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
    layout: HostedInterfaceResultTemplateLayout;

    /**
     * The conditions a result needs to meet to use the template.
     */
    conditions: HostedInterfaceCondition[];

    /**
     * The badge to display.
     */
    badge: HostedInterfaceResultTemplateBadge;

    /**
     * The metadata details to display.
     */
    details: HostedInterfaceResultTemplateDetail[];

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
    facets: HostedInterfaceFacet[];

    /**
     * The list of tabs to display.
     */
    tabs: HostedInterfaceTab[];

    /**
     * The insight panel settings.
     */
    settings: InsightPanelSettings;
}