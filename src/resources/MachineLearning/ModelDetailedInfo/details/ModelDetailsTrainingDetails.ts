interface FacetPerformanceDetails {
    hit1: number;
    hit3: number;
}

export interface ModelDetailsTrainingDetails {
    performanceDetails: Record<string, FacetPerformanceDetails>;
}
