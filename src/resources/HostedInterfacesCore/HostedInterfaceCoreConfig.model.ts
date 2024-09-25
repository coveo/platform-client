import {Paginated} from '../BaseInterfaces.js';
import {ListResourceByProjectParams, ProjectResourceModel} from '../Projects/ProjectInterfaces.js';

export interface HostedInterfaceResultTemplateBadge {
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

export enum HostedInterfaceConditionOperator {
    IsDefined = 'isDefined',
    IsNotDefined = 'isNotDefined',
    MustMatch = 'mustMatch',
    MustNotMatch = 'mustNotMatch',
}

export interface HostedInterfaceOption {
    enabled: boolean;
}

export interface HostedInterfaceCondition {
    /**
     * The [field](https://docs.coveo.com/en/200) to evaluate.
     */
    field: string;

    /**
     * The values used as the right side operand when the `operator` is one of:
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    values?: string[];

    /**
     * The operator used to evaluate the field condition.
     * Possible values are:
     * - `'isDefined'`
     * - `'isNotDefined'`
     * - `'mustMatch'`
     * - `'mustNotMatch'`
     */
    conditionType: HostedInterfaceConditionOperator;
}

export interface HostedInterfaceResultTemplateDetail {
    /**
     * The [field](https://docs.coveo.com/en/200) containing the metadata to display.
     */
    field: string;
    /**
     * The label to show describing the metadata.
     */
    label?: string;
}

export type DisplayValueType = 'checkbox' | 'link';

export interface HostedInterfaceFacet {
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

export interface HostedInterfaceTab {
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
    conditions: HostedInterfaceCondition[];
}

export interface ListHostedInterfacesParams extends Paginated {
    /**
     * A substring that must appear in a hosted interface configuration name for this configuration to appear in results.
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

export interface ListHostedInterfacesByProjectParams extends ListHostedInterfacesParams, ListResourceByProjectParams {}

export interface HostedInterfaceResultTemplate {
    /**
     * The name of the result template.
     */
    name: string;

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
}

export interface HostedInterfaceProjectsResultTemplate extends HostedInterfaceResultTemplate, ProjectResourceModel {}

export interface HostedInterfaceConfiguration {
    /**
     * The configuration identifier.
     */
    id: string;

    /**
     * The name of the interface configuration.
     */
    name: string;

    /**
     * The list of facets to display.
     */
    facets: HostedInterfaceFacet[];

    /**
     * The list of tabs to display.
     */
    tabs: HostedInterfaceTab[];
}

export interface IManifestResponse<Configuration> {
    /**
     * The HTML markup of the search interface along with configured placeholders.
     */
    markup: string;
    /**
     * The Atomic results configuration information.
     */
    results: IPageManifestResults;
    /**
     * The Atomic related styling in CSS format.
     */
    style: IPageManifestStyle;
    /**
     * The complete search interface configuration.
     */
    config: Configuration;
}

export interface IPageManifestResultTemplate {
    /**
     * The HTML markup of the content of the result template.
     */
    markup: string;
    /**
     * The Atomic [result template component](https://docs.coveo.com/en/atomic/latest/reference/components/atomic-result-template/)'s properties.
     */
    attributes: Record<string, string>;
}

export interface IPageManifestResults {
    /**
     * The placeholder for the result list and result templates.
     */
    placeholder?: string;
    /**
     * The Atomic [result list component](https://docs.coveo.com/en/atomic/latest/reference/components/atomic-result-list/#properties)'s properties.
     */
    attributes: Record<string, string>;
    /**
     * The Atomic result template configuration information.
     */
    templates: IPageManifestResultTemplate[];
}

export interface IPageManifestStyle {
    /**
     * The CSS to set [Atomic theme variables](https://docs.coveo.com/en/atomic/latest/usage/themes-and-visual-customization/#theme-variables).
     */
    theme: string;
    /**
     * The page layout CSS.
     */
    layout: string;
}
