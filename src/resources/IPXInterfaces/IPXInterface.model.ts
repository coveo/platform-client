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
    label: string;
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
    /**
     * The list of result templates defined for the ipx.
     */
    resultTemplates: IPXResultTemplate[];

    /**
     * The button element of the ipx interface.
     */
    button: IPXButton;
}
