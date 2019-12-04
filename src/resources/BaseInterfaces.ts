export interface PageModel<T = any> {
    items: T[];
    totalEntries: number;
    totalPages: number;
}

export type New<T, K extends string | number | symbol = null> = Omit<T, 'id' | K>;

export enum AuthProvider {
    SALESFORCE = 'SALESFORCE',
    SALESFORCE_SANDBOX = 'SALESFORCE_SANDBOX',
    GOOGLE = 'GOOGLE',
    OFFICE365 = 'OFFICE365',
    SAML = 'SAML',
    EMAIL = 'EMAIL',
}

export interface IdAndDisplayNameModel {
    id: string;
    displayName?: string;
}

export interface PrivilegeModel {
    owner: string;
    targetDomain: string;
    targetId: string;
    type?: string;
}

export enum SortingOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum FieldTypes {
    LONG = 'LONG',
    LONG_64 = 'LONG_64',
    DOUBLE = 'DOUBLE',
    DATE = 'DATE',
    STRING = 'STRING',
}
