import {Paginated} from '..';

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
     * Interface of this version.
     */
    configuration: T;
    /**
     * When an interface is restored, indicates the source version number.
     */
    restoredFromVersion?: number;
}

export interface UpdateInterfaceVersionLabelParams {
    label: string;
}

export interface ListHostedInterfaceVersionsParams extends Paginated {
    /**
     * The zero-based page to retrieve.
     *
     * @default `0`
     */
    page?: number;
    /**
     * The number of versions to return per page.
     *
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
     *
     * @default `undefined`
     */
    order?: 'asc' | 'desc';
}

export interface UpdateVersionedHostedInterfaceExtraParams {
    /**
     * The label to describe this particular interface version.
     */
    versionLabel?: string;
}
