import {GranularResource} from '../BaseInterfaces';
import {
    ActivityOperation,
    AuthenticationActionMethod,
    AuthenticationInputType,
    DocumentPermissionState,
    ExcerptSource,
    ExtensionSettingAction,
    ExtensionSettingActionOnError,
    ExtensionSettingConverter,
    FieldTypes,
    FilterHostType,
    FilterLastOperationResultType,
    FilterLastOperationType,
    FilterStatusType,
    FormAuthenticationFailedMethod,
    FormInputType,
    MappingModelKind,
    OperationType,
    PatternType,
    PermissionIdentityType,
    SecurityProviderType,
    SinglePermissionIdentityType,
    SinglePermissionResult,
    SinglePermissionState,
    SortingOrder,
    SortingType,
    SourceExtensionActionOnError,
    SourceSecurityOption,
    SourceStatusType,
    SourceType,
    SourceVisibility,
    UrlFilterType,
} from '../Enums';
import {
    CascadingSecurityProvider,
    SecurityProvider,
    SecurityProviderReferenceModel,
} from '../SecurityCache/SecurityCacheInterfaces';

export interface SourceModel extends GranularResource {
    configurationError?: ConfigurationError;
    crawlingModuleId?: string;
    customParameters?: Record<string, string>;
    id?: string;
    information?: SourceInformation;
    logicalIndex?: string;
    mappings?: MappingModel[];
    name?: string;
    ocrFileTypes?: string[];
    onPremisesEnabled?: boolean;
    owner?: string;
    permissions?: DocumentPermissionModel;
    postConversionExtensions?: SourceExtensionModel[];
    preConversionExtensions?: SourceExtensionModel[];
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    resourceId?: string;
    securityProviderReferences?: string[];
    sourceType?: SourceType;
    sourceVisibility?: SourceVisibility;
    urlFilters?: UrlFilter[];
    alwaysTrustCertificates?: boolean;
    username?: string;
    password?: string;
    formAuthenticationConfig?: FormAuthenticationConfig;
}

