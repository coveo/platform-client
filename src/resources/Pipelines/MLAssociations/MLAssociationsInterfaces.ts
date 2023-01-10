import {Paginated} from '../../BaseInterfaces.js';
import {ModelTypes} from '../../Enums.js';

/**
 * @deprecated - Use `PageModel<MLAssociationModel, 'rules'>` instead.
 */
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
    modelEngine?: ModelTypes;
    condition?: string;
    conditionDefinition?: string;
    customQueryParameters?: any;
    enableWordCompletion?: boolean;
    exclusive?: boolean;
    intelligentTermDetection?: boolean;
    matchAdvancedExpression?: boolean;
    matchBasicExpression?: boolean;
    maxRecommendations?: number;
    modelDisplayName?: string;
    rankingModifier?: number;
    useAdvancedConfiguration?: boolean;
}

export interface ListAssociationsParams extends Paginated {}

export interface BulkGetAssociationsParams extends Paginated {
    /*
     * A set of parameters to customize the results.
     */
    ids: string[];
}

export interface CreateAssociation extends EditAssociation {
    modelId: string;
}

export interface EditAssociation {
    cacheMaximumAge?: string;
    condition?: string;
    customQueryParameters?: any;
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
