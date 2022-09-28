export enum AccessLevel {
    EDIT_ALL = 'EDIT_ALL',
    CUSTOM = 'CUSTOM',
    VIEW_ALL = 'VIEW_ALL',
    NONE = 'NONE',
}

export enum PrivilegeholderType {
    API_KEY = 'API_KEY',
    GROUP = 'GROUP',
}

export enum AuthProvider {
    SALESFORCE = 'SALESFORCE',
    SALESFORCE_SANDBOX = 'SALESFORCE_SANDBOX',
    GOOGLE = 'GOOGLE',
    OFFICE365 = 'OFFICE365',
    SAML = 'SAML',
    EMAIL = 'EMAIL',
}

export enum SecurityCacheStateOptions {
    Unknown = 'UNKNOWN',
    UpToDate = 'UP_TO_DATE',
    NotUpdated = 'NOT_UPDATED',
    OutOfDate = 'OUT_OF_DATE',
    InError = 'IN_ERROR',
    Disabled = 'DISABLED',
}

export enum ScheduleType {
    Minutely = 'MINUTELY',
    Hourly = 'HOURLY',
    Daily = 'DAILY',
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
}

export enum FieldTypes {
    LONG = 'LONG',
    LONG_64 = 'LONG_64',
    DOUBLE = 'DOUBLE',
    DATE = 'DATE',
    STRING = 'STRING',
    VECTOR = 'VECTOR',
}

export enum FieldOrigin {
    ALL = 'ALL',
    USER = 'USER',
    SYSTEM = 'SYSTEM',
}

export enum FacetOrSortStatus {
    ALL = 'ALL',
    TRUE_ONLY = 'TRUE_ONLY',
    FALSE_ONLY = 'FALSE_ONLY',
}

