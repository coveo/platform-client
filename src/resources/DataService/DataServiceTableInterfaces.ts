/**
 * Utility interface that can map from a ColumnType to its data type.
 */
export interface DataServiceMapColumnTypeToDataType {
    BOOLEAN: boolean | null;
    STRING: string | null;
    INTEGER: number | null;
    FLOAT: number | null;
    TIMESTAMP: string | null;
    DATE: string | null;
}
/** The type of a column (or field). */
export type DataServiceColumnType = keyof DataServiceMapColumnTypeToDataType;
/** The possible data types all columnn types combined can have. */
export type DataServiceColumnDataType = DataServiceMapColumnTypeToDataType[keyof DataServiceMapColumnTypeToDataType];

/** Convenience type for numerical types. */
export type DataServiceNumericalColumnType = Extract<DataServiceColumnType, 'FLOAT' | 'INTEGER'>;
/** Convenience type for temporal (date, date + time) types. */
export type DataServiceTemporalColumnType = Extract<DataServiceColumnType, 'DATE' | 'TIMESTAMP'>;

/**
 * A table that can be queried.
 */
export interface DataServiceTableModel {
    /**
     * The name of the table.
     */
    name: string;
    /**
     * The display name of the table.
     */
    displayName: string;
    /**
     * The description of the table.
     */
    description: string;
    /**
     * The columns of the table.
     */
    columns: DataServiceColumnModel[];
}

/**
 * A column that's part of a table.
 */
export interface DataServiceColumnModel {
    /**
     * The name of the column.
     */
    name: string;
    /**
     * The display name of the column.
     */
    displayName: string;
    /**
     * The description of the column.
     */
    description: string;
    /**
     * The type of the column.
     */
    type: DataServiceColumnType;
}
