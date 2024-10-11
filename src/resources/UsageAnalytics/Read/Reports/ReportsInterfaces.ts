import {ReportType} from '../../../Enums.js';
import {TimeZoneParamParts} from '../CommonParamParts.js';

export interface ReportModel {
    /** The report id. */
    id: string;
    /** The report account. */
    account: string;
    /** The display name of the report. */
    displayName: string;
    /** The type of the report. Must be either 'explorer' or 'dashboard'. */
    type: ReportType;
    /** Whether the report should be available to all analytics viewer. */
    allAnalyticsViewer: boolean;
    /** The configuration of the report. Must be a json. */
    configuration: Record<string, unknown>;
    /** The ids of the persisted filters associated with the report. */
    filters: string[];
}

export type CreateReportModel = Omit<ReportModel, 'id' | 'account'>;
export type CreateReportResponse = Pick<ReportModel, 'id'>;

export type GetReportOptions = TimeZoneParamParts;

export type UpdateReportModel = CreateReportModel;
export type UpdateReportResponse = CreateReportResponse;

export interface ListReportsOptions {
    /** The type of the report. Must be either 'explorer' or 'dashboard'. */
    type?: ReportType;
    /** Whether to include the detailed configuration of the report in the response. */
    includeConfig?: boolean;
}

export interface ListReportsResponse {
    /** A collection of report configurations. */
    reports: ReportModel[];
}

export enum ReportAccessType {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

export interface ReportAccessResponse {
    /** The access type of the report. Can be 'PUBLIC' or 'PRIVATE'. */
    accessType: ReportAccessType;
    /** The users allowed to access the specified report. */
    allowedUsers: UserResponse[];
    /** The groups allowed to access the specified report. */
    allowedGroups: GroupResponse[];
}

export interface ReportAccessRequest {
    /** Whether the report is public or private. Allowed values are 'PUBLIC', 'PRIVATE'. */
    accessType: ReportAccessType;
    /** The ids of the users allowed to access the report. */
    allowedUsers: string[];
    /** The ids of the groups allowed to access the report. */
    allowedGroups: string[];
}

export interface ReportUsersResponse {
    /** The access type of the report. Can be PUBLIC or PRIVATE. */
    access: ReportAccessType;
    /** The users allowed to access the specified report. */
    allowedUsers: UserResponse[];
}

interface AccountMetaModel {
    /** The filters that are applied to the user. */
    filters: string[];
    /** The reports the user can view. */
    reports: string[];
}

export interface UserResponse extends AccountMetaModel {
    /** The user id. */
    userId: string;
    /** The user account. */
    account: string;
}

export interface GroupResponse extends AccountMetaModel {
    /** The group id. */
    groupId: string;
    /** The group account. */
    account: string;
}

export interface GetReportTemplateOptions {
    /** Whether to include metadata about the report template. */
    includeMetadata?: boolean;
}

export interface TemplateMetadataResponse {
    /** The template id. */
    id: string;
    /** The template title. */
    title: string;
    /** The template description. */
    description: string;
    /** The template category. */
    category: string;
}

export interface TemplateResponse extends TemplateMetadataResponse {
    /** The JSON report configuration of the template. */
    configuration: Record<string, unknown>;
}
