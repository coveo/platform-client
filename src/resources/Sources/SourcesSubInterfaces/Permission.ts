import {PageModel} from '../../BaseInterfaces.js';
import {
    DocumentPermissionState,
    PermissionIdentityType,
    SinglePermissionIdentityType,
    SinglePermissionResult,
    SinglePermissionState,
} from '../../Enums.js';

export interface SinglePermissionModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalInfo?: any;
    allowed?: boolean;
    identity?: string;
    identityType?: SinglePermissionIdentityType;
    lastUpdateDate?: number;
    lastUpdateErrorDetail?: string;
    lastUpdateResult?: SinglePermissionResult;
    securityProvider?: string;
    state?: SinglePermissionState;
}

export interface SinglePermissionPageModel extends PageModel<SinglePermissionModel> {
    anonymousAllowed?: boolean;
}

export interface PermissionSetModel {
    anonymousAllowed?: boolean;
    name?: string;
    permissions?: SinglePermissionModel[];
}

export interface PermissionLevelModel {
    name?: string;
    permissionSets?: PermissionSetModel[];
}

export interface DocumentPermissionModel {
    lastUpdatedDate?: number;
    permissionLevels?: PermissionLevelModel[];
    state?: DocumentPermissionState;
}

export interface Permission {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalInfo?: any;
    identity?: string;
    identityType?: PermissionIdentityType;
    securityProvider?: string;
}

export interface PermissionSet {
    allowAnonymous?: boolean;
    allowedPermissions?: Permission[];
    deniedPermissions?: Permission[];
    name?: string;
}

export interface PermissionLevel {
    name?: string;
    permissionSets?: PermissionSet[];
}
