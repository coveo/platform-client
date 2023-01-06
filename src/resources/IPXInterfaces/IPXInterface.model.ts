import {
    HostedInterfaceResultTemplateLayout,
    HostedInterfaceCondition,
    HostedInterfaceResultTemplateBadge,
    HostedInterfaceResultTemplateDetail,
    HostedInterfaceFacet,
    HostedInterfaceTab,
} from '../HostedInterfacesCore';

export interface IPXResultTemplate {
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
}

export interface IPXButton {
    label: string;
}

export interface IPXInterfaceConfiguration {
    /**
     * The ipx identifier.
     */
    id: string;
    /**
     * The name of the ipx interface.
     */
    name: string;
    /**
     * The list of result templates defined for the ipx.
     */
    resultTemplates: IPXResultTemplate[];
    /**
     * The list of facets to display.
     */
    facets: HostedInterfaceFacet[];
    /**
     * The list of tabs to display.
     */
    tabs: HostedInterfaceTab[];
    /**
     * The button element of the ipx interface.
     */
    button: IPXButton;
}
