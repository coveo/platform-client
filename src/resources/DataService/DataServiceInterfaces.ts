import {Paginated, PaginatedResponse} from '../BaseInterfaces.js';
import {DataServiceConditionModel} from './DataServiceConditionInterfaces.js';
import {
    DataServiceFieldReferenceModel,
    DataServiceSelectFieldModel,
    DataServiceSortByFieldModel,
    DataServiceTrend,
    DataServiceTrendFieldModel,
} from './DataServiceFieldInterfaces.js';
import {
    DataServiceMapColumnTypeToDataType,
    DataServiceColumnType,
    DataServiceTableModel,
} from './DataServiceTableInterfaces.js';

/**
 * The query definition shared between the query and export models.
 */
export interface DataServiceQueryModelBase<
    CT extends readonly DataServiceColumnType[] = DataServiceColumnType[],
    TR extends readonly DataServiceTrend[] = DataServiceTrend[],
> {
    /**
     * The table from which rows should be selected.
     */
    fromTable: string;
    /**
     * The fields to select.
     */
    selectFields: {[I in keyof CT]: DataServiceSelectFieldModel<CT[I]>};
    /**
     * Optional trend fields to select, comparing the current time range to the previous time range.
     * If trend fields are requested, `previousFromDate` and `previousToDate` are required too.
     */
    selectTrendFields?: {[I in keyof TR]: DataServiceTrendFieldModel<TR[I]>};
    /**
     * The filters to apply to the selected rows.
     */
    where?: DataServiceConditionModel;
    /**
     * The fields by which to group by rows before aggregations are made.
     */
    groupBy?: DataServiceFieldReferenceModel[];
    /**
     * A filter applied after grouping and aggregating rows.
     */
    having?: DataServiceConditionModel;
    /**
     * The fields by which the results should be sorted.
     */
    sortBy?: DataServiceSortByFieldModel[];
    /**
     * The start date of the query.
     * In ISO 8601 format with offset (e.g. 2023-01-23T01:23:45.678+09:00).
     */
    fromDate: Date;
    /**
     * The end date of the query.
     * In ISO 8601 format with offset (e.g. 2023-01-23T01:23:45.678+09:00).
     */
    toDate: Date;
    /**
     * The start of the previous time period, required when comparing data with trends.
     * In ISO 8601 format with offset (e.g. 2023-01-23T01:23:45.678+09:00).
     */
    previousFromDate?: Date;
    /**
     * The end of the previous time period, required when comparing data with trends.
     * In ISO 8601 format with offset (e.g. 2023-01-23T01:23:45.678+09:00).
     */
    previousToDate?: Date;
    /**
     * The IANA time zone in which all date and time calculations should be performed.
     * This is also the time zone in which all values will be returned.
     */
    timeZone?: string;
    /**
     * If true, duplicates will be removed from the returned rows.
     * This is essentially just doing “SELECT DISTINCT” instead of “SELECT”.
     * This parameter has no effect when the query contains a group by,
     * as a group by does not produce duplicate rows by definition.
     */
    distinct?: boolean;
}

/**
 * The parameters representing a SQL query.
 *
 * @typeparam _T - Allows defining the field types of selectFields and selectTrendFields (concatenated in that order),
 * giving a better typed result.
 */
export interface DataServiceQueryModel<
    CT extends readonly DataServiceColumnType[] = DataServiceColumnType[],
    TR extends readonly DataServiceTrend[] = DataServiceTrend[],
> extends DataServiceQueryModelBase<CT, TR>,
        Paginated {}

export type DataServiceExportCompression =
    | 'NONE'
    | 'BZ2_FILE'
    | 'BROTLI'
    | 'DEFLATE'
    | 'GZIP'
    | 'GZIP_FILE'
    | 'ZSTD'
    | 'ZSTD_FILE';

/**
 * The parameters representing a SQL export query.
 */
export interface DataServiceExportQueryModel<
    CT extends readonly DataServiceColumnType[] = DataServiceColumnType[],
    TR extends readonly DataServiceTrend[] = DataServiceTrend[],
> extends DataServiceQueryModelBase<CT, TR> {
    /** Whether to emit a header row, defaults to `true`. */
    header?: boolean;
    /** The maximum number of rows to export, defaults to `1000` */
    rowLimit?: number;
    /** The compression to use for the exported file, defaults to `'GZIP'` */
    compression?: DataServiceExportCompression;
}

/**
 * A field in the query results.
 */
export interface DataServiceResponseFieldModel<T extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The field's name.
     */
    name: string;
    /**
     * The field's type.
     */
    type: T;
}

/**
 * The response to a query.
 */
export interface DataServiceQueryResponseModel<T extends readonly DataServiceColumnType[] = DataServiceColumnType[]>
    extends PaginatedResponse {
    /**
     * The fields that comprise the rows of the response.
     */
    fields: {[I in keyof T]: DataServiceResponseFieldModel<T[I]>};
    /**
     * The response contents, in an array-of-arrays format. The outer list contains the rows,
     * each row itself is an array that contains the row values in the same size and order as the fields.
     */
    rows: Array<{[I in keyof T]: DataServiceMapColumnTypeToDataType[T[I]]}>;
}

/**
 * Error information in case a query failed as part of a queries call.
 */
export interface DataServiceErrorInfo {
    errorCode: string;
    errorMessage: string;
}

export interface DataServiceQueriesErrorResponseListItem {
    errorInfo: DataServiceErrorInfo;
}

export interface DataServiceQueriesSuccessResponseListItem<
    T extends DataServiceQueryResponseModel = DataServiceQueryResponseModel,
> {
    response: T;
}

export type DataServiceQueriesResponseListItem<
    T extends DataServiceQueryResponseModel = DataServiceQueryResponseModel,
> = DataServiceQueriesSuccessResponseListItem<T> | DataServiceQueriesErrorResponseListItem;

/**
 * The response to multiple queries.
 */
export interface DataServiceQueriesResponseModelWithErrors<
    T extends readonly DataServiceQueryResponseModel[] = DataServiceQueryResponseModel[],
> {
    /**
     * The array of responses per query.
     */
    queryResponses: {[I in keyof T]: DataServiceQueriesResponseListItem<T[I]>};
}

/**
 * A response to multiple queries that assumes success.
 */
export interface DataServiceQueriesResponseModel<
    T extends readonly DataServiceQueryResponseModel[] = DataServiceQueryResponseModel[],
> {
    queryResponses: {[I in keyof T]: DataServiceQueriesSuccessResponseListItem<T[I]>};
}

/**
 * The response to an export, providing a link to download the file.
 */
export interface DataServiceExportResponseModel {
    /** The URL to download the file from. The link is valid for 5 minutes. */
    downloadUrl: string;
    /** The number of rows in the exported file. */
    rowCount: number;
}

/**
 * Information about the available tables
 */
export interface DataServiceListTablesResponseModel extends PaginatedResponse {
    tables: DataServiceTableModel[];
}
