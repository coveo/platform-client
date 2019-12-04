import {FieldTypes, IdAndDisplayNameModel, SortingOrder} from '../BaseInterfaces';

export interface SourceModel {
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    configurationError?: ConfigurationError;
    crawlingModuleId?: string;
    customParameters?: any;
    groupsThatCanEdit?: IdAndDisplayNameModel[];
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
    resourceId?: string;
    securityProviderReferences?: string[];
    sourceType?: SourceType;
    sourceVisibility?: SourceVisibility;
    urlFilters?: UrlFilter[];
}

export interface ConfigurationError {
    errorCode?: string;
    message?: string;
}

export interface SourceInformation {
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
    kind?: 'COMMON' | 'MAPPING';
    type?: string;
}

export interface DocumentPermissionModel {
    lastUpdatedDate?: number;
    permissionLevels?: PermissionLevelModel[];
    state?: 'UNKNOWN' | 'VALID' | 'PENDING' | 'INCOMPLETE' | 'IN_ERROR' | 'WARNING';
}

export interface SourceExtensionModel {
    actionOnError?: 'REJECT_DOCUMENT' | 'SKIP_EXTENSION';
    condition?: string;
    extensionId?: string;
    itemType?: string;
    parameters?: any;
    versionId?: string;
}

export interface UrlFilter {
    filter?: string;
    filterType?: 'WILDCARD' | 'REGEX';
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
    identityType?: 'USER' | 'GROUP' | 'VIRTUAL_GROUP' | 'UNKNOWN';
    lastUpdateDate?: number;
    lastUpdateErrorDetail?: string;
    lastUpdateResult?:
        | 'NONE'
        | 'SUCCESS'
        | 'ACCESS_DENIED'
        | 'TIMED_OUT'
        | 'ENTITY_IS_INVALID'
        | 'ENTITY_IS_UNAVAILABLE'
        | 'SECURITY_PROVIDER_IS_UNAVAILABLE'
        | 'SECURITY_PROVIDER_IS_UNREACHABLE'
        | 'SECURITY_PROVIDER_IS_NOT_READY'
        | 'UNEXPECTED_ERROR';
    securityProvider?: string;
    state?: 'UNKNOWN' | 'UP_TO_DATE' | 'NOT_UPDATED' | 'OUT_OF_DATE' | 'IN_ERROR' | 'DISABLED';
}

export enum OperationType {
    REBUILD = 'REBUILD',
    FULL_REFRESH = 'FULL_REFRESH',
    INCREMENTAL_REFRESH = 'INCREMENTAL_REFRESH',
    SECURITY_PROVIDER_REFRESH = 'SECURITY_PROVIDER_REFRESH',
    SECURITY_PROVIDER_REFRESH_ENTITIES_IN_ERROR = 'SECURITY_PROVIDER_REFRESH_ENTITIES_IN_ERROR',
    SECURITY_PROVIDER_REFRESH_ENTITIES_NOT_UPDATED = 'SECURITY_PROVIDER_REFRESH_ENTITIES_NOT_UPDATED',
    SECURITY_CACHE_REFRESH = 'SECURITY_CACHE_REFRESH',
    SECURITY_CACHE_REFRESH_ENTITIES_IN_ERROR = 'SECURITY_CACHE_REFRESH_ENTITIES_IN_ERROR',
}

export enum SourceStatusType {
    CREATING = 'CREATING',
    DISABLED = 'DISABLED',
    REFRESHING = 'REFRESHING',
    PAUSED = 'PAUSED',
    PAUSED_ON_ERROR = 'PAUSED_ON_ERROR',
    IDLE = 'IDLE',
    ERROR = 'ERROR',
    PUSH_READY = 'PUSH_READY',
}

