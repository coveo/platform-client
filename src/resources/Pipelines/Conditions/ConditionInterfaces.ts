import {PageModel, Paginated} from '../../BaseInterfaces.js';
import {
    ConditionAssociationSortByType,
    ConditionAssociationType,
    ListStatementAssocationFilter,
    ListStatementSortBy,
    StatementsFeature,
} from '../../Enums.js';

interface ConditionAssociations {
    /**
     * The number of resources associated to this condition.
     */
    total: number;
}

export interface ConditionModel {
    /**
     * The unique identifier of this statement.
     */
    id: string;

    /**
     * The intented purpose of thi statement in an actual implementation.
     */
    description: string;

    /**
     * The query pipeline language expression that defines this statement.
     */
    definition: string;

    /**
     * The structured object of the query pipeline language expression of this statement.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    detailed: any;

    /**
     * The identifier of the Coveo Cloud platform user who last modified this.
     */
    modifiedBy?: string;

    /**
     * The last time this was modified. (ISO 8601)
     */
    modifiedAt?: string;

    /*
     * Information about the resources associated to this condition.
     */
    associations?: ConditionAssociations;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    childrenCount: number;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    feature: string;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    position: number;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    ready: boolean;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    parent?: string;

    /**
     * @deprecated
     * This property is exposed for backward compatibility reasons.
     */
    condition?: string;
}

export interface NewConditionModel {
    /**
     * The query pipeline language expression that defines this statement.
     */
    definition: string;

    /**
     * The unique identifier of this statement.
     */
    id?: string;

    /**
     * The intented purpose of this statement in an actual implementation.
     */
    description?: string;
}

export interface ListConditionsOptions extends Paginated {
    /**
     * Whether to sort the results in ascending order.
     * @default true
     */
    isOrderAscending?: boolean;

    /**
     * The query filter to match.
     * This allows you to search within query pipeline statement definitions and descriptions.
     * By default, results are not required to match a specific query filter.
     */
    filter?: string;

    /**
     * The sort criteria to apply on the results.
     */
    sortBy?: ListStatementSortBy;

    /**
     * The unique identifier of the target Coveo Cloud organization.
     * The value set by default is provided by the API resource
     */
    organizationId?: string;

    /**
     * Whether to include additional information such as the number of resources associated to the condition.
     * @default false
     */
    expand?: boolean;

    /**
     * Only includes conditions with a certain number of associated resources.
     * @default ListStatementAssocationFilter.All
     */
    associationFilter?: ListStatementAssocationFilter;
}

export interface ListAssociationsOptions extends Paginated {
    /**
     * Optional filter of association types to include. If you leave this parameter undefined or empty, all association types are included.
     */
    associationTypes?: ConditionAssociationType[];

    /**
     * Optional filter to match the pipeline name of the object associated with this condition.
     */
    pipelineName?: string;

    /**
     * The sort criteria to apply on the results.
     */
    sortBy?: ConditionAssociationSortByType;

    /**
     * Whether to sort the results in ascending order.
     */
    isOrderAscending?: boolean;
}

export interface ConditionPipelineAssociation {
    /**
     * The type of the association.
     */
    associationType: ConditionAssociationType;
    /**
     * Primary key of the associated entity.
     */
    id: string;
    /**
     *Pipeline ID the row belongs to.
     */
    pipelineId: string;
    /**
     *Human-readable name of the pipeline.
     */
    pipelineName: string;
    /**
     * QPL feature (only present for pipelineStatements).
     *
     */
    feature: never;
}

export interface ConditionPipelineStatementAssociation {
    /**
     * The type of the association.
     */
    associationType: ConditionAssociationType;
    /**
     * Primary key of the associated entity.
     */
    id: string;
    /**
     *Pipeline ID the row belongs to.
     */
    pipelineId: string;
    /**
     *Human-readable name of the pipeline.
     */
    pipelineName: string;
    /**
     * QPL feature (only present for pipelineStatements).
     *
     */
    feature: StatementsFeature;
}

export type ConditionAssociationItemUnion = ConditionPipelineAssociation | ConditionPipelineStatementAssociation;

export interface ConditionAssociationListResponse extends PageModel<ConditionAssociationItemUnion> {
    /**
     * The condition ID used for the lookup.
     */
    conditionId?: string;
}
