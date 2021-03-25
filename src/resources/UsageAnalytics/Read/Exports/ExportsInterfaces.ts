import {CSVFileFormat, ExportStatus, ExportTablesType} from '../../../Enums';

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

interface EstimateExportCommonParams {
    from: string;
    to: string;
    f?: string[];
}

export interface EstimateExportParams extends EstimateExportCommonParams {
    tables?: ExportTablesType[];
    fs?: string[];
    fc?: string[];
}

export interface EstimateVisitExportParams extends EstimateExportCommonParams {
    hideEventFilters?: string[];
    fn?: string[];
}

interface GenerateExportCommonParams {
    filename?: string;
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