export enum SourceType {
    AMAZONS3 = 'AMAZONS3',
    BOX = 'BOX',
    BOX_ENTERPRISE = 'BOX_ENTERPRISE',
    BOX_ENTERPRISE2 = 'BOX_ENTERPRISE2',
    CONFLUENCE = 'CONFLUENCE',
    CONFLUENCE2 = 'CONFLUENCE2',
    CONFLUENCE2_HOSTED = 'CONFLUENCE2_HOSTED',
    CUSTOM = 'CUSTOM',
    DATABASE = 'DATABASE',
    DROPBOX = 'DROPBOX',
    DROPBOX_FOR_BUSINESS = 'DROPBOX_FOR_BUSINESS',
    EXCHANGE = 'EXCHANGE',
    EXCHANGE_ENTERPRISE = 'EXCHANGE_ENTERPRISE',
    FILE = 'FILE',
    GMAIL = 'GMAIL',
    GMAIL_DOMAIN_WIDE = 'GMAIL_DOMAIN_WIDE',
    GMAIL_SINGLE_USER = 'GMAIL_SINGLE_USER',
    GENERIC = 'GENERIC_REST',
    GOOGLE_DRIVE_DOMAIN_WIDE = 'GOOGLE_DRIVE_DOMAIN_WIDE',
    GOOGLE_DRIVE_SINGLE_USER = 'GOOGLE_DRIVE_SINGLE_USER',
    JIRA2 = 'JIRA2',
    JIRA2_HOSTED = 'JIRA2_HOSTED',
    JIVE = 'JIVE',
    JIVE_HOSTED = 'JIVE_HOSTED',
    LITHIUM = 'LITHIUM',
    MICROSOFT = 'MICROSOFT_DYNAMICS',
    ONEDRIVE = 'ONEDRIVE_FOR_BUSINESS',
    OPENTEXT = 'OPENTEXT_CONTENT_SERVER',
    PUSH = 'PUSH',
    RSS = 'RSS',
    SALESFORCE = 'SALESFORCE',
    SERVICENOW = 'SERVICENOW',
    SHAREPOINT = 'SHAREPOINT',
    SHAREPOINT_ONLINE = 'SHAREPOINT_ONLINE',
    SHAREPOINT_ONLINE2 = 'SHAREPOINT_ONLINE2',
    SITECORE = 'SITECORE',
    SITEMAP = 'SITEMAP',
    TWITTER2 = 'TWITTER2',
    WEB2 = 'WEB2',
    YOUTUBE = 'YOUTUBE',
    ZENDESK = 'ZENDESK',
}

export enum SourceVisibility {
    PRIVATE = 'PRIVATE',
    SECURED = 'SECURED',
    SHARED = 'SHARED',
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

export enum FilterHostType {
    CLOUD = 'CLOUD',
    CRAWLING_MODULE = 'CRAWLING_MODULE',
    PUSH = 'PUSH',
}

export enum FilterLastOperationResultType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    ABORT = 'ABORT',
}

export enum FilterLastOperationType {
    INCREMENTAL_REFRESH = 'INCREMENTAL_REFRESH',
    FULL_REFRESH = 'FULL_REFRESH',
    REBUILD = 'REBUILD',
}

export enum FilterStatusType {
    CREATING = 'CREATING',
    REFRESHING = 'REFRESHING',
    PAUSED = 'PAUSED',
    PAUSED_ON_ERROR = 'PAUSED_ON_ERROR',
    IDLE = 'IDLE',
    ERROR = 'ERROR',
}

export enum SortingType {
    TYPE = 'TYPE',
    NAME = 'NAME',
    STATUS = 'STATUS',
    CONTENT = 'CONTENT',
}

export enum ActivityOperation {
    COMMIT = 'COMMIT',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    DISABLE = 'DISABLE',
    DUPLICATE = 'DUPLICATE',
    ENABLE = 'ENABLE',
    ENABLE_DISABLED_ENTITIES = 'ENABLE_DISABLED_ENTITIES',
    UPDATE = 'UPDATE',
    START = 'START',
    STOP = 'STOP',
    PAUSE = 'PAUSE',
    PAUSE_ON_ERROR = 'PAUSE_ON_ERROR',
    RESUME = 'RESUME',
    SYNCHRONIZE = 'SYNCHRONIZE',
    BACKUP = 'BACKUP',
    REFRESH = 'REFRESH',
    REFRESH_ENTITIES_IN_ERROR = 'REFRESH_ENTITIES_IN_ERROR',
    REFRESH_ENTITIES_NOT_UPDATED = 'REFRESH_ENTITIES_NOT_UPDATED',
    REFRESH_ENTITY = 'REFRESH_ENTITY',
    RESIZE = 'RESIZE',
    RESTORE = 'RESTORE',
    IMPORT = 'IMPORT',
    EXPORT = 'EXPORT',
    CONFIG_CHANGE = 'CONFIG_CHANGE',
    CONFIG_CREATE = 'CONFIG_CREATE',
    CHANGE_READ_ONLY = 'CHANGE_READ_ONLY',
    CHANGE_ONLINE = 'CHANGE_ONLINE',
    TEST = 'TEST',
    UPGRADE = 'UPGRADE',
    SCHEDULE_CREATE = 'SCHEDULE_CREATE',
    SCHEDULE_CHANGE = 'SCHEDULE_CHANGE',
    SCHEDULE_DELETE = 'SCHEDULE_DELETE',
    ORG_PROVISIONING_CHECK = 'ORG_PROVISIONING_CHECK',
    REBUILD = 'REBUILD',
    FULL_REFRESH = 'FULL_REFRESH',
    INCREMENTAL_REFRESH = 'INCREMENTAL_REFRESH',
    IDLE = 'IDLE',
    REFRESH_CANCEL = 'REFRESH_CANCEL',
    LIMIT_REACHED = 'LIMIT_REACHED',
    SEARCH_CERTIFICATE_UPDATE = 'SEARCH_CERTIFICATE_UPDATE',
}

