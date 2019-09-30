export interface PageModel<T = any> {
    items: T[];
    totalEntries: number;
    totalPages: number;
}

export type New<T, K extends string | number | symbol = null> = Omit<T, 'id' | K>;
