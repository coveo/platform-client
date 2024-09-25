import {CSVFileFormat, DayOfWeek, ExportScheduleFrequency, ExportStatus, ExportTablesType} from '../../../Enums.js';
import {
    EventDimensionsExcludeFilterParamParts,
    EventDimensionsFilterParamParts,
    EventDimensionsHideEventsFilterParamParts,
    TimeRangeParamParts,
} from '../CommonParamParts.js';

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
     * The export's unique identifier.
     */
    id: string;
    /**
     * The export download link. Only appears when export is ready.
     */
    downloadLink?: string;
}

export interface EstimateExportParams extends TimeRangeParamParts, EventDimensionsFilterParamParts {
    /**
     * The tables that will be included.
     * If not provided, all tables will be included.
     */
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

export interface EstimateVisitExportParams
    extends TimeRangeParamParts,
        EventDimensionsFilterParamParts,
        EventDimensionsExcludeFilterParamParts,
        EventDimensionsHideEventsFilterParamParts {}

export interface GenerateExportParams extends EstimateExportParams {
    /**
     * Can only contain US-ASCII characters. If not provided, it will be set to the export's id.
     */
    filename?: string;
    /**
     * Export's description.
     */
    d?: string;
    /**
     * The dimensions that will be exported. If not provided, all dimensions will be exported.
     */
    dimensions?: string[];
    /**
     * The format of the generated CSV files.
     */
    format?: CSVFileFormat;
    /**
     * Whether to use the display names in the export's header. If false, the api names will be used.
     */
    useDisplayNames?: boolean;
}

interface BaseGenerateExportWithBodyParams {
    /**
     * The beginning date of the date range. ISO8601 format 'YYYY-MM-DDThh:mm:ss.sssZ'
     */
    from: string;
    /**
     * The end date of the date range. ISO8601 format 'YYYY-MM-DDThh:mm:ss.sssZ'
     */
    to: string;
    /**
     * A file name for the export. Can only contain US-ASCII characters. If none is supplied it will be set to the export's id.
     */
    filename?: string;
    /**
     * Optional description for the export.
     */
    description?: string;
    /**
     * The dimensions that will be exported. If not provided, all dimensions will be exported.
     */
    dimensions?: string[];
    /**
     * The format of the generated CSV files. If not provided, it will default to Excel.
     */
    exportFormat?: CSVFileFormat;
    /**
     * Whether to use the display names in the export's header. If false, the api names will be used. If not provided, it defaults to false.
     */
    useDisplayNames?: boolean;
}

export interface GenerateExportWithBodyParams extends BaseGenerateExportWithBodyParams {
    /**
     * The filter that will be applied to the events common dimensions (shared by all types of events).
     * Multiple filter parameters are joined with the AND operator.
     */
    commonFilters?: string[];
    /**
     * The filter that will be applied to the click and search events dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    searchesFilters?: string[];
    /**
     * The filter that will be applied to the custom events dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    customEventsFilters?: string[];
    /**
     * The tables that will be exported. If not provided, all tables will be exported.
     */
    tables?: ExportTablesType[];
}

export interface GenerateVisitExportWithBodyParams extends BaseGenerateExportWithBodyParams {
    /**
     * The filter that will be applied to the events dimensions.
     * Multiple filter parameters are joined with the AND operator.
     */
    inclusionFilters?: string[];
    /**
     * Each specified filter is inverted in order to hide events.
     * Multiple filter parameters are joined with the AND operator.
     */
    hideEventFilters?: string[];
    /**
     * The filter that will be applied to dimensions to exclude events from the results.
     * Multiple filter parameters are joined with the AND operator.
     */
    exclusionFilters?: string[];
    /**
     * Whether to order the rows by datetime in the export.
     * If the number of rows exported is to great, this parameter will be ignored and data will be unsorted.
     * If not provided, it defaults to true.
     */
    ordered?: boolean;
}

export interface GenerateVisitExportParams extends GenerateExportParams {
    /**
     * Whether to order the rows by datetime in the export.
     * If the number of rows exported is too large, this parameter will be ignored and data will be unsorted.
     * If not provided, it defaults to true.
     */
    ordered?: boolean;
}

interface ExportScheduleModelCommonProperties {
    frequency: ExportScheduleFrequency;
    dayOfWeek?: DayOfWeek;
    timezone: string;
    dimensions?: string[];
    usingDisplayNames?: boolean;
    notificationsEmails?: string[];
}

export interface ExportScheduleModel extends ExportScheduleModelCommonProperties {
    id: string;
    author: string;
    filters: Record<string, string>;
    tables?: string[];
    description: string;
    errorInfo?: Record<string, string>;
}

export interface CreateExportScheduleModel extends ExportScheduleModelCommonProperties {
    commonFilters?: string[];
    searchesFilters?: string[];
    customEventsFilters?: string[];
    description?: string;
    tables?: ExportTablesType[];
    exportFormat?: CSVFileFormat;
}

export interface RowLimitModel {
    /**
     * Exports row limit.
     */
    exportRowCountLimit: number;
}
