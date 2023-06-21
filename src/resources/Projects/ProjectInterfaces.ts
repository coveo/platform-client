import {Paginated} from '../BaseInterfaces.js';
import {SortingOrder} from '../Enums.js';

export interface ProjectMetadataItem {
    /**
     * The key of the metadata.
     *
     * @example: 'Currency'
     */
    key: string;
    /**
     * The type of the value of a metadata.
     *
     * @example: 'number'
     */
    type?: string;
    /**
     * Whether a certain metadata needs to be provided or not.
     */
    isRequired?: boolean;
    /**
     * The metadata's value.
     */
    value?: any;
}

export interface ProjectUseCase {
    /**
     * The name of the project's intended use case.
     *
     * @example: 'Commerce'
     */
    name: string;
    /**
     * The metadata related to the specified use case.
     */
    metadata: ProjectMetadataItem[];
}

export interface NewProjectModel {
    /**
     * The name of the project.
     */
    name: string;
    /**
     * The description of the project.
     */
    description?: string;
    /**
     * The id to track the project which is used for analytic purposes.
     */
    trackingId: string;
    /**
     * The use case of the project.
     */
    useCase?: ProjectUseCase;
    /**
     * The email of the owner of the project.
     *
     * @example: 'jdoes@email.com'
     */
    owner?: string;
    /**
     * The email of the user that created the project.
     *
     * @example: 'jdoe@email.com'
     */
    createdBy?: string;
    /**
     * The resources associated to the project.
     *
     * @example: {'SOURCE': ['sourceId1', 'sourceId2']}
     */
    resources?: Record<string, string[]>;
}

export interface ProjectModel extends NewProjectModel {
    /**
     * The unique identitifier of the project.
     */
    id: string;
    /**
     * The date of the project's creation.
     * Note: ISO-8601 format
     *
     * @example: '2023-06-21T14:59:26.850Z'
     */
    createdDate: string;
    /**
     * The email of the user that last updated the project.
     *
     * @example: 'jdoes@email.com'
     */
    updatedBy: string;
    /**
     * The date of the project's last update.
     * Note: ISO-8601 format
     *
     * @example: '2023-06-21T14:59:26.850Z'
     */
    updatedDate: string;
}

export interface ListProjectParams extends Paginated {
    /**
     * The query filter to match.
     * This allows you to search according to the project name.
     *
     * By default, results are not required to match a specific query filter.
     */
    filter?: string;
    /**
     * The sorting critera to apply on the results.
     *
     */
    sortBy?: string;
    /**
     * The sorting order to apply on the results.
     *
     * @example: 'ASC'
     */
    order?: SortingOrder;
    /**
     * Whether to include resources when returning results.
     */
    includeResources?: boolean;
}
