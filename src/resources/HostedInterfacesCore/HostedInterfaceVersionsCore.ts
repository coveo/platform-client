import {Paginated} from '../BaseInterfaces.js';
import {SortingBy, SortingOrder} from '../Enums.js';

export interface HostedInterfaceChangeInfo {
    /**
     * The change date and time in ISO-8601 format.
     */
    date: string;
    /**
     * The user identity in the following form: `user@domain-provider`.
     */
    by: string;
    /**
     * The user's first name specified in the provider's user profile (e.g., the Google account).
     */
    firstName?: string;
    /**
     * The user's last name specified in the provider's user profile (e.g., the Google account).
     */
    lastName?: string;
}

export interface HostedInterfaceVersionInfo {
    /**
     * The version number.
     */
    version: number;
    /**
     * The optional version label.
     */
    label?: string;
    /**
     * The version creation information.
     */
    created: HostedInterfaceChangeInfo;
    /**
     * The version update information.
     */
    updated: HostedInterfaceChangeInfo;
    /**
     * Indicates whether the version is currently published.
     */
    isPublished: boolean;
}

/**
 * @param <T> - Hosted interface config model
 */
export interface HostedInterfaceVersion<T> {
    /**
     * The version number.
     */
    version: number;
    /**
     * The optional version label.
     */
    label?: string;
    /**
     * The version creation information.
     */
    created: HostedInterfaceChangeInfo;
    /**
     * The version update information.
     */
    updated: HostedInterfaceChangeInfo;
    /**
     * Indicates whether the version is currently published.
     */
    isPublished: boolean;
    /**
     * This version's interface config.
     */
    configuration: T;
    /**
     * When an interface is restored, indicates the source version number.
     */
    restoredFromVersion?: number;
}

export interface ListHostedInterfaceVersionsParams extends Paginated {
    /**
     * The zero-based page to retrieve.
     * @default `0`
     */
    page?: number;
    /**
     * The number of versions to return per page.
     * @default `10`
     */
    perPage?: number;
    /**
     * A substring that must appear in a version label for this configuration to appear in results.
     */
    filter?: string;
    /**
     * The sort order to apply on the interface version number.
     *
     * **Allowed values:**
     * - `undefined`: Configurations are returned in no specific order.
     * - `asc`: Sort version by number in ascending order.
     * - `desc`: Sort version by number in descending order.
     * @default `undefined`
     */
    order?: 'asc' | 'desc';
}

export interface UpdateVersionedHostedInterfaceExtraParams {
    /**
     * The label to describe this particular interface version being created.
     */
    versionLabel?: string;
}

export interface UpdateInterfaceVersionLabelParams {
    /**
     * The optional version label.
     */
    label?: string;
}

export interface RestoreInterfaceVersionParams {
    /**
     * The optional version label.
     */
    label?: string;
}

export type NewHostedInterface<T, K extends keyof T | null = null> = Omit<
    Partial<T> & {name: string},
    'id' | 'created' | 'createdBy' | 'updated' | 'updatedBy' | NonNullable<K>
>;
export type ExistingHostedInterface<T, K extends keyof T | null = null> = Omit<
    T,
    'id' | 'created' | 'createdBy' | 'updated' | 'updatedBy' | NonNullable<K>
>;

export interface IAccesses {
    /**
     * The list of users that are allowed to access the search interface.
     */
    users: string[];

    /**
     * The list of domains that are allowed to access the search interface.
     */
    domains: string[];

    /**
     * When set to true, all users can share and see the search page.
     * @default false
     */
    sharingLinkEnabled?: boolean;

    /**
     * When set to true, the domain sharing is enabled. Otherwise, only users that have explicitly access to the search page can access it.
     * @default false
     */
    sharingDomainEnabled?: boolean;
}

export interface ISortCriteria {
    /**
     * Indicates the kind of sort criterion.
     */
    by: SortingBy;

    /**
     * Label of the sort criterion.
     */
    label: string;

    /**
     * Specify the sort order if applicable.
     * Default value when sorting by date is descending.
     * Default value when sorting by field is ascending.
     * No sort order value is applicable when sorting by relevancy.
     */
    order?: SortingOrder;

    /**
     * The [field](https://docs.coveo.com/en/200) on which the sort is based on. For example: filetype.
     * Required when sorting by field.
     * This property is ignored unless you are sorting by field.
     */
    field?: string;
}

export interface IManifestParameters {
    /**
     * The placeholders for the page.
     */
    pagePlaceholders?: IPagePlaceholders;
}

export interface IPagePlaceholders {
    /**
     * A placeholder for the result list and result templates.
     */
    results?: string;
}
