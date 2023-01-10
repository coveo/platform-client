import {GroupResponse, UserResponse} from '../Reports/index.js';

export interface FilterModel {
    /** The display name of the filter. */
    displayName: string;

    /** The actual value of the filter. */
    value: string;
}

export interface FilterResponse {
    /** The filter id. */
    id: string;

    /** The filter display name. */
    displayName: string;

    /** The filter account. */
    account: string;

    /** The filter type. Can be 'permissions' or 'reporting'. */
    type: string;

    /** The actual filter. */
    value: string;
}

export type CreateReportingFilterModel = FilterModel;
export type CreateReportingFilterResponse = Pick<FilterResponse, 'id'>;

export type UpdateReportingFilterModel = CreateReportingFilterModel;
export type UpdateReportingFilterResponse = CreateReportingFilterResponse;

export type CreatePermissionsFilterModel = FilterModel;
export type CreatePermissionsFilterResponse = Pick<FilterResponse, 'id'>;

export type UpdatePermissionsFilterModel = CreatePermissionsFilterModel;
export type UpdatePermissionsFilterResponse = CreatePermissionsFilterResponse;

export interface ListFiltersResponse {
    /** A list of filters */
    filters: FilterResponse[];
}

export interface PermissionsFilterUser {
    /** The user id. */
    userId: string;

    /** The account. */
    account: string;

    /** Permissions for the user */
    permissions: PermissionsFilterUserPermissions[];

    /** Related reports */
    reportIds: unknown[];
}

export interface PermissionsFilterUserPermissions {
    /** The permission filter. */
    permission: string;

    /** Whether the permission field is the unique ID. */
    filterId: boolean;
}

export interface FilterTargetsModel {
    /** The ids of the users targeted by the filter. */
    targetedUsers: string[];

    /** The ids of the groups targeted by the filter. */
    targetedGroups: string[];
}

export interface FilterTargetsResponse {
    /** The users targeted by the filter. */
    targetedUsers: UserResponse[];

    /** The groups targeted by the filter. */
    targetedGroups: GroupResponse[];
}
