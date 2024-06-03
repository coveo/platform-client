import {Paginated} from '../BaseInterfaces.js';
import {SortingOrder} from '../Enums.js';

export enum ProjectSortBy {
    name = 'NAME',
    createdBy = 'CREATED_BY',
    createdDate = 'CREATED_DATE',
    updatedBy = 'UPDATED_BY',
    updatedDate = 'UPDATED_DATE',
    pointOfContact = 'POINT_OF_CONTACT',
}

export const projectResourceTypes = [
    'CATALOG',
    'CASE_ASSIST',
    'CRAWLING_MODULE',
    'EXTENSION',
    'IN_PRODUCT_EXPERIENCE',
    'INSIGHT_PANEL',
    'ML_MODEL',
    'QUERY_PIPELINE',
    'SEARCH_HUB',
    'SEARCH_PAGE',
    'SECURITY_PROVIDER',
    'SOURCE',
    'UA_REPORT',
];

export type ProjectResourceType = (typeof projectResourceTypes)[number];

/**
 * Enum representing the possible project types.
 *
 * @enum {string}
 */
export enum ProjectType {
    CaseDeflection = 'CASE_DEFLECTION',
    Commerce = 'COMMERCE',
    CommunityPortal = 'COMMUNITY_PORTAL',
    CorporateWebsite = 'CORPORATE_WEBSITE',
    HrEmployeePortal = 'HR_EMPLOYEE_PORTAL',
    Intranet = 'INTRANET',
    InProductSearch = 'IN_PRODUCT_SEARCH',
    ItEmployeePortal = 'IT_EMPLOYEE_PORTAL',
    Other = 'OTHER',
    SupportExperience = 'SUPPORT_EXPERIENCE',
    SupportPortal = 'SUPPORT_PORTAL',
}

export interface BaseProjectModel {
    /**
     * The name of the project.
     */
    name: string;
    /**
     * The description of the project.
     */
    description: string;
    /**
     * The type of the project.
     */
    type: ProjectType;
    /**
     * The list of usernames that will be points of contact for the project.
     *
     * @example: ['johndoe@email.com-google', 'janedoe@email.com-office265']
     */
    pointsOfContact?: string[];
    /**
     * The resources associated to the project.
     *
     * @example: {'SOURCE': ['sourceId1', 'sourceId2']}
     */
    resources?: Record<ProjectResourceType, string[]>;
}

export interface ProjectModel extends BaseProjectModel {
    /**
     * The unique identifier of the project.
     */
    id: string;
    /**
     * The email of the user that created the project.
     *
     * @example: 'jdoe@email.com'
     */
    createdBy: string;
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
     * @example: 'jdoe@email.com'
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
     * The sorting criteria to apply on the results.
     *
     */
    sortBy?: ProjectSortBy;
    /**
     * The sorting order to apply on the results.
     *
     * @example: 'ASC'
     */
    order?: SortingOrder;
}

export interface ListAssociatedProjectsModel {
    /**
     * Resource ID
     */
    id: string;
    /**
     * Associated project IDs that are associated to the resource id
     */
    projectIds: string[];
}

export interface UpdatedProjectAssociationsModel {
    /**
     * IDs of projects that are to be updated
     */
    projectIds: string[];
    /**
     * IDs of resources whose association with the precised project IDs is to be updated
     */
    resourceIds: string[];
}

export interface UpdatedProjectResourceAssociationsModel {
    /**
     * Project-resource associations to be added
     */
    additions: UpdatedProjectAssociationsModel[];
    /**
     * Project-resource associations to be removed
     */
    removals: UpdatedProjectAssociationsModel[];
}
