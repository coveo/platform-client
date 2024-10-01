import {Paginated} from '../BaseInterfaces.js';
import {ActivityOperation, FacetOrSortStatus} from '../Enums.js';

export interface ActivityModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
    createDate?: number;
    duration?: number;
    endDate?: number;
    id?: string;
    operation: string;
    organizationId?: string;
    progress?: number;
    resourceId?: string;
    resourceName?: string;
    resourceType?: string;
    result: string;
    section?: string;
    startDate?: number;
    state: string;
    triggeredBy: TriggeredByAttributes;
    errorCode?: string;
    errorDetail?: string;
    abortReason?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abortedBy?: any;
    snapShotId?: string;
    documentsProcessed?: number;
    isInitialBuild?: boolean;
    showOrgCol?: boolean;
}
export interface ListActivitiesFacetsParams {
    /* From which date in the dateRange */
    from?: string;
    /* To which date in the dateRange */
    to?: string;
}
export interface ListActivitiesParams extends Paginated {
    /* From which date in the dateRange */
    from?: string;
    /* To which date in the dateRange */
    to?: string;
    /* Number of pages */
    page?: number;
    /* Number of activities per page */
    perPage?: number;
}

export interface ActivityListingFilters {
    /* The facet status of the activities to list. */
    facet?: FacetOrSortStatus;
    operations?: string[];
    organizationIds?: string[];
    resourceIds?: string[];
    resourceTypes?: string[];
    resultTypes?: string[];
    sections?: string[];
    states?: string[];
}

export interface TriggeredByAttributes {
    type: string;
    id?: string;
    displayName?: string;
    relatedActivity?: string;
    relatedActivityId?: string;
    relatedActivityResourceType?: string;
}

export interface ActivityFacetModel {
    operations?: string[];
    organizationIds?: string[];
    resourceIds?: string[];
    resourceTypes?: string[];
    sections?: string[];
    states?: string[];
}

export interface ActivitiesResourceAndOperations {
    /**
     * Contains resources and their corresponding operations, where the key is the name of the resource.
     */
    [key: string]: ActivityOperation[];
}
