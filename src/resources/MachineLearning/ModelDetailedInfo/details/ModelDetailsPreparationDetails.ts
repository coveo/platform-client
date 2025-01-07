interface DatasetFieldDetails {
    numSamples: number;
    labelsDistribution: Record<string, number>;
}

interface FacetDetails {
    facetLabels: Record<string, string[]>;
}

interface DatasetDetails {
    numRows: number;
    dataDetails: Record<string, DatasetFieldDetails>;
}

export interface ModelDetailsPreparationDetails {
    trainDatasetsDetails: DatasetDetails;
    testDatasetsDetails: DatasetDetails;
    facetDetails: FacetDetails;
}
