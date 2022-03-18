import {LicenseModel} from '../License';
import {ModifierModel, ModifierStatementModel} from '../ModifierTemplates/ModifierTemplateInterfaces';

export interface OrganizationsStatusModel {
    errorCodes: string[];
    lifeCycleState: string;
    pauseState: string;
    paused: boolean;
    provisioningStatus: {
        currentProvisioningProgress: number;
        initialProvisioningDone: boolean;
        lastProvisioningCompletedDate: number;
        ongoing: boolean;
        status: string;
    };
    readOnly: boolean;
    status: string;
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
}

export type AdditionalOrganizationField = 'status' | 'license' | string;

export interface GetOrganizationOptions {
    additionalFields?: AdditionalOrganizationField | AdditionalOrganizationField[];
}

export interface ListOrganizationOptions {
    additionalFields?: AdditionalOrganizationField | AdditionalOrganizationField[];
    filter?: string;
    order?: string;
    page?: number;
    perPage?: number;
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
