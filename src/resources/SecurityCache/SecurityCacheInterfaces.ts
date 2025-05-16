import {Paginated} from '../BaseInterfaces.js';
import {
    ExpansionScore,
    PermissionIdentityType,
    ScheduleType,
    SecurityCacheFilteringMode,
    SecurityCacheStateOptions,
    SecurityProviderReferenceType,
    SecurityProviderStatusType,
    SecurityProviderType,
    SinglePermissionResult,
    SinglePermissionState,
} from '../Enums.js';
import {DataFile, ParameterModel, UserIdentityModel} from '../Sources/index.js';

export interface ScheduleModel {
    enabled: boolean;
    frequency?: ScheduleFrequency;
    id: string;
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

export interface SecurityProviderModel {
    cascadingSecurityProviders?: Record<string, CascadingSecurityProvider>;
    caseSensitive?: boolean;
    crawlingModuleId?: string;
    displayName?: string;
    id: string;
    instanceId?: string;
    name: string;
    nodeRequired?: boolean;
    nodeTypeName?: string;
    onPremisesEnabled?: boolean;
    organizationId?: string;
    parameters?: ParameterModel;
    referencedBy?: SecurityProviderReferenceModel[];
    sourceTypeName?: string;
    type?: SecurityProviderType;
    userIdentities?: UserIdentityModel;
}

export interface SecurityProviderModelWithStatus extends Required<SecurityProviderModel> {
    currentStatus: CurrentStatusModel;
    lastRefreshOperation: LastRefreshOperation;
    statistics: SecurityProviderStatisticsModel;
}

export interface RawSecurityProviderConfig {
    /**
     * @deprecated
     */
    name: string;
    userIdentities?: UserIdentityModel;
    parameters?: ParameterModel;
    dataFiles?: Record<string, DataFile>;
    securityProviders?: Record<string, CascadingSecurityProvider>;
    indexIdentifier?: string;
    dbConnectionString?: string;
    organizationId?: string;
    operationId?: string;
    expansionScore?: ExpansionScore;
    type?: SecurityProviderType;
    nodeTypeName?: string;
    sourceTypeName?: string;
    displayName?: string;
    nodeRequired?: boolean;
    onPremisesEnabled?: boolean;
    crawlingModuleId?: string;
    caseSensitive?: boolean;
}

export interface CascadingSecurityProvider {
    id: string;
    name: string;
    type?: SecurityProviderType;
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
    type?: SecurityProviderReferenceType;
}

export interface CurrentStatusModel {
    numberOfEntitiesInError?: number;
    numberOfEntitiesProcessed?: number;
    refreshType?: string;
    totalNumberOfEntities?: number;
    type?: SecurityProviderStatusType;
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

export interface SecurityCacheListOptions extends Paginated {
    from?: string;
    organisationId?: string;
    securityProviderId?: string;
    states?: SecurityCacheStateOptions;
    to?: string;
}

export interface SecurityProviderIdentitiesFilters extends Paginated {
    /**
     * filteringMode can take two values, SUBSTRING or PREFIX.
     *
     * SUBSTRING: If filterTerm is set, this mode specifies that identities that have the filterTerm at any position in their name will be returned.
     * PREFIX: If filterTerm is set, this mode specifies that only identities that have the filterTerm at the beginning of their name will be returned.
     */
    filteringMode?: SecurityCacheFilteringMode;
    /**
     * If set, only identities that have this value in their name will be returned.
     */
    filterTerm?: string;
    /**
     * If set, only identities for which their type is listed in this array will be returned.
     */
    identityTypes?: PermissionIdentityType[];
}

export interface SecurityCacheListRelationshipsOptions extends Paginated {
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
    lastUpdateResult?: SinglePermissionResult;
    state?: SinglePermissionState;
}

export interface SecurityCacheMemberInfoModel {
    key: string;
    value: string;
}

export interface SecurityProvider {
    name?: string;
    typeName?: string;
}

export interface SecurityCacheUpdateRawOption {
    forceUpdate: boolean;
}
