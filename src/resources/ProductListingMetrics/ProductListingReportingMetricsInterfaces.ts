import {ProductListingMetricsModel} from './ProductListingMetricsInterfaces.js';

export interface ProductListingReportingMetricsModel extends ProductListingMetricsModel {
    revenue: number;
    revenueVariation: number;
    conversionRate: number;
    conversionRateVariation: number;
    bounceRate: number;
    bounceRateVariation: number;
    views: number;
    visits: number;
    visitors: number;
    clicksProduct: number;
    transactions: number;
    averageClickRank: number;
    clickThroughRate: number;
    averageOrderValue: number;
    revenuePerVisitor: number;
}

export interface ProductListingReportingMetricsOptions {
    startDate: string;
    endDate: string;
}
