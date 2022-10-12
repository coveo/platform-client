import {Paginated} from '../BaseInterfaces';
import {FacetOrSortStatus} from '../Enums';

export interface ActivityModel {
    id?: string;
    operation: string;
    result: string;
    errorCode?: string;
    documentsProcessed?: number;
    duration?: number;
    isInitialBuild?: boolean;
    startDate?: number;
    endDate?: number;
    createDate?: number;
    state: string;
    triggeredBy: TriggeredByAttributes;
    content?: any;
    organizationId?: string;
    resourceId?: string;
    resourceName?: string;
    resourceType?: string;
    showOrgCol?: boolean;
}

export interface ListActivitiesParams extends Paginated {
    facetsOnly?: boolean;
}

export interface ActivityListingFilters {
    /* The facet status of the activities to list. */
    facet?: FacetOrSortStatus;
}

export interface ActivityListingOptions {
    /**
     * Filters to narrow down the returned fields.
     */
    filters?: ActivityListingFilters;
}

export interface TriggeredByAttributes {
    type: string;
    id?: string;
    displayName?: string;
    relatedActivity?: string;
    relatedActivityId?: string;
    relatedActivityResourceType?: string;
}
