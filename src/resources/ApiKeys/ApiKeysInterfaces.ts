import {GranularResource, PrivilegeModel} from '../BaseInterfaces.js';
import {
    ApiKeyExposureReportReasonSource,
    ApiKeyExposureReportSeverity,
    ApiKeyPrivacyLevel,
    ApiKeyReportCreationType,
    ApiKeyStatus,
    ApiKeyStatusFilter,
} from '../Enums.js';
import {UserModel} from '../Users/UserInterfaces.js';

export interface ApiKeyBaseModel extends GranularResource {
    /**
     * The display name for the API key.
     * @example PushApiKey
     */
    displayName?: string;
    /**
     * A brief description of the API key.
     * @example API key used for managing sources.
     */
    description?: string;
    /**
     * A set of IP addresses allowed to use the API key.
     *
     * Notes:
     * - IP ranges using CIDR notation are also supported.
     * - If an IP address is included in both the `allowedIps` and the `deniedIps`, the IP address will be denied.
     * @example ["192.168.0.0/16", "29.186.225.13"]
     */
    allowedIps?: string[];
    /**
     * A set of IP addresses that will be denied access when attempting to use the API key.
     *
     * Notes:
     * - IP ranges using CIDR notation are also supported.
     * - If an IP address is included in both the `allowedIps` as well as the `deniedIps`, the IP address will be denied.
     * @example [`"192.168.0.0/16"`, `"29.186.225.13"`]
     */
    deniedIps?: string[];
    /**
     * A set of privileges.
     */
    privileges?: PrivilegeModel[];
    /**
     * Additional configuration to be included in an API key. [to be revised]
     */
    additionalConfiguration?: AdditionalConfigurationModel;
}

export interface ApiKeyModel extends ApiKeyBaseModel {
    /**
     * The unique identifier of the [organization](https://docs.coveo.com/en/222/) the API key was created for.
     */
    organizationId?: string;
    /**
     * The unique identifier of the API key.
     * @example t4hk287bfj5sg6wskg64ckk5a
     */
    id: string;
    /**
     * Whether the API key is enabled.
     */
    enabled?: boolean;
    /**
     * The value of the API key.
     * @example xx65151ec3-7b30-4772-a99a-09b4c0f71343
     */
    value?: string;
    /**
     * The username or the email address that was used to create this API key.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdBy?: any;
    /**
     * The API key creation date in Unix timestamp in milliseconds.
     * @example 1614969486000
     */
    createdDate?: number;
    /**
     * The approximate API key last used date in Unix timestamp in milliseconds.
     * @example 1624575600000
     */
    lastUsedDate?: number;
    /**
     * The unique identifier of the API key.
     * @example t4hk287bfj5sg6wskg64ckk5a
     */
    resourceId?: string;
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
    /**
     * The exposure report associated with the API key
     */
    exposureReport?: ExposureReport;
    /**
     * Privacy level of the API key.
     */
    privacyLevel?: ApiKeyPrivacyLevel;
}

export interface ExposureReport {
    /**
     * API Key logger id associated to the Exposure Report
     */
    apiKeyLoggerId: string;
    /**
     * The severity of the exposure
     */
    severity: ApiKeyExposureReportSeverity;
    /**
     * The reasons behind the exposure report for a given API key
     */
    reasons: ApiKeyExposureReportReasonModel[];
    /**
     * The date the key should be deactivated
     */
    deactivationDate: number;
    /**
     * The way the API key report has been created
     */
    creationType: ApiKeyReportCreationType;
    /**
     * Represents the user that has created the report
     */
    createdBy: UserModel;
}

export interface ApiKeyExposureReportReasonModel {
    /**
     * The unique identifier of the exposure report.
     * @example 1234567890
     */
    id: string;
    /**
     * The reason behind the exposure report for a given API key
     */
    reason?: string;
    /**
     * The source of which the exposure comes from
     */
    source: ApiKeyExposureReportReasonSource;
    /**
     * The url where the api key could be found
     */
    url?: string;
    /**
     * The date the exposure report was created
     */
    createdDate: number;
}

export interface CreateApiKeyModel extends ApiKeyBaseModel {
    /**
     * The duration of the API key in ISO-8601 format. Once the duration is reached the key expires and cannot be used anymore.
     * @example
     * 'P1Y' for 1 year
     * 'P14D' for 14 days
     * 'P1M' for 1 month.
     * 'P1Y3M14D' for 1 year, 3 months, and 14 days.
     */
    lifetimeDuration?: string;
}

export interface CreateApiKeyOptions {
    /**
     * The unique identifier of the template on which to base the API key.
     */
    apiKeyTemplateId?: string;
}

export interface DuplicateApiKeyOptions {
    /**
     * The display name for the API key.
     *
     */
    displayName?: string;
    /**
     * A brief description of the API key.
     *
     */
    description?: string;
    /**
     * The lifetime duration of the API key (iso8601 format).
     * @example 'P1M'
     */
    lifetimeDuration: string;
}

export interface ApiKeyListOptions {
    /**
     * Filter API keys based on their status.
     * @see {@link ApiKeyStatusFilter} for possible values
     */
    status?: ApiKeyStatusFilter;
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
