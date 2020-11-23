import {PermissionIdentityType, ScheduleType, SecurityCacheStateOptions} from '../Enums';
import {ParameterModel, UserIdentityModel} from '../Sources';

export interface ScheduleModel {
    enabled: boolean;
    frequency?: ScheduleFrequency;
    id?: string;
    organizationId?: string;
    refreshType?: string;
    resourceId?: string;
    scheduleType?: string;
}

export interface SecurityCacheStatus {
    currentStatus?: CurrentStatusModel;
    statistics?: SecurityProviderStatisticsModel;
}

export interface SecurityCacheIdentityModel {
    data?: string;
    provider?: string;
}

export interface SecurityProviderModelWithStatus {
    cascadingSecurityProviders?: CascadingSecurityProvider;
    caseSensitive?: boolean;
    currentStatus?: CurrentStatusModel;
    displayName?: string;
    id: string;
    instanceId?: string;
    lastRefreshOperation?: LastRefreshOperation;
    name: string;
    nodeRequired?: boolean;
    nodeTypeName?: string;
    onPremisesEnabled?: boolean;
    organizationId?: string;
    parameters?: ParameterModel;
    referencedBy?: SecurityProviderReferenceModel[];
    sourceTypeName?: string;
    statistics?: SecurityProviderStatisticsModel;
    type?: string;
    userIdentities?: UserIdentityModel;
}

export interface CascadingSecurityProvider {
    id: string;
    name: string;
    type?: string;
    typeName?: string;
}

export interface ScheduleFrequency {
    hourMinute?: HourMinutePair;
    monthDay?: number;
    seed?: number;
    type?: ScheduleType;
    value?: number;
    weekDays?: string[];
}

export interface HourMinutePair {
    hour?: number;
    minute?: number;
}

export interface LastRefreshOperation {
    errorCode?: string;
    id: string;
    numberOfEntitiesProcessed?: number;
    operationType?: string;
    result?: string;
    timestamp?: number;
}

export interface SecurityProviderReferenceModel {
    attributes?: SecurityProviderReferenceModelAttributes;
    id: string;
    type?: string;
}

export interface CurrentStatusModel {
    numberOfEntitiesInError?: number;
    numberOfEntitiesProcessed?: number;
    refreshType?: string;
    totalNumberOfEntities?: number;
    type?: string;
}

export interface SecurityProviderStatisticsModel {
    numberOfEntitiesByState?: {
        DISABLED: number;
        IN_ERROR: number;
        NOT_UPDATED: number;
        OUT_OF_DATE: number;
        UP_TO_DATE: number;
    };
    numberOfEntitiesInError?: number;
    numberOfPermissionModels?: number;
    numberOfProviders?: number;
    totalNumberOfEntities?: number;
}

export interface SecurityProviderReferenceModelAttributes {
    crawlerInstanceType?: string;
    id: string;
    name: string;
    onPremisesEnabled?: boolean;
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    sourceType?: string;
}

export interface SecurityCacheListOptions {
    from?: string;
    organisationId?: string;
    page?: number;
    perPage?: number;
    securityProviderId?: string;
    states?: SecurityCacheStateOptions;
    to?: string;
    usePageModel?: boolean;
}

export interface SecurityCacheListRelationshipsOptions {
    page?: number;
    perPage?: number;
    recursive?: boolean;
}

export interface SecurityCacheMemberModel {
    infos?: SecurityCacheMemberInfoModel[];
    name: string;
    provider?: string;
    type?: PermissionIdentityType;
}

export interface DetailedSecurityCacheMemberModel extends SecurityCacheMemberModel {
    lastUpdateDate?: number;
    lastUpdateErrorDetail?: string;
    lastUpdateResult?: string;
    state?: string;
}

export interface SecurityCacheMemberInfoModel {
    key: string;
    value: string;
}

export interface SecurityProvider {
    name?: string;
    typeName?: string;
}
