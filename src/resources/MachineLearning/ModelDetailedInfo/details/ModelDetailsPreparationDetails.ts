interface DatasetFieldDetails {
    numSamples: number;
    labelsDistribution: Record<string, number>;
}

interface FacetsDetails {
    facetLabels: Record<string, string[]>;
}

interface DatasetDetails {
    numRows: number;
    dataDetails: Record<string, DatasetFieldDetails>;
}

export interface ModelDetailsPreparationDetails {
    trainDatasetsDetails: DatasetDetails;
    testDatasetsDetails: DatasetDetails;
    facetsDetails: FacetsDetails;
}
