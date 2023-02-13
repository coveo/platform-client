import {
    HostedInterfaceCondition,
    HostedInterfaceConfiguration,
    HostedInterfaceFacet,
    HostedInterfaceResultTemplate,
    HostedInterfaceResultTemplateBadge,
    HostedInterfaceResultTemplateDetail,
    HostedInterfaceTab,
} from '../HostedInterfacesCore/index.js';

export enum IPXResultTemplateLayout {
    Default = 'default',
    Thumbnail = 'thumbnail',
}

export interface IPXFacet extends HostedInterfaceFacet {}

export interface IPXCondition extends HostedInterfaceCondition {}
export interface IPXTab extends HostedInterfaceTab {
    /**
     * A constant query expression or filter that the Tab should add to any outgoing query.
     *
     * **Example:**
     *
     * `@objecttype==Message`
     */
    conditions: IPXCondition[];
}

export interface IPXResultTemplateBadge extends HostedInterfaceResultTemplateBadge {}

export interface IPXResultTemplateDetail extends HostedInterfaceResultTemplateDetail {}

export interface IPXResultTemplate extends HostedInterfaceResultTemplate {
    layout: IPXResultTemplateLayout;
    /**
     * The conditions a result needs to meet to use the template.
     */
    conditions: IPXCondition[];

    /**
     * The badge to display.
     */
    badge: IPXResultTemplateBadge;

    /**
     * The metadata details to display.
     */
    details: IPXResultTemplateDetail[];
}

export interface IPXButton {
    /**
     * The label appearing on the IPX button.
     */
    label?: string;

    /**
     * The icon appearing on the IPX button when the IPX is open.
     */
    closeIcon?: string;

    /**
     * The icon appearing on the IPX button when the IPX is close.
     */
    openIcon?: string;
}

export interface IPXContainer {
    /**
     * Whether the IPX is using a target selector.
     */
    usesTargetSelector?: boolean;

    /**
     * The IPX button information.
     */
    button?: IPXButton;

    /**
     * The CSS selector used to target the host component of the IPX when usesTargetSelector is true.
     */
    targetSelector?: string;
}

export interface IPXColors {
    /**
     * Primary color.
     */
    primary: string;

    /**
     * The background color.
     */
    background: string;

    /**
     * The neutral color.
     */
    neutral: string;

    /**
     * The visited link color.
     */
    visitedLink: string;

    /**
     * The titles color.
     */
    titles: string;

    /**
     * The button color.
     */
    button: string;

    /**
     * The button label color.
     */
    buttonLabel: string;
}

export interface IPXStyle {
    /**
     * The colors of the IPX.
     */
    colors: IPXColors;

    /**
     * The font-family of the IPX.
     */
    fontFamily: string;
}

export interface IPXFooter {
    /**
     * The footer's label.
     */
    label?: string;

    /**
     * The footer's icon.
     */
    icon?: string;

    /**
     * The footer's link.
     */
    link?: string;
}

export interface IPXInterfaceConfiguration extends HostedInterfaceConfiguration {
    /**
     * The list of facets to display.
     */
    facets: IPXFacet[];

    /**
     * The list of tabs to display.
     */
    tabs: IPXTab[];

    /**
     * The list of result templates defined for the ipx.
     */
    resultTemplates: IPXResultTemplate[];

    /**
     * The list of 0 to 3 footers to display.
     */
    footer: IPXFooter[];

    /**
     * The container information.
     */
    container: IPXContainer;

    /**
     * The style configuration.
     */
    style: IPXStyle;
}
