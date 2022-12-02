import {OrganizationParamParts} from '../CommonParamParts';

export interface UsersFilterModel {
    /**
     * The filter id
     */
    id: string;
    /**
     * The filter display name
     */
    displayName: string;
    /**
     * The filter account
     */
    account: string;
    /**
     * The filter type. Can be 'permissions' or 'reporting'
     */
    type: 'permissions' | 'reporting';
    /**
     * The actual filter
     */
    value: string;
}

export interface UsersFiltersModel {
    /**
     * The filters that are applied to the user
     */
    filters: UsersFilterModel[];
}

export interface UsersReportModel {
    /**
     * The report id
     */
    id: string;
    /**
     * The report account
     */
    account: string;
    /**
     * The report display name
     */
    displayName: string;
    /**
     * The report type. Can be 'permissions' or 'reporting'
     */
    type: 'permissions' | 'reporting';
    /**
     * The report configuration in JSON
     */
    configuration: Record<string, any>;
    /**
     * Whether the report is available to all analytics viewer
     */
    allAnalyticsViewer: boolean;
    /**
     * List of associated filters
     */
    filters: string[];
}

export interface UsersReportsModel {
    /**
     * The reports the user can view
     */
    reports: UsersReportModel[];
}

export interface UsersStatusModel {
    /**
     * Service's status information
     */
    status: string;
}

export interface UserModel {
    /**
     * The user id
     */
    userId: string;
    /**
     * The user account
     */
    account: string;
    /**
     * The filters that are applied to the user
     */
    filters: string[];
    /**
     * The reports the user can view
     */
    reports: string[];
}

export interface ListUsersFiltersParams extends OrganizationParamParts {
    /**
     * Whether to include th values inherited from a user's groups in the response
     */
    includeGroups?: boolean;
}

export interface FilterParams {
    /**
     * The id or value of the filter.
     */
    value: string;
    /**
     * Whether the value is a persisted filter ID (`true`) or a filter value (`false`).
     */
    id: boolean;
}

export interface ListUsersReportsParams extends OrganizationParamParts {
    /**
     * Whether to include the detailed configuration of the report in the response.
     */
    includeConfig?: boolean;
    /**
     * Whether to include the values inherited from a user's groups in the response.
     */
    includeGroups?: boolean;
}
