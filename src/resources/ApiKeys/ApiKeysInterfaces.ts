import {GranularResource, PrivilegeModel} from '../BaseInterfaces';

export interface ApiKeyModel extends GranularResource {
    /**
     * The unique identifier of the [organization](https://docs.coveo.com/en/222/) the API key was created for.
     */
    organizationId?: string;
    /**
     * The unique identifier of the API key.
     *
     * **Example:** t4hk287bfj5sg6wskg64ckk5a
     */
    id?: string;
    /**
     * Whether the API key is enabled.
     */
    enabled?: boolean;
    /**
     * The value of the API key.
     *
     * **Example:** xx65151ec3-7b30-4772-a99a-09b4c0f71343
     */
    value?: string;
    /**
     * The display name for the API key.
     *
     * **Example:** PushApiKey
     */
    displayName?: string;
    /**
     * A brief description of the API key.
     *
     * **Example:** API key used for managing sources.
     */
    description?: string;
    /**
     * The username or the email address that was used to create this API key.
     */
    createdBy?: any;
    /**
     * The API key creation date in Unix timestamp in milliseconds.
     *
     * **Example:** 1614969486000
     */
    createdDate?: number;
    /**
     * The approximate API key last used date in Unix timestamp in milliseconds.
     *
     * **Example:** 1624575600000
     */
    lastUsedDate?: number;
    /**
     * A set of IP addresses allowed to use the API key.
     *
     * **Notes:**
     * - IP ranges using CIDR notation are also supported.
     * - If an IP address is included in both the `allowedIps` as well as the `deniedIps`, the IP address will be denied.
     *
     * **Example:** [`"192.168.0.0/16"`, `"29.186.225.13"`]
     */
    allowedIps?: string[];
    /**
     * A set of IP addresses that will be denied access when attempting to use the API key.
     *
     * **Notes:**
     * - IP ranges using CIDR notation are also supported.
     * - If an IP address is included in both the `allowedIps` as well as the `deniedIps`, the IP address will be denied.
     *
     * **Example:** [`"192.168.0.0/16"`, `"29.186.225.13"`]
     */
    deniedIps?: string[];
    /**
     * A set of privileges.
     */
    privileges?: PrivilegeModel[];
    /**
     * The unique identifier of the API key.
     *
     * **Example:** t4hk287bfj5sg6wskg64ckk5a
     */
    resourceId?: string;
}

export interface CreateApiKeyOptions {
    /**
     * The unique identifier of the template on which to base the API key.
     */
    apiKeyTemplateId?: string;
}