export interface CreateSourceOptions {
    rebuild?: boolean;
    updateSecurityProviders?: boolean;
}

export interface RawSourceConfig {
    additionalComments?: string;
    additionalInfos?: any;
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
    configuration?: ExtendedConfig;
    crawlerInstanceType?: string;
    crawlingModuleId?: string;
    fromRaw?: boolean;
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    id?: string;
    logicalIndex?: string;
    mappings?: MappingModel[];
    name?: string;
    onPremisesEnabled?: boolean;
    owner?: string;
    postConversionExtensions?: SourceExtensionModel[];
    preConversionExtensions?: SourceExtensionModel[];
    pushEnabled?: boolean;
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
    sourceSecurityOption?: 'Retrieve' | 'Specified' | 'Merge';
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
    patternType?: 'Wildcard' | 'RegEx';
}

export interface FormAuthentication {
    actionMethod?: 'Post' | 'Get';
    actionURL?: string;
    formURL?: string;
    inputs?: FormAuthenticationInput[];
    reauthenticate?: boolean;
    secureURL?: string;
}

export interface FormAuthenticationInput {
    name?: string;
    type?: 'Text' | 'Password' | 'Checkbox' | 'Radio' | 'Submit' | 'Reset' | 'File' | 'Hidden' | 'Image' | 'Button';
    value?: string;
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

export enum ExcerptSource {
    Document = 'Document',
    Summary = 'Summary',
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
    action?: 'Retrieve' | 'Reference' | 'Ignore';
    actionOnError?: 'Reference' | 'Ignore';
    convertDirectlyToHtml?: boolean;
    converter?:
        | 'Detect'
        | 'Skip'
        | 'Html'
        | 'IFilter'
        | 'Wordperfect'
        | 'Rtf'
        | 'Excel'
        | 'Word'
        | 'Pdf'
        | 'Powerpoint'
        | 'PlainText'
        | 'Zip'
        | 'Xml'
        | 'Msg'
        | 'Mime'
        | 'Image';
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
    identityType?: 'Unknown' | 'User' | 'Group' | 'VirtualGroup';
    securityProvider?: string;
}

export interface SecurityProvider {
    name?: string;
    typeName?: string;
}

export interface SecurityProviderReferenceModel {
    attributes?: any;
    id?: string;
    type?: 'SOURCE' | 'SECURITY_PROVIDER';
}

export interface UserIdentityModel {
    name?: string;
    password?: string;
    userName?: string;
}

export interface CascadingSecurityProvider {
    id?: string;
    name?: string;
    type?: SecurityProviderType;
    typeName?: string;
}

export enum SecurityProviderType {
    ACTIVE_DIRECTORY = 'ACTIVE_DIRECTORY',
    BOX = 'BOX',
    CLAIMS = 'CLAIMS',
    CLAIMS_TO_EMAIL = 'CLAIMS_TO_EMAIL',
    CONFLUENCE = 'CONFLUENCE',
    CONFLUENCE2 = 'CONFLUENCE2',
    CUSTOM = 'CUSTOM',
    DROPBOX_FOR_BUSINESS = 'DROPBOX_FOR_BUSINESS',
    EMAIL = 'EMAIL',
    EXPANDED = 'EXPANDED',
    GOOGLE_DRIVE_DOMAIN_WIDE = 'GOOGLE_DRIVE_DOMAIN_WIDE',
    JIRA2 = 'JIRA2',
    JIVE = 'JIVE',
    MICROSOFT_DYNAMICS = 'MICROSOFT_DYNAMICS',
    OFFICE365 = 'OFFICE365',
    OPENTEXT_CONTENT_SERVER = 'OPENTEXT_CONTENT_SERVER',
    SALESFORCE = 'SALESFORCE',
    SHAREPOINT = 'SHAREPOINT',
    SHAREPOINT_ONLINE = 'SHAREPOINT_ONLINE',
    SITECORE = 'SITECORE',
    ZENDESK = 'ZENDESK',
}

export interface LightSourceModel {
    crawlerInstanceType?: string;
    id?: string;
    name?: string;
    onPremisesEnabled?: boolean;
    pushEnabled?: boolean;
    sourceType?: SourceType;
}
