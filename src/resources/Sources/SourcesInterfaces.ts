import {GranularResource} from '../BaseInterfaces';
import {
    FilterHostType,
    FilterLastOperationResultType,
    FilterLastOperationType,
    FilterStatusType,
    SortingOrder,
    SortingType,
    SourceSecurityOption,
    SourceType,
    SourceVisibility,
} from '../Enums';
import {SecurityProvider, SecurityProviderModel} from '../SecurityCache/SecurityCacheInterfaces';
import * as SourcesSubInterface from './SourcesSubInterfaces';
import {MappingModel} from './SourcesMappings';

export * from './SourcesSubInterfaces';

export interface ListSourcesParams {
    filter?: string;
    filterHostType?: FilterHostType;
    filterLastOperationResultType?: FilterLastOperationResultType;
    filterLastOperationType?: FilterLastOperationType;
    filterStatusType?: FilterStatusType;
    page?: number;
    perPage?: number;
    sortingOrder?: SortingOrder;
    sortingType?: SortingType;
    writeAccessOnly?: boolean;
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
    configurationError?: SourcesSubInterface.ConfigurationError;
    crawlingModuleId?: string;
    pendingCrawlingModuleId?: string;
    customParameters?: Record<string, string>;
    id?: string;
    information?: SourcesSubInterface.SourceInformation;
    logicalIndex?: string;
    mappings?: MappingModel[];
    name?: string;
    ocrFileTypes?: string[];
    onPremisesEnabled?: boolean;
    owner?: string;
    permissions?: SourcesSubInterface.DocumentPermissionModel;
    postConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    preConversionExtensions?: SourcesSubInterface.SourceExtensionModel[];
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    resourceId?: string;
    securityProviderReferences?: string[];
    sourceType?: SourceType;
    sourceVisibility?: SourceVisibility;
    urlFilters?: SourcesSubInterface.UrlFilter[];
    alwaysTrustCertificates?: boolean;
    username?: string;
    password?: string;
    formAuthenticationConfig?: SourcesSubInterface.FormAuthenticationConfig;
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
