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

type ExportFormat = 'EXCEL' | 'NO_NEWLINE';
export type ExportTable = 'SEARCHES' | 'CLICKS' | 'CUSTOM_EVENTS' | 'KEYWORDS' | 'GROUPS';

export interface GenerateExportWithBodyParams {
    from: string;
    to: string;
    commonFilters?: string[];
    searchesFilters?: string[];
    customEventsFilters?: string[];
    filename?: string;
    description?: string;
    dimensions?: string[];
    tables?: ExportTable[];
    exportFormat?: ExportFormat;
    useDisplayNames?: boolean;
}

export interface GenerateVisitExportWithBodyParams {
    from: string;
    to: string;
    inclusionFilters?: string[];
    hideEventFilters?: string[];
    exclusionFilters?: string[];
    filename?: string;
    description?: string;
    dimensions?: string[];
    exportFormat?: ExportFormat;
    useDisplayNames?: boolean;
    ordered?: boolean;
}

export interface GenerateVisitExportParams extends GenerateExportParams {
    /**
     * Whether to order the rows by datetime in the export.
     * If the number of rows exported is too large, this parameter will be ignored and data will be unsorted.
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
