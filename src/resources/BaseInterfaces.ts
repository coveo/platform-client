export interface PageModel<T = any> {
    items: T[];
    totalEntries: number;
    totalPages: number;
}

export type New<T, K extends string | number | symbol = null> = Omit<T, 'id' | K>;

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

export interface GranularResource {
    groupsThatCanEdit?: IdAndDisplayNameModel[];
    apiKeysThatCanEdit?: IdAndDisplayNameModel[];
}
