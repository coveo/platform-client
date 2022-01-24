import {CSVFileFormat, DayOfWeek, ExportScheduleFrequency, ExportStatus, ExportTablesType} from '../../../Enums';

export interface ExportModel {
    id: string;
    author: string;
    downloadLink?: string;
    startDate: number;
    from: number;
    to: number;
    filters: Record<string, string>;
    description: string;
    size: number;
    status: ExportStatus;
    tables?: string[];
    downloadable: boolean;
    dimensions?: string[];
    replayable?: boolean;
    usingDisplayNames?: boolean;
    scheduleId?: string;
}

export interface ExportEstimateModel {
    estimates: Record<string, number>;
}

export interface ExportDownloadLink {
    /**
     * The export's unique identifier
     */
    id: string;
    /**
     * The export download link. Only appears when export is ready
     */
    downloadLink?: string;
}
interface EstimateExportCommonParams {
    from: string;
    to: string;
    /**
     * The filter that will be applied to the events common dimensions (shared by all types of events).
     * Multiple filter parameters are joined with the AND operator.
     */
    f?: string[];
}

export interface EstimateExportParams extends EstimateExportCommonParams {
    tables?: ExportTablesType[];
    /**
     * The filter that will be applied to the click and search events dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    fs?: string[];
    /**
     * The filter that will be applied to the custom events dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    fc?: string[];
}

export interface EstimateVisitExportParams extends EstimateExportCommonParams {
    hideEventFilters?: string[];
    /**
     * The filter that will be applied to dimensions to exclude events from the results.
     * Multiple filter parameters are joined with the AND operator.
     */
    fn?: string[];
}

interface GenerateExportCommonParams {
    filename?: string;
    /**
     * Export's description.
     */
    d?: string;
    dimensions?: string[];
    format?: CSVFileFormat;
    useDisplayNames?: boolean;
}

export type GenerateExportParams = EstimateExportParams & GenerateExportCommonParams;

export type GenerateVisitExportParams = EstimateVisitExportParams &
    GenerateExportCommonParams & {
        ordered?: boolean;
    };

interface ScheduleCommonProperties {
    frequency: ExportScheduleFrequency;
    dayOfWeek?: DayOfWeek;
    timezone: string;
    dimensions?: string[];
    usingDisplayNames?: boolean;
    notificationsEmails?: string[];
}

export interface ExportScheduleModel extends ScheduleCommonProperties {
    id: string;
    author: string;
    filters: Record<string, string>;
    tables?: string[];
    description: string;
    errorInfo?: Record<string, string>;
}

export interface CreateExportScheduleModel extends ScheduleCommonProperties {
    commonFilters?: string[];
    searchesFilters?: string[];
    customEventsFilters?: string[];
    description?: string;
    tables?: ExportTablesType[];
    exportFormat?: CSVFileFormat;
}
