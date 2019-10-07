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
    license: LicenseModel;
    organizationStatusModel: OrganizationsStatusModel;
    publicContentOnly: boolean;
    type: string;
    owner: {
        email: string;
    };
    readOnly: boolean;
}

export interface ListOrganizationOptions {
    additionalFields?: string | string[];
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
