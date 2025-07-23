import {Paginated} from '../../BaseInterfaces.js';

export interface PropertyModel {
    /**
     * The Organization ID that owns the property.
     */
    organizationId: string;
    /**
     * The string used to represent the tracking ID when sending a event request.
     */
    trackingId: string;
    /**
     * The name used for the property in the UI.
     */
    displayName: string;
    /**
     * Optional list of project identifiers the property is mapped to.
     * Project IDs are only included on request.
     */
    projectIds?: string[] | null;
}

export interface PropertyActionResponse {
    /**
     * A message detailing the result of the requested operation.
     */
    message: string;
}

export interface ListPropertiesRequest extends Paginated {
    /**
     * Whether the default property should be included.
     */
    includeDefault?: boolean;
    /**
     * Optional filter on tracking id or display name.
     */
    filter?: string;
    /**
     * Optional filter on project id, requiring the view projects privilege.
     */
    projectId?: string;
    /**
     * Whether the projectIds of properties should be included.
     * The default value is based on whether a `projectId` is specified:
     * this property defaults to `false`, unless a `projectId` is specified.
     */
    includeProjectIds?: boolean;
    /**
     * Optional filter on a list of tracking IDs (exact case-sensitive match).
     * When specified, it is recommended to use the `query` (POST) method over the `list` (GET) method,
     * especially if the list of tracking IDs may have many entries.
     * Note that if this is an empty array, the result will always be empty.
     */
    trackingIds?: string[];
}

/** @deprecated Deprecated alias for `ListPropertiesRequest`. */
export type ListPropertiesParams = ListPropertiesRequest;
/** @deprecated Deprecated alias for `PropertyActionResponse`. */
export type PropertiesResponseMessage = PropertyActionResponse;
