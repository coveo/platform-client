export interface AssociationsListModel {
    rules: MLAssociationModel[];
    totalEntries: number;
    totalPages: number;
}

export interface MLAssociationModel {
    id: string;
    position: number;
    modelId: string;
    modelStatus: string;
    cacheMaximumAge: string;
    condition?: string;
    conditionDefinition?: string;
    customQueryParameters?: {};
    enableWordCompletion?: boolean;
    exclusive?: boolean;
    intelligentTermDetection?: boolean;
    matchAdvancedExpression?: boolean;
    matchBasicExpression?: boolean;
    maxRecommendations?: number;
    modelDisplayName?: string;
    rankingModifier?: number;
}

export interface ListAssociationsParams {
    perPage?: number;
    page?: number;
}

export interface CreateAssociation extends EditAssociation {
    modelId: string;
}

export interface EditAssociation {
    cacheMaximumAge?: string;
    condition?: string;
    customQueryParameters?: {};
    description?: string;
    enableWordCompletion?: boolean;
    exclusive?: boolean;
    intelligentTermDetection?: boolean;
    matchAdvancedExpression?: boolean;
    matchBasicExpression?: boolean;
    maxRecommendations?: number;
    rankingModifier?: number;
}

export interface AssociatedPipelinesData {
    modelId: string;
    associations: AssociatedPipelineModel[];
}

export interface AssociatedPipelineModel {
    associationId: string;
    pipelineId: string;
    pipelineName: string;
}
