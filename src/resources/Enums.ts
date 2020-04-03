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
}

export enum FieldOrigin {
    ALL = 'ALL',
    USER = 'USER',
    SYSTEM = 'SYSTEM',
}

export enum SortingOrder {
    ASC = 'ASC',
    DESC = 'DESC',
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
    PAUSED = 'PAUSED',
    REGISTERING = 'REGISTERING',
    IN_PROGRESS = 'IN_PROGRESS',
    ERROR_DELETING = 'ERROR_DELETING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    IN_CREATION = 'IN_CREATION',
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
    INTERNAL = 'INTERNAL',
    SALES = 'SALES',
    ALLIANCE = 'ALLIANCE',
    SANDBOX = 'SANDBOX',
    STANDARD = 'STANDARD',
    TRIAL = 'TRIAL',
}

export enum ProductEdition {
    ENTERPRISE = 'ENTERPRISE',
    FREE = 'FREE',
    PRO = 'PRO',
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

export enum ResultRankingPredicateKind {
    basicExpressionAndLocalePredicate = 'basicExpressionAndLocalePredicate',
    qplPredicate = 'qplPredicate',
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
