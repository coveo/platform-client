import {ReportType} from '../../../Enums';

export interface ReportModel {
    // The report id
    id: string;
    // The report account
    account: string;
    // The display name of the report
    displayName: string;
    // The type of the report. Must be either 'explorer' or 'dashboard'.
    type: ReportType;
    // Whether the report should be available to all analytics viewer.
    allAnalyticsViewer: boolean;
    // The configuration of the report. Must be a json.
    configuration: Record<string, unknown>;
    // The ids of the persisted filters associated with the report.
    filters: string[];
}

export type CreateReportModel = Omit<ReportModel, 'id' | 'account'>;
export type CreateReportResponse = Pick<ReportModel, 'id'>;

export interface GetReportOptions {
    // Timezone used for calculations.
    tz?: string;
}

export type UpdateReportModel = CreateReportModel;
export type UpdateReportResponse = CreateReportResponse;

export interface ListReportsOptions {
    // The type of the report. Must be either 'explorer' or 'dashboard'.
    type?: ReportType;
    // Whether to include the detailed configuration of the report in the response.
    includeConfig?: boolean;
}

export interface ListReportsResponse {
    // A collection of report configurations
    reports: ReportModel[];
}