export enum SortingOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortingBy {
    RELEVANCY = 'relevancy',
    DATE = 'date',
    FIELD = 'field',
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

export enum DataStreamType {
    BODY_TEXT = 'BODY_TEXT',
    BODY_HTML = 'BODY_HTML',
    THUMBNAIL = 'THUMBNAIL',
    DOCUMENT_DATA = 'DOCUMENT_DATA',
}

export enum ExtensionLanguageType {
    'PYTHON3' = 'PYTHON3',
}

export enum SourceOperationalStatus {
    ALL = 'ALL',
    LAST_OPERATION_IN_ERROR = 'LAST_OPERATION_IN_ERROR',
    OK = 'OK',
    PAUSED = 'PAUSED',
    READY = 'READY',
    RUNNING = 'RUNNING',
}

export enum SourceStatusType {
    CREATING = 'CREATING',
    DISABLED = 'DISABLED',
    ERROR = 'ERROR',
    IDLE = 'IDLE',
    PAUSED = 'PAUSED',
    PAUSED_ON_ERROR = 'PAUSED_ON_ERROR',
    PUSH_READY = 'PUSH_READY',
    REFRESHING = 'REFRESHING',
}

export enum SourceStatusTypeWithTransition {
    CANCELING = 'CANCELING',
    CREATING = 'CREATING',
    DELETING = 'DELETING',
    DISABLED = 'DISABLED',
    ERROR = 'ERROR',
    IDLE = 'IDLE',
    PAUSED = 'PAUSED',
    PAUSED_ON_ERROR = 'PAUSED_ON_ERROR',
    PAUSING = 'PAUSING',
    PUSH_READY = 'PUSH_READY',
    REFRESHING = 'REFRESHING',
    RESUMING = 'RESUMING',
    STARTING_REFRESH = 'STARTING_REFRESH',
}

export enum SourceType {
    ADOBE_EXPERIENCE_MANAGER = 'ADOBE_EXPERIENCE_MANAGER',
    AMAZONS3 = 'AMAZONS3',
    BOX = 'BOX',
    BOX_ENTERPRISE = 'BOX_ENTERPRISE',
    BOX_ENTERPRISE2 = 'BOX_ENTERPRISE2',
    CATALOG = 'CATALOG',
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
    GENERIC = 'GENERIC_REST',
    GMAIL = 'GMAIL',
    GMAIL_DOMAIN_WIDE = 'GMAIL_DOMAIN_WIDE',
    GMAIL_SINGLE_USER = 'GMAIL_SINGLE_USER',
    GOOGLE_DRIVE_DOMAIN_WIDE = 'GOOGLE_DRIVE_DOMAIN_WIDE',
    GOOGLE_DRIVE_SINGLE_USER = 'GOOGLE_DRIVE_SINGLE_USER',
    JIRA2 = 'JIRA2',
    JIRA2_HOSTED = 'JIRA2_HOSTED',
    JIVE = 'JIVE',
    JIVE_HOSTED = 'JIVE_HOSTED',
    KHOROS = 'KHOROS',
    LITHIUM = 'LITHIUM',
    MICROSOFT = 'MICROSOFT_DYNAMICS',
    ONEDRIVE = 'ONEDRIVE_FOR_BUSINESS',
    PUSH = 'PUSH',
    RSS = 'RSS',
    SALESFORCE = 'SALESFORCE',
    SERVICENOW = 'SERVICENOW',
    SHAREPOINT = 'SHAREPOINT',
    SHAREPOINT_ONLINE = 'SHAREPOINT_ONLINE',
    SHAREPOINT_ONLINE2 = 'SHAREPOINT_ONLINE2',
    SITECORE = 'SITECORE',
    SITEMAP = 'SITEMAP',
    SLACK = 'SLACK',
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

export enum SourceCategory {
    CLOUD = 'CLOUD',
    ON_PREM = 'ON_PREM',
    CRAWLING_MODULE = 'CRAWLING_MODULE',
}

export enum IndexBackupTypes {
    FULL = 'FULL',
    NONE = 'NONE',
    REGULAR = 'REGULAR',
}

export enum IndexType {
    COVEO = 'COVEO',
    ELASTIC = 'ELASTIC',
    INDEX_LESS = 'INDEX_LESS',
    ON_PREMISES = 'ON_PREMISES',
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

export enum UpdateStatusCategory {
    MINOR = 'MINOR',
    CRITICAL = 'CRITICAL',
    BREAKING = 'BREAKING',
}

export enum SortingType {
    TYPE = 'TYPE',
    NAME = 'NAME',
    STATUS = 'STATUS',
    CONTENT = 'CONTENT',
}

export enum SnapshotSortingType {
    CREATED_DATE = 'CREATED_DATE',
    DEVELOPER_NOTE = 'DEVELOPER_NOTE',
    CREATED_BY = 'CREATED_BY',
    ORIGIN_ID = 'ORIGIN_ID',
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

export enum SecurityProviderType {
    ACTIVE_DIRECTORY = 'ACTIVE_DIRECTORY',
    ACTIVE_DIRECTORY2 = 'ACTIVE_DIRECTORY2',
    BOX = 'BOX',
    CLAIMS = 'CLAIMS',
    CLAIMS_TO_EMAIL = 'CLAIMS_TO_EMAIL',
    CONFLUENCE = 'CONFLUENCE',
    CONFLUENCE2 = 'CONFLUENCE2',
    CUSTOM = 'CUSTOM',
    DATABASE = 'DATABASE',
    DROPBOX_FOR_BUSINESS = 'DROPBOX_FOR_BUSINESS',
    EMAIL = 'EMAIL',
    EXPANDED = 'EXPANDED',
    FILE = 'file',
    GOOGLE_DRIVE_DOMAIN_WIDE = 'GOOGLE_DRIVE_DOMAIN_WIDE',
    GENERIC_REST = 'GENERIC_REST',
    JIRA2 = 'JIRA2',
    JIVE = 'JIVE',
    MICROSOFT_DYNAMICS = 'MICROSOFT_DYNAMICS',
    OFFICE365 = 'OFFICE365',
    SALESFORCE = 'SALESFORCE',
    SERVICENOW = 'SERVICENOW',
    SHAREPOINT = 'SHAREPOINT',
    SHAREPOINT_ONLINE = 'SHAREPOINT_ONLINE',
    SITECORE = 'SITECORE',
    ZENDESK = 'ZENDESK',
}

export enum RestUserIdType {
    User = 'User',
    Group = 'Group',
    VirtualGroup = 'VirtualGroup',
    Unknown = 'Unknown',
}

export enum ExcerptSource {
    Document = 'Document',
    Summary = 'Summary',
}

export enum MappingModelKind {
    COMMON = 'COMMON',
    MAPPING = 'MAPPING',
}

export enum DocumentPermissionState {
    UNKNOWN = 'UNKNOWN',
    VALID = 'VALID',
    PENDING = 'PENDING',
    INCOMPLETE = 'INCOMPLETE',
    IN_ERROR = 'IN_ERROR',
    WARNING = 'WARNING',
}

export enum SourceExtensionActionOnError {
    REJECT_DOCUMENT = 'REJECT_DOCUMENT',
    SKIP_EXTENSION = 'SKIP_EXTENSION',
}

export enum UrlFilterType {
    WILDCARD = 'WILDCARD',
    REGEX = 'REGEX',
}

export enum SinglePermissionIdentityType {
    USER = 'USER',
    GROUP = 'GROUP',
    VIRTUAL_GROUP = 'VIRTUAL_GROUP',
    UNKNOWN = 'UNKNOWN',
}

export enum SinglePermissionResult {
    NONE = 'NONE',
    SUCCESS = 'SUCCESS',
    ACCESS_DENIED = 'ACCESS_DENIED',
    TIMED_OUT = 'TIMED_OUT',
    ENTITY_IS_INVALID = 'ENTITY_IS_INVALID',
    ENTITY_IS_UNAVAILABLE = 'ENTITY_IS_UNAVAILABLE',
    SECURITY_PROVIDER_IS_UNAVAILABLE = 'SECURITY_PROVIDER_IS_UNAVAILABLE',
    SECURITY_PROVIDER_IS_UNREACHABLE = 'SECURITY_PROVIDER_IS_UNREACHABLE',
    SECURITY_PROVIDER_IS_NOT_READY = 'SECURITY_PROVIDER_IS_NOT_READY',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export enum SinglePermissionState {
    UNKNOWN = 'UNKNOWN',
    UP_TO_DATE = 'UP_TO_DATE',
    NOT_UPDATED = 'NOT_UPDATED',
    OUT_OF_DATE = 'OUT_OF_DATE',
    IN_ERROR = 'IN_ERROR',
    DISABLED = 'DISABLED',
}

export enum SourceSecurityOption {
    Retrieve = 'Retrieve',
    Specified = 'Specified',
    Merge = 'Merge',
}

export enum PatternType {
    Wildcard = 'Wildcard',
    RegEx = 'RegEx',
}

export enum AuthenticationActionMethod {
    Post = 'Post',
    Get = 'Get',
}

export enum AuthenticationInputType {
    Text = 'Text',
    Password = 'Password',
    Checkbox = 'Checkbox',
    Radio = 'Radio',
    Submit = 'Submit',
    Reset = 'Reset',
    File = 'File',
    Hidden = 'Hidden',
    Image = 'Image',
    Button = 'Button',
}

export enum ExtensionSettingAction {
    Retrieve = 'Retrieve',
    Reference = 'Reference',
    Ignore = 'Ignore',
}

export enum ExtensionSettingActionOnError {
    Reference = 'Reference',
    Ignore = 'Ignore',
}

export enum ExtensionSettingConverter {
    Detect = 'Detect',
    Skip = 'Skip',
    Html = 'Html',
    IFilter = 'IFilter',
    Wordperfect = 'Wordperfect',
    Rtf = 'Rtf',
    Excel = 'Excel',
    Word = 'Word',
    Pdf = 'Pdf',
    Powerpoint = 'Powerpoint',
    Plain = 'PlainText',
    Zip = 'Zip',
    Xml = 'Xml',
    Msg = 'Msg',
    Mime = 'Mime',
    Image = 'Image',
}

export enum PermissionIdentityType {
    Unknown = 'Unknown',
    User = 'User',
    Group = 'Group',
    VirtualGroup = 'VirtualGroup',
}

export enum SecurityProviderReferenceType {
    SOURCE = 'SOURCE',
    SECURITY_PROVIDER = 'SECURITY_PROVIDER',
}

export enum IntervalUnit {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
}

export enum ModelStatus {
    DELETED = 'DELETED',
    SCHEDULING = 'SCHEDULING',
    SCHEDULED = 'SCHEDULED',
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    REGISTERED = 'REGISTERED',
    REGISTERED_DEGRADED = 'REGISTERED_DEGRADED',
    PAUSED = 'PAUSED',
    REGISTERING = 'REGISTERING',
    REGISTERING_DEGRADED = 'REGISTERING_DEGRADED',
    REGISTERING_UPDATE_DEGRADED = 'REGISTERING_UPDATE_DEGRADED',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR_DELETING = 'ERROR_DELETING',
    COMPLETED = 'COMPLETED',
    COMPLETED_DEGRADED = 'COMPLETED_DEGRADED',
    ONLINE = 'ONLINE',
    ONLINE_DEGRADED = 'ONLINE_DEGRADED',
    OFFLINE = 'OFFLINE',
    IN_QUEUE = 'IN_QUEUE',
    BUILDING = 'BUILDING',
    FAILED = 'FAILED',
    IN_QUEUE_UPDATING = 'IN_QUEUE_UPDATING',
    IN_PROGRESS_UPDATING = 'IN_PROGRESS_UPDATING',
    UPDATING = 'UPDATING',
    DEGRADED = 'DEGRADED',
    UPDATING_DEGRADED = 'UPDATING_DEGRADED',
    UPDATE_FAILED = 'UPDATE_FAILED',
}

export enum ModelActivenessState {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum ModelConfigFileType {
    ADVANCED_CONFIGURATION = 'ADVANCED_CONFIGURATION',
    STOPWORDS = 'STOPWORDS',
    BLACKLISTS = 'BLACKLISTS',
    ID_MAPPING = 'ID_MAPPING',
    FACET_ID_MAPPING = 'FACET_ID_MAPPING',
    DEFAULT_QUERIES = 'DEFAULT_QUERIES',
}

export enum ProductType {
    ALLIANCE = 'ALLIANCE',
    INTERNAL = 'INTERNAL',
    SALES = 'SALES',
    SANDBOX = 'SANDBOX',
    STANDARD = 'STANDARD',
    TEST = 'TEST',
    TRIAL = 'TRIAL',
}

export enum ProductEdition {
    BASE = 'BASE',
    ENTERPRISE = 'ENTERPRISE',
    FREE = 'FREE',
    PRO = 'PRO',
    STANDARD = 'STANDARD',
}

export enum ProductName {
    COVEO_CLOUD = 'COVEO_CLOUD',
    DYNAMICS = 'DYNAMICS',
    SALESFORCE = 'SALESFORCE',
    SERVICENOW = 'SERVICENOW',
    SITECORE = 'SITECORE',
    USAGE_ANALYTICS = 'USAGE_ANALYTICS',
}

export enum LanguageCode {
    AA = 'aa',
    AB = 'ab',
    AE = 'ae',
    AF = 'af',
    AK = 'ak',
    AM = 'am',
    AN = 'an',
    AR = 'ar',
    AS = 'as',
    AV = 'av',
    AY = 'ay',
    AZ = 'az',
    BA = 'ba',
    BE = 'be',
    BG = 'bg',
    BH = 'bh',
    BI = 'bi',
    BM = 'bm',
    BN = 'bn',
    BO = 'bo',
    BR = 'br',
    BS = 'bs',
    CA = 'ca',
    CE = 'ce',
    CH = 'ch',
    CO = 'co',
    CR = 'cr',
    CS = 'cs',
    CU = 'cu',
    CV = 'cv',
    CY = 'cy',
    DA = 'da',
    DE = 'de',
    DV = 'dv',
    EE = 'ee',
    EL = 'el',
    EN = 'en',
    EO = 'eo',
    ES = 'es',
    ET = 'et',
    EU = 'eu',
    FA = 'fa',
    FF = 'ff',
    FI = 'fi',
    FJ = 'fj',
    FO = 'fo',
    FR = 'fr',
    FY = 'fy',
    GA = 'ga',
    GD = 'gd',
    GL = 'gl',
    GN = 'gn',
    GU = 'gu',
    GV = 'gv',
    HA = 'ha',
    HE = 'he',
    HI = 'hi',
    HO = 'ho',
    HR = 'hr',
    HT = 'ht',
    HU = 'hu',
    HY = 'hy',
    HZ = 'hz',
    IA = 'ia',
    ID = 'id',
    IE = 'ie',
    IG = 'ig',
    II = 'ii',
    IK = 'ik',
    IO = 'io',
    IS = 'is',
    IT = 'it',
    IU = 'iu',
    JA = 'ja',
    JV = 'jv',
    KA = 'ka',
    KG = 'kg',
    KI = 'ki',
    KJ = 'kj',
    KK = 'kk',
    KL = 'kl',
    KM = 'km',
    KN = 'kn',
    KO = 'ko',
    KR = 'kr',
    KS = 'ks',
    KU = 'ku',
    KV = 'kv',
    KW = 'kw',
    KY = 'ky',
    LA = 'la',
    LB = 'lb',
    LG = 'lg',
    LI = 'li',
    LN = 'ln',
    LO = 'lo',
    LT = 'lt',
    LU = 'lu',
    LV = 'lv',
    MG = 'mg',
    MH = 'mh',
    MI = 'mi',
    MK = 'mk',
    ML = 'ml',
    MN = 'mn',
    MR = 'mr',
    MS = 'ms',
    MT = 'mt',
    MY = 'my',
    NA = 'na',
    NB = 'nb',
    ND = 'nd',
    NE = 'ne',
    NG = 'ng',
    NL = 'nl',
    NN = 'nn',
    NO = 'no',
    NR = 'nr',
    NV = 'nv',
    NY = 'ny',
    OC = 'oc',
    OJ = 'oj',
    OM = 'om',
    OR = 'or',
    OS = 'os',
    PA = 'pa',
    PI = 'pi',
    PL = 'pl',
    PS = 'ps',
    PT = 'pt',
    QU = 'qu',
    RM = 'rm',
    RN = 'rn',
    RO = 'ro',
    RU = 'ru',
    RW = 'rw',
    SA = 'sa',
    SC = 'sc',
    SD = 'sd',
    SE = 'se',
    SG = 'sg',
    SI = 'si',
    SK = 'sk',
    SL = 'sl',
    SM = 'sm',
    SN = 'sn',
    SO = 'so',
    SQ = 'sq',
    SR = 'sr',
    SS = 'ss',
    ST = 'st',
    SU = 'su',
    SV = 'sv',
    SW = 'sw',
    TA = 'ta',
    TE = 'te',
    TG = 'tg',
    TH = 'th',
    TI = 'ti',
    TK = 'tk',
    TL = 'tl',
    TN = 'tn',
    TO = 'to',
    TR = 'tr',
    TS = 'ts',
    TT = 'tt',
    TW = 'tw',
    TY = 'ty',
    UG = 'ug',
    UK = 'uk',
    UR = 'ur',
    UZ = 'uz',
    VE = 've',
    VI = 'vi',
    VO = 'vo',
    WA = 'wa',
    WO = 'wo',
    XH = 'xh',
    YI = 'yi',
    YO = 'yo',
    ZA = 'za',
    ZH = 'zh',
}

export enum StatementsFeature {
    Filter = 'filter',
    Trigger = 'trigger',
    Ranking = 'ranking',
    Stop = 'stop',
    Thesaurus = 'thesaurus',
    Top = 'top',
    ResultRankings = 'resultRankings',
    TopClicks = 'topClicks',
    QuerySuggest = 'querySuggest',
    RankingWeight = 'rankingweight',
    Recommendation = 'recommendation',
    QueryParamOverride = 'queryParamOverride',
}

export enum ResultRankingsKind {
    featuredResults = 'featured_result',
    rankingExpression = 'ranking_expression',
}

export enum ResultRankingsRuleTypes {
    featuredResults = 'featuredResults',
    rankingExpressions = 'rankingExpressions',
}

export enum ResultRankingsStatuses {
    active = 'active',
    inactive = 'inactive',
}

export enum ResultRankingLocales {
    all = 'all',
    unspecified = 'unspecified',
    specific = 'specific',
}

export enum ResultRankingMatchOperators {
    is = 'is',
    contains = 'contains',
    matches = 'matches',
}

// @deprecated use PredicateKind instead
export enum ResultRankingPredicateKind {
    basicExpressionAndLocalePredicate = 'basicExpressionAndLocalePredicate',
    qplPredicate = 'qplPredicate',
}

export enum PredicateKind {
    BasicExpressionAndLocalePredicate = 'basicExpressionAndLocalePredicate',
    QPLPredicate = 'qplPredicate',
}

export enum PredicateLocaleKind {
    All = 'all',
    Unspecified = 'unspecified',
    Specific = 'specific',
}

export enum PredicateMatchOperator {
    Is = 'is',
    Contain = 'contains',
    Matches = 'matches',
}

export enum FacetRuleKind {
    AutoSelect = 'autoSelect',
}

export enum FacetRuleState {
    Selected = 'selected',
}

export enum ResultRankingLocalizedContentLocales {
    auto = 'auto',
    specific = 'specific',
}

export enum ListStatementSortBy {
    Position = 'position',
    Definition = 'definition',
    Description = 'description',
}

export enum StatementGroupType {
    campaign = 'campaign',
    permanent = 'permanent',
}

/**
 * An union of all the possible status that you can filter on.
 */
export enum ListStatementGroupStatusType {
    Active = 'active',
    Inactive = 'inactive',
    Expired = 'expired',
    NotStarted = 'notStarted',
}

export enum CampaignStatementGroupStatusType {
    Active = 'active',
    Inactive = 'inactive',
    Expired = 'expired',
    NotStarted = 'notStarted',
}

export enum PermanentStatementGroupStatusType {
    Active = 'active',
    Inactive = 'inactive',
}

export enum DimensionType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    SHORT = 'SHORT',
    BOOLEAN = 'BOOLEAN',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
}

export enum DimensionStatus {
    AVAILABLE = 'AVAILABLE',
    UPDATING = 'UPDATING',
}

export enum DimensionEventTypes {
    searches = 'searches',
    clicks = 'clicks',
    custom_events = 'custom_events',
}

export enum RegionType {
    Primary = 'PRIMARY',
    Secondary = 'SECONDARY',
}

export enum FormAuthenticationFailedMethod {
    RedirectedToUrl = 'RedirectedToUrl',
    PageDoesNotContain = 'PageDoesNotContain',
    PageContains = 'PageContains',
    CookieNotSet = 'CookieNotSet',
    UrlMatch = 'UrlMatch',
    UrlDoesNotMatch = 'UrlDoesNotMatch',
}

export enum FormInputType {
    Username = 'Username',
    Password = 'Password',
    Input = 'Input',
}

export enum ModelTypes {
    TopClicks = 'topclicks',
    QuerySuggest = 'querysuggest',
    PQSForCommerce = 'pqsforcommerce',
    EventRecommendation = 'eventrecommendation',
    FacetSense = 'facetsense',
    ECommerce = 'ecommerce',
    CaseClassification = 'caseclassification',
    SmartSnippets = 'mlquestionanswering',
    UserActionHistory = 'useractionhistory',
}

export enum LicenseSection {
    internal = 'internal',
    organization = 'organization',
    usageAnalytics = 'usageAnalytics',
    inProductExperience = 'inProductExperience',
    commerce = 'commerce',
    content = 'content',
    searchapi = 'searchapi',
}

export enum SearchHubRawMetrics {
    normalQueries = 'normalQueries',
    recommendationQueries = 'recommendationQueries',
    commerceProductListingQueries = 'commerceProductListingQueries',
    users = 'users',
    staticQueries = 'staticQueries',
}

export enum SearchHubLicenseMetrics {
    normalQueries = 'normalQueries',
    recommendationsQueries = 'recommendationsQueries',
    commerceProductListingQueries = 'commerceProductListingQueries',
    agents = 'agents',
    staticQueries = 'staticQueries',
    intranetUsers = 'intranetUsers',
    partnetUsers = 'partnerUsers',
    timesExceededQps = 'timesExceededQps',
    platformIntranetUsers = 'platformIntranetUsers',
    platformAgents = 'platformAgents',
    platformPortalUsers = 'platformPortalUsers',
    salesforceServiceCloudAgents = 'salesforceServiceCloudAgents',
    salesforceSalesCloudUsers = 'salesforceSalesCloudUsers',
    salesforcePlatformUsers = 'salesforcePlatformUsers',
    salesforceCommunityCloudUsers = 'salesforceCommunityCloudUsers',
    snowCSMAgents = 'snowCSMAgents',
    snowFulfillers = 'snowFulfillers',
    snowITSMUsers = 'snowITSMUsers',
    snowHRSDUsers = 'snowHRSDUsers',
    dynamicsCustomerEngagementUsers = 'dynamicsCustomerEngagementUsers',
}

export enum SearchHubLicenseType {
    assignment = 'assignment',
    global = 'global',
}

export enum SubscriptionFrequencyEnum {
    live = 'LIVE',
    hourly = 'HOURLY',
    daily = 'DAILY',
    weekly = 'WEEKLY',
}

export enum SubscriptionTypeEnum {
    email = 'EMAIL',
    emailJson = 'EMAIL_JSON',
    webHook = 'WEB_HOOK',
}

export enum SubscriptionStatusHealthIndicatorEnum {
    good = 'GOOD',
    warning = 'WARNING',
    problematic = 'PROBLEMATIC',
    unknown = 'UNKNOWN',
}

export enum IndexingPipelineLogOperations {
    add = 'ADD',
    addByReference = 'ADD_BY_REFERENCE',
    batchFile = 'BATCH_FILE',
    delete = 'DELETE',
    deleteAndChildren = 'DELETE_AND_CHILDREN',
    deleteOlderThan = 'DELETE_OLDER_THAN',
    update = 'UPDATE',
}

export enum IndexingPipelineLogResults {
    completed = 'COMPLETED',
    error = 'ERROR',
    rejected = 'REJECTED',
    skipped = 'SKIPPED',
    warning = 'WARNING',
}

export enum IndexingPipelineLogTasks {
    consuming = 'CONSUMING',
    consumingBatch = 'CONSUMING_BATCH',
    crawling = 'CRAWLING',
    streamingExtension = 'STREAMING_EXTENSION',
    extension = 'EXTENSION',
    indexing = 'INDEXING',
    mapping = 'MAPPING',
    processing = 'PROCESSING',
    streaming = 'STREAMING',
    streamingBatch = 'STREAMING_BATCH',
    preindexing = 'PREINDEXING',
}

export enum RedshiftEndpointStatus {
    online = 'ONLINE',
    unavailable = 'UNAVAILABLE',
    readOnly = 'READ_ONLY',
    writeOnly = 'WRITE_ONLY',
}

export enum ExportStatus {
    available = 'AVAILABLE',
    pending = 'PENDING',
    failed = 'FAILED',
}

export enum ExportTablesType {
    searches = 'SEARCHES',
    clicks = 'CLICKS',
    customEvents = 'CUSTOM_EVENTS',
    keywords = 'KEYWORDS',
    groups = 'GROUPS',
    allEvents = 'ALL_EVENTS',
}

export enum CSVFileFormat {
    excel = 'EXCEL',
    noNewline = 'NO_NEWLINE',
}

export enum SnowflakeReaderAccountStatus {
    creating = 'CREATING',
    available = 'AVAILABLE',
}

export enum DayOfWeek {
    monday = 'MONDAY',
    tuesday = 'TUESDAY',
    wednesday = 'WEDNESDAY',
    thursday = 'THURSDAY',
    friday = 'FRIDAY',
    saturday = 'SATURDAY',
    sunday = 'SUNDAY',
}

export enum ExportScheduleFrequency {
    daily = 'DAILY',
    monthly = 'MONTHLY',
    weekly = 'WEEKLY',
}

export enum ReportType {
    Dashboard = 'DASHBOARD',
    Explorer = 'EXPLORER',
}

export enum VaultFetchStrategy {
    allOrNothing = 'ALL_OR_NOTHING',
    onlyMissing = 'ONLY_MISSING',
    overwrite = 'OVERWRITE',
}

export enum DataShareStatus {
    UNKNOWN = 'UNKNOWN',
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    INVALID = 'INVALID',
}

export enum VaultVisibilityType {
    OBFUSCATED = 'OBFUSCATED',
    PUBLIC = 'PUBLIC',
    STRICT = 'STRICT',
}

export enum VaultValueType {
    BOOLEAN = 'BOOLEAN',
    FLOAT = 'FLOAT',
    INTEGER = 'INTEGER',
    STRING = 'STRING',
}

export enum FieldOperatorType {
    IS_ANY_OF = 'IS_ANY_OF',
    IS_BETWEEN = 'IS_BETWEEN',
    IS_EXACTLY = 'IS_EXACTLY',
    IS_GREATER_THAN = 'IS_GREATER_THAN',
    IS_GREATER_THAN_OR_EQUAL_TO = 'IS_GREATER_THAN_OR_EQUAL_TO',
    IS_LESS_THAN = 'IS_LESS_THAN',
    IS_LESS_THAN_OR_EQUAL_TO = 'IS_LESS_THAN_OR_EQUAL_TO',
}

export enum FieldValueType {
    RANGE = 'RANGE',
    STRING = 'STRING',
    DECIMAL = 'DECIMAL',
    ARRAY = 'ARRAY',
    HIERARCHIC_MULTI_VALUE = 'HIERARCHIC_MULTI_VALUE',
}

export enum ProductsFacetRequestSortType {
    alphanumeric = 'alphanumeric',
    score = 'score',
}

export enum ProductsSortByType {
    fields = 'fields',
    relevance = 'relevance',
}