export interface CreateSourceModel extends SourceModel, SourceInformation {
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

export interface ConfigurationError {
    errorCode?: string;
    message?: string;
}

export interface SourceInformation {
    id?: string;
    collectionId?: number;
    collectionName?: string;
    documentsTotalSize?: number;
    lastOperation?: SourceLastOperation;
    nextOperation?: NextOperation;
    numberOfDocuments?: number;
    rebuildRequired?: boolean;
    sourceId?: number;
    sourceName?: string;
    sourceStatus?: SourceStatus;
}

export interface MappingModel {
    content?: string;
    extractionMethod?: string;
    fieldName?: string;
    fieldTypeHint?: FieldTypes;
    id?: string;
    kind?: MappingModelKind;
    type?: string;
    literalContent?: string;
    metadataContent?: string;
}

export interface DocumentPermissionModel {
    lastUpdatedDate?: number;
    permissionLevels?: PermissionLevelModel[];
    state?: DocumentPermissionState;
}

export interface SourceExtensionModel {
    actionOnError?: SourceExtensionActionOnError;
    condition?: string;
    extensionId?: string;
    itemType?: string;
    parameters?: Record<string, string>;
    versionId?: string;
}

export interface UrlFilter {
    filter?: string;
    filterType?: UrlFilterType;
    includeFilter?: boolean;
}

export interface SourceLastOperation {
    errorCode?: string;
    id?: string;
    initialBuild?: boolean;
    numberOfDocuments?: number;
    operationType?: OperationType;
    result?: string;
    timestamp?: number;
}

export interface NextOperation {
    operationType?: OperationType;
    timestamp?: number;
}

export interface SourceStatus {
    allowedOperations?: ActivityOperation[];
    initialBuild?: boolean;
    numberOfDocuments?: number;
    numberOfProcessedDocuments?: number;
    pausedOnErrorCode?: string;
    refreshType?: OperationType;
    timestamp?: number;
    type?: SourceStatusType;
}

export interface PermissionLevelModel {
    name?: string;
    permissionSets?: PermissionSetModel[];
}

export interface PermissionSetModel {
    anonymousAllowed?: boolean;
    name?: string;
    permissions?: SinglePermissionModel[];
}

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

export interface CreateSourceOptions {
    rebuild?: boolean;
    updateSecurityProviders?: boolean;
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
    postConversionExtensions?: SourceExtensionModel[];
    preConversionExtensions?: SourceExtensionModel[];
    pushEnabled?: boolean;
    streamEnabled?: boolean;
    resourceId?: string;
    securityProviderReferences?: string[];
    securityProviders?: SecurityProviderModel[];
    sourceType?: SourceType;
}

export interface ExtendedConfig {
    addressPatterns?: AddressPattern[];
    authenticationForms?: Record<string, FormAuthentication>;
    caseSensitivePatterns?: boolean;
    dataFiles?: Record<string, DataFile>;
    dbConnectionString?: string;
    documentConfig?: DocumentConfig;
    documentConsumerURI?: string;
    extendedDataFiles?: Record<string, ExtendedDataFile>;
    indexIdentifier?: string;
    metricsEnabled?: boolean;
    parameters?: Record<string, ParameterModel>;
    permissions?: PermissionLevel[];
    securityProviders?: Record<string, SecurityProvider>;
    sourceInformation?: SourceInformation;
    sourceSecurityOption?: SourceSecurityOption;
    startingAddresses?: string[];
    userIdentities?: Record<string, UserIdentityModel>;
}

export interface SecurityProviderModel {
    cascadingSecurityProviders?: Record<string, CascadingSecurityProvider>;
    caseSensitive?: boolean;
    displayName?: string;
    id?: string;
    instanceId?: string;
    name?: string;
    nodeRequired?: boolean;
    nodeTypeName?: string;
    organizationId?: string;
    parameters?: Record<string, ParameterModel>;
    referencedBy?: SecurityProviderReferenceModel[];
    sourceTypeName?: string;
    type?: SecurityProviderType;
    userIdentities?: Record<string, UserIdentityModel>;
}

export interface AddressPattern {
    allowed?: boolean;
    expression?: string;
    patternType?: PatternType;
}

export interface FormAuthentication {
    actionMethod?: AuthenticationActionMethod;
    actionURL?: string;
    formURL?: string;
    inputs?: FormAuthenticationInput[];
    reauthenticate?: boolean;
    secureURL?: string;
}

export interface FormAuthenticationInput {
    name?: string;
    type?: AuthenticationInputType;
    value?: string;
}

export interface FormAuthenticationConfig {
    actionMethod?: string;
    actionUrl?: string;
    addFoundInputs?: boolean;
    authenticationFailed?: FormAuthenticationFailedConfiguration;
    enableJavaScript?: boolean;
    formContentType?: string;
    formId?: string;
    formUrl?: string;
    inputs?: FormInput[];
    javaScriptLoadingDelayInMilliseconds?: number;
    customLoginSequence?: any;
}

export interface FormAuthenticationFailedConfiguration {
    method: FormAuthenticationFailedMethod;
    values: string[];
}

export interface FormInput {
    name: string;
    value?: string;
    inputType: FormInputType;
}

export interface DataFile {
    data?: string;
    sensitive?: boolean;
}

export interface DocumentConfig {
    documentProcessorConfig?: DocumentProcessorConfig;
    indexUri?: string;
    parameters?: any;
    postConversions?: DocumentProcessor[];
    preConversions?: DocumentProcessor[];
}

export interface DocumentProcessorConfig {
    addRawTextDataStream?: boolean;
    beautifyDocuments?: boolean;
    charsetDetectionHint?: CharsetDetectionHint;
    excelFloatingPointPrecision?: number;
    excerptSource?: ExcerptSource;
    extensionSettings?: ExtensionSettings;
    fieldMappingOrigin?: string;
    generateHTML?: boolean;
    imageMinimumSize?: number;
    indexExcelNumbers?: boolean;
    indexMeta?: boolean;
    languageHints?: LanguageHint[];
    languagesSettings?: string;
    maxHTMLOutputSize?: number;
    maxTextOutputSize?: number;
    maximumDocumentSize?: number;
    maximumNumberOfPagesToConvert?: number;
    openResultWithQuickView?: boolean;
    reportProgressionTimeout?: number;
    saveExcerptBlob?: boolean;
    styleSheet?: string;
    summarizeDocument?: boolean;
    summarySize?: number;
    timeout?: number;
    titleGrammaticalScoreWeight?: number;
    titleLengthProbabilityWeight?: number;
    titlePercentageOfCapsFirstLettersWeight?: number;
    titlePositionScoreWeight?: number;
    useClickableUriAsBasePath?: boolean;
    xmlrecordDefinitions?: XMLRecordDefinition[];
}

export interface DocumentProcessor {
    parameters?: DocumentProcessorParameters;
    type?: string;
}

export interface DocumentProcessorParameters {
    condition?: any;
    deleteOnError?: boolean;
    values?: any;
}

export interface CharsetDetectionHint {
    charset?: string;
    confidence?: number;
}

export interface ExtensionSettings {
    byContentTypes?: ExtensionSettingByExtension[];
    byExtensions?: ExtensionSettingByExtension[];
    noExtension?: ExtensionSetting;
    other?: ExtensionSetting;
}

export interface ExtensionSettingByExtension {
    extensionSetting?: ExtensionSetting;
    extensions?: string[];
}

export interface ExtensionSetting {
    action?: ExtensionSettingAction;
    actionOnError?: ExtensionSettingActionOnError;
    convertDirectlyToHtml?: boolean;
    converter?: ExtensionSettingConverter;
    customConverter?: DocumentProcessor;
    excerptSource?: ExcerptSource;
    fileTypeValue?: string;
    generateThumbnail?: boolean;
    indexContainer?: boolean;
    openResultWithQuickView?: boolean;
    saveExcerptBlob?: boolean;
    summarizeDocument?: boolean;
    useContentType?: boolean;
    useExternalHTMLGenerator?: boolean;
}

export interface LanguageHint {
    language?: string;
    probability?: number;
}

export interface XMLRecordDefinition {
    author?: string;
    body?: string;
    date?: string;
    dateFormat?: string;
    metaData?: XMLMetaData[];
    root?: string;
    summary?: string;
    title?: string;
    unescapeXMLEntities?: boolean;
    uniqueId?: string;
    uri?: string;
}

export interface XMLMetaData {
    name?: string;
    value?: string;
}

export interface ExtendedDataFile {
    data?: string;
    extendedData?: any;
    sensitive?: boolean;
}

export interface ParameterModel {
    sensitive?: boolean;
    value?: string;
}

export interface PermissionLevel {
    name?: string;
    permissionSets?: PermissionSet[];
}

export interface PermissionSet {
    allowAnonymous?: boolean;
    allowedPermissions?: Permission[];
    deniedPermissions?: Permission[];
    name?: string;
}

export interface Permission {
    additionalInfo?: any;
    identity?: string;
    identityType?: PermissionIdentityType;
    securityProvider?: string;
}

export interface UserIdentityModel {
    name?: string;
    password?: string;
    userName?: string;
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
