import {Paginated} from '../BaseInterfaces.js';
import {LicenseModel} from '../License/index.js';
import {ModifierModel, ModifierStatementModel} from '../ModifierTemplates/ModifierTemplateInterfaces.js';

/**
 * Describes the status of an organization.
 */
export interface OrganizationsStatusModel {
    /**
     * A list of error codes that are present in the organization at the time of the request.
     *
     * **Allowed values:**
     * - `SEARCH_ERROR`: An error occurred during a search request.
     * - `PAUSING_FAILED`: An error occurred when attempting to pause the organization.
     * - `RESUMING_FAILED`: An error occurred when attempting to resume the organization.
     */
    errorCodes: string[];
    /**
     * The life-cycle state of the organization.
     *
     * **Allowed values:**
     * - `ACTIVE`: The organization is healthy and fully functional.
     * - `PAUSED`: The organization is currently inactive.
     * - `DELETING`: The organization is currently in the process of being deleted.
     * @example `PAUSED`
     */
    lifeCycleState: string;
    /**
     * The pause status of the organization.
     *
     * **Allowed values:**
     * - `ACTIVE`: The organization is active.
     * - `IDLE`: The organization is inactive.
     * - `PAUSING`: The organization is transitioning to `PAUSED`.
     * - `PAUSED`: The organization is paused.
     * - `RESUMING`: The organization is transitioning to `ACTIVE`.
     * - `PAUSING_FAILED`: The organization threw an error while transitioning to `PAUSED`.
     * - `RESUMING_FAILED`: The organization threw an error while transitioning to `ACTIVE`.
     * @example `PAUSED`
     */
    pauseState: string;
    /**
     * Whether the organization is currently paused.
     */
    paused: boolean;
    /**
     * The provisioning status of the organization.
     */
    provisioningStatus: {
        /**
         * The progress, in percentage, of the ongoing provisioning.
         * @example `100`
         */
        currentProvisioningProgress: number;
        /**
         * Whether the initial provisioning has been completed.
         */
        initialProvisioningDone: boolean;
        /**
         * The last time provisioning was successfully completed in number of milliseconds since UNIX epoch.
         * @example `1556722921779`
         */
        lastProvisioningCompletedDate: number;
        /**
         * Whether the provisioning is currently ongoing.
         */
        ongoing: boolean;
        /**
         * The status of the last provisioning.
         *
         * **Allowed values:**
         * - `ERROR`: The last provisioning failed with an error.
         * - `HEALTHY`: The last provisioning finished successfully.
         */
        status: string;
    };
    /**
     * Whether the organization enforces all of its resources (e.g., query pipelines, sources, etc.) to be read-only.
     *
     * **Note:** This parameter is typically only updated when an organization is inactive.
     * @default `false`
     */
    readOnly: boolean;
    /**
     * The current status of the organization.
     *
     * **Allowed values:**
     * - `HEALTHY`: The organization is healthy and fully functional.
     * - `ERROR`: The organization has thrown an error and is currently inactive.
     * @example `ERROR`
     */
    status: string;
    /**
     * Whether support has been activated for the organization.
     * See [Coveo Customer Global Support and Success Guide](https://docs.coveo.com/en/1352/).
     */
    supportActivated: boolean;
}

export interface OrganizationModel {
    id: string;
    displayName: string;
    createdDate: number;
    publicContentOnly: boolean;
    type: string;
    owner: {
        email: string;
    };
    readOnly: boolean;
    license?: LicenseModel;
    organizationStatusModel?: OrganizationsStatusModel;
    configuration: {
        servingExperimentAllowed: boolean;
    };
}

export type AdditionalOrganizationField = 'status' | 'license' | (string & {});

export interface GetOrganizationOptions {
    additionalFields?: AdditionalOrganizationField | AdditionalOrganizationField[];
}

export interface ListOrganizationOptions extends Paginated {
    additionalFields?: AdditionalOrganizationField | AdditionalOrganizationField[];
    filter?: string;
    order?: string;
    sortBy?: string;
    type?: string;
}

export interface CreateOrganizationOptions {
    /*
     * The human-readable display name to give to the organization
     */
    name: string;
    /*
     * The name of the template to create the initial organization definition
     */
    organizationTemplate?: string;
    /*
     * The owner of the organization, usually an email address
     */
    owner?: string;
    /*
     * Metadata about the context where the organization creation request originated
     */
    creationOrigin?: OrganizationCreationOrigin;
}

export interface DefinitionModel {
    /**
     * Id of the organization the definition applies to
     */
    organizationId: string;
    /**
     * License template used as the "foundation" before applying the modifiers and overrides
     */
    baseLicenseTemplateId: string;
    /**
     * List of modifiers to apply when computing the resulting license
     */
    modifiers: ModifierModel[];
    /**
     * List of overrides to apply when computing the resulting license
     */
    overrides: OverrideModel[];
}

export interface OverrideModel {
    /**
     * Id of the override
     * Every organization is given a "Default" override which should be used a vast majority of the time
     */
    id: string;
    /**
     * List of statements to apply when computing the resulting license
     */
    statements: ModifierStatementModel[];
    /**
     * Determines if the override model is read only
     */
    readOnly?: boolean;
    /**
     * Determines the expiration date of this override model
     */
    expirationDate?: string;
}

/*
 * Metadata about the context where the organization creation request originated
 */
export enum OrganizationCreationOrigin {
    /*
     * Created from the Coveo Administration Console
     */
    ADMIN_UI = 'ADMIN_UI',
    /*
     * Created from the API, default value in the backend if parameter is omitted
     */
    API = 'API',
    /*
     * Created from the Coveo CLI
     */
    CLI = 'CLI',
    /*
     * Created when syncing from our CRM solution
     */
    BUSINESS_CRM = 'BUSINESS_CRM',
    /*
     * Created from a training portal
     */
    TRAINING = 'TRAINING',
    /*
     * Created by one of our partners
     */
    PARTNER_PROGRAM = 'PARTNER_PROGRAM',
    /*
     * Created as a scratch organization
     */
    TEST = 'TEST',
    /*
     * Created from the Coveo website
     */
    WEBSITE = 'WEBSITE',
    /*
     * Created from the Salesforce Coveo integration package
     */
    SALESFORCE_INTEGRATION_TRIAL = 'SALESFORCE_INTEGRATION_TRIAL',
    /*
     * Created from the ServiceNow Coveo integration package
     */
    SERVICENOW_INTEGRATION_TRIAL = 'SERVICENOW_INTEGRATION_TRIAL',
    /*
     * Created from the Sitecore Coveo integration package
     */
    SITECORE_INTEGRATION_TRIAL = 'SITECORE_INTEGRATION_TRIAL',
    /*
     * Unknown origin
     */
    UNKNOWN = 'UNKNOWN',
}
