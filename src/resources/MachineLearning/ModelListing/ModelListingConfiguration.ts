export interface MLListingModel {
    modelDisplayName: string;
    modelId: string;
    engineId: string;
    estimatedPreviousModelUpdateTime: number;
    nextModelUpdateTime: number;
    platformVersion: 1 | 2;
    modelSizeStatistic: number;
    readyForAssociation: boolean;
    hasCustomerErrors: boolean;
    modelStatusInfo: MLModelStatusInfo;
    modelAssociations: MLModelAssociation[];
}

export interface MLModelStatusInfo {
    modelStatus: string;
    daysUntilArchival: number;
}

export interface MLModelAssociation {
    parentId: string;
    id: string;
    name: string;
    associationType: string;
}
