import {HostedInterfaceConfiguration, HostedInterfaceResultTemplate} from '../HostedInterfacesCore';

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

export interface InsightPanelResultTemplate extends HostedInterfaceResultTemplate {
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

export interface InsightPanelInterfaceConfiguration extends HostedInterfaceConfiguration {
    /**
     * The list of result templates defined for the insight panel.
     */
    resultTemplates: InsightPanelResultTemplate[];

    /**
     * The insight panel settings.
     */
    settings: InsightPanelSettings;
}
