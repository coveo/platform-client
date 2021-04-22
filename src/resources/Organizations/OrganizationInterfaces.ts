import {LicenseModel} from '../License';
import {ModifierModel, StatementModel} from '../ModifierTemplates/ModifierTemplateInterfaces';

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
    name: string;
    organizationTemplate?: string;
    owner?: string;
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
    statements: StatementModel[];
}
