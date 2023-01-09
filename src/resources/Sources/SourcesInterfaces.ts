import {GranularResource, Paginated} from '../BaseInterfaces.js';
import {
    FilterHostType,
    FilterLastOperationResultType,
    FilterLastOperationType,
    FilterStatusType,
    SortingOrder,
    SortingType,
    SourceOperationalStatus,
    SourceSecurityOption,
    SourceType,
    SourceVisibility,
} from '../Enums.js';
import {SecurityProvider, SecurityProviderModel} from '../SecurityCache/SecurityCacheInterfaces.js';
import * as SourcesSubInterface from './SourcesSubInterfaces/index.js';
import {MappingModel} from './SourcesMappings/index.js';

export * from './SourcesSubInterfaces/index.js';

interface ListParams extends Paginated {
    filter?: string;
    sortingOrder?: SortingOrder;
    sortingType?: SortingType;
    writeAccessOnly?: boolean;
}

export interface ListOperationalStatusSourcesParams extends ListParams {
    sourceOperationalStatus: SourceOperationalStatus;
}

export interface ListSourcesParams extends ListParams {
    filterHostType?: FilterHostType;
    filterLastOperationResultType?: FilterLastOperationResultType;
    filterLastOperationType?: FilterLastOperationType;
    filterStatusType?: FilterStatusType;
}

export interface ExtendedConfig {
    addressPatterns?: SourcesSubInterface.AddressPattern[];
    authenticationForms?: Record<string, SourcesSubInterface.FormAuthentication>;
    caseSensitivePatterns?: boolean;
    dataFiles?: Record<string, SourcesSubInterface.DataFile>;
    dbConnectionString?: string;
    documentConfig?: SourcesSubInterface.DocumentConfig;
    documentConsumerURI?: string;
    extendedDataFiles?: Record<string, SourcesSubInterface.ExtendedDataFile>;
    indexIdentifier?: string;
    metricsEnabled?: boolean;
    parameters?: Record<string, SourcesSubInterface.ParameterModel>;
    permissions?: SourcesSubInterface.PermissionLevel[];
    securityProviders?: Record<string, SecurityProvider>;
    sourceInformation?: SourcesSubInterface.SourceInformation;
    sourceSecurityOption?: SourceSecurityOption;
    startingAddresses?: string[];
    userIdentities?: Record<string, SourcesSubInterface.UserIdentityModel>;
}

export interface RawSourceConfig extends GranularResource {
    additionalComments?: string;
    additionalInfos?: any;
    configuration?: ExtendedConfig;
    crawlerInstanceType?: string;
    crawlingModuleId?: string;
    fromRaw?: boolean;
    id?: string;
    logicalIndex?: string;
    mappings?: MappingModel[];
    name?: string;
    onPremisesEnabled?: boolean;
    owner?: string;
    postConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    preConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    resourceId?: string;
    securityProviderReferences?: string[];
    securityProviders?: SecurityProviderModel[];
    sourceType?: SourceType;
}

export interface SourceModel extends GranularResource {
    alwaysTrustCertificates?: boolean;
    configurationError?: SourcesSubInterface.ConfigurationError;
    crawlingModuleId?: string;
    customParameters?: Record<string, string>;
    formAuthenticationConfig?: SourcesSubInterface.FormAuthenticationConfig;
    id?: string;
    information?: SourcesSubInterface.SourceInformation;
    logicalIndex?: string;
    mappings?: MappingModel[];
    name?: string;
    ocrFileTypes?: string[];
    onPremisesEnabled?: boolean;
    owner?: string;
    password?: string;
    pendingCrawlingModuleId?: string;
    permissions?: SourcesSubInterface.DocumentPermissionModel;
    postConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    preConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    pushEnabled?: boolean;
    resourceId?: string;
    securityProviderReferences?: string[];
    sourceType?: SourceType;
    sourceVisibility?: SourceVisibility;
    streamEnabled?: boolean;
    urlFilters?: SourcesSubInterface.UrlFilter[];
    username?: string;
}

export interface LightSourceModel {
    crawlerInstanceType?: string;
    id?: string;
    name?: string;
    onPremisesEnabled?: boolean;
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    sourceType?: SourceType;
}

export interface CreateSourceModel extends SourceModel, SourcesSubInterface.SourceInformation {
    AutomaticFormAuth?: string;
    FormAuth?: string;
    authentication?: string;
    ocrType?: string;
    passwordInputName?: string;
    passwordInputValue?: string;
    usernameInputName?: string;
    usernameInputValue?: string;
    [key: string]: any;
}

export interface CreateSourceOptions {
    rebuild?: boolean;
    updateSecurityProviders?: boolean;
}
