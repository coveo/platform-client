import {PageModel} from '../../BaseInterfaces.js';
import {
    DocumentPermissionState,
    PermissionIdentityType,
    SinglePermissionIdentityType,
    SinglePermissionResult,
    SinglePermissionState,
} from '../../Enums.js';

export interface SinglePermissionModel {
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

export interface SecurityIdentityInfoModel {
    key?: string;
    value?: string;
}

export interface DetailedSecurityIdentityModel {
    name?: string;
    provider?: string;
    type?: PermissionIdentityType;
    infos?: SecurityIdentityInfoModel[];
    declaration?: string;
    state?: SinglePermissionState;
    createdDate?: number;
    lastEnabledDate?: number;
    lastUpdateDate?: number;
    lastSuccessfulUpdateDate?: number;
    lastStoredDate?: number;
    orderingID?: number;
    lastUpdateResult?: SinglePermissionResult;
    lastUpdateErrorDetail?: string;
}

export interface DocumentSecurityIdentityModel {
    name?: string;
    provider?: string;
    type?: PermissionIdentityType;
    infos?: SecurityIdentityInfoModel[];
}

export interface PermissionSetForIdentityModel {
    identityIsAllowed?: boolean;
    identityIsDenied?: boolean;
    allowAnonymous?: boolean;
    allowedIdentitiesPaths?: DetailedSecurityIdentityModel[];
    deniedIdentitiesPaths?: DetailedSecurityIdentityModel[];
    name?: string;
}

export interface PermissionLevelForIdentityModel {
    permissionSetsForIdentity?: PermissionSetForIdentityModel[];
    name?: string;
    identityIsAllowed?: boolean;
    identityIsDenied?: boolean;
}

export interface DocumentPermissionForIdentityModel {
    permissionLevelsForIdentity: PermissionLevelForIdentityModel[];
    identityIsAllowed?: boolean;
    identityIsDenied?: boolean;
}

export interface Permission {
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
