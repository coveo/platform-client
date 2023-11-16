export type ProductListingMetricsOptions = {
    page?: number;
    perPage?: number;
    startDate?: string;
    endDate?: string;
    sort?: string;
    filter?: string;
};

export interface ProductListingMetricsItem {
    id: string;
    name: string;
    revenue: number;
    lastNumberOfProducts: number;
    catalogId: string;
    conversionRate: number;
    bounceRate: number;
}
export interface ProductListingMetricsModel {
    items: ProductListingMetricsItem[];
    totalPages: number;
    totalEntries: number;
}
