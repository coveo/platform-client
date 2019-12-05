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
