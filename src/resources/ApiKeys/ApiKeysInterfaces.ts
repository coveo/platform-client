import {GranularResource, PrivilegeModel} from '../BaseInterfaces.js';
import {ApiKeyStatus} from '../Enums.js';
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
    id: string;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    /**
     * Additional configuration to be included in an API key. [to be revised]
     */
    additionalConfiguration?: AdditionalConfigurationModel;
    /**
     * The expiration date of the API key.
     */
    expirationDate?: number;
    /**
     * The status of the API key.
     */
    status?: ApiKeyStatus;
    /**
     * The ID of the template to which the API key is bound.
     */
    apiKeyTemplateId?: string;
    /**
     * The date of activation of the API key.
     */
    activationDate?: number;
    /**
     * The date the API key has been disabled.
     */
    disabledDate?: number;
}

export interface CreateApiKeyOptions {
    /**
     * The unique identifier of the template on which to base the API key.
     */
    apiKeyTemplateId?: string;
}

interface AdditionalConfigurationModel {
    /**
     * Configuration specific to commerce organization. [to be revised]
     */
    commerce?: CommerceConfigurationModel;
    search?: SearchConfigurationModel;
}

interface CommerceConfigurationModel {
    /**
     * The catalog identifier to be linked to an API key. [to be revised]
     */
    catalogId: string;
}

interface SearchConfigurationModel {
    apiKeyQueryAuthentication?: QueryAuthenticationModel[]; // TODO: ADUI-7802 - complete this information when the documentation is complete or the initial team confirm the API implementation.
    enforcedQueryPipelineConfiguration?: EnforceQueryPipelineConfigurationModel; // TODO: ADUI-7802 - complete this information when the documentation is complete or the initial team confirm the API implementation.
    impersonationRestriction?: ImpersonationRestrictionsModel; // TODO: ADUI-7802 - complete this information when the documentation is complete or the initial team confirm the API implementation.
}

interface QueryAuthenticationModel {
    /**
     * Authentication name. [to be revised]
     */
    name: string;
    /**
     * Authentication provider. [to be revised]
     */
    provider: string;
    /**
     * Authentication type. [to be revised]
     */
    type: string;
}

interface EnforceQueryPipelineConfigurationModel {
    /**
     * Search hub name to be linked to an API key. [to be revised]
     */
    searchHub: string;
}

interface ImpersonationRestrictionsModel {
    allowedUserIds: QueryAuthenticationModel[];
}
