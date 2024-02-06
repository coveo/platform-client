import {
    HostedInterfaceConfiguration,
    HostedInterfaceOption,
    HostedInterfaceResultTemplate,
    HostedInterfaceResultTemplateBadge,
    IAccesses,
    ISortCriteria,
} from '../HostedInterfacesCore/index.js';

export enum SearchPageResultActions {
    copyToClipboard = 'copyToClipboard',
    quickview = 'quickview',
}

export interface SearchPageResultTemplate extends Omit<HostedInterfaceResultTemplate, 'badge'> {
    /**
     * The badge to display.
     */
    badges: HostedInterfaceResultTemplateBadge[];
    /**
     * Whether the description is enabled.
     */
    descriptionEnabled: boolean;
    /**
     * Size of the image.
     */
    imageSize?: string;
    /**
     * Actions to display.
     */
    resultActions: Record<SearchPageResultActions, HostedInterfaceOption>;
}

export enum SearchPageLayout {
    List = 'list',
    Grid = 'grid',
}

export interface SearchPageColors {
    /**
     * Accent1 color.
     */
    accent1: string;

    /**
     * Accent2 color.
     */
    accent2: string;

    /**
     * The background color.
     */
    background: string;

    /**
     * The titles color.
     */
    titles: string;

    /**
     * The text color.
     */
    normalText: string;

    /**
     * The navigation background color.
     */
    navigationBackground: string;
}

export interface SearchPageStyle {
    /**
     * The colors of the Search Page.
     */
    colors: SearchPageColors;

    /**
     * The font-family of the Search Page.
     */
    fontFamily: string;
}

export interface SearchPageSettings {
    /**
     * An option enabling the use of smart snippets.
     */
    smartSnippets: HostedInterfaceOption;
    /**
     * An option enabling the use of the query history.
     */
    queryHistory: HostedInterfaceOption;
    /**
     * An option enabling the use of the query suggestions.
     */
    querySuggestions: HostedInterfaceOption;
    /**
     * An option enabling the use of the people also ask feature.
     */
    peopleAlsoAsk: HostedInterfaceOption;
    /**
     * An option enabling the use of the generative question answering feature.
     */
    genQA: HostedInterfaceOption;
}

export interface SearchPageInterfaceConfiguration extends Omit<HostedInterfaceConfiguration, 'tabs'> {
    /**
     * The list of result templates defined for the Search Page.
     */
    resultTemplates: SearchPageResultTemplate[];

    /**
     * The list of sort criteria defined for the Search Page.
     */
    sortCriteria: ISortCriteria[];

    /**
     * The access rules defined for the Search Page.
     */
    accesses: IAccesses;

    /**
     * The layout of the Search Page.
     */
    layout: SearchPageLayout;

    /**
     * The style configuration.
     */
    style: SearchPageStyle;

    /**
     * The settings configuration.
     */
    settings: SearchPageSettings;

    /**
     * The date of creation of the interface
     */
    created: string;

    /**
     * The original author of the interface
     */
    createdBy: string;

    /**
     * The date of the interface's latest update
     */
    updated: string;

    /**
     * The author of the interface's latest update
     */
    updatedBy: string;
}
