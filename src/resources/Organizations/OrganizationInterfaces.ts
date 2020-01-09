import {LicenseModel} from '../License';

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
}

export interface CreateOrganizationOptions {
    name: string;
    organizationTemplate?: string;
    owner?: string;
}
