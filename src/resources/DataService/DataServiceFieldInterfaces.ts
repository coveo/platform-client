import {
    DataServiceColumnType,
    DataServiceMapColumnTypeToDataType,
    DataServiceNumericalColumnType,
} from './DataServiceTableInterfaces.js';

// The column type is an "opt in" type specification
export type DataServiceFieldModel<CT extends DataServiceColumnType = DataServiceColumnType> =
    | DataServiceAggregationFieldModel<CT>
    | DataServiceColumnFieldModel<CT>
    | DataServiceValueFieldModel<CT>
    | DataServiceFunctionFieldModel<CT>
    | DataServiceMathFieldModel<CT>;

export type DataServiceFieldReferenceModel<CT extends DataServiceColumnType = DataServiceColumnType> =
    | DataServiceFieldModel<CT>
    // Need to explicitly disallow the field here, otherwise TypeScript will accept
    // DataServiceAliasDefinitionFieldModel as DataServiceAliasReferenceFieldModel
    | (DataServiceAliasReferenceFieldModel<CT> & {field?: never});

export type DataServiceSelectFieldModel<CT extends DataServiceColumnType = DataServiceColumnType> =
    | DataServiceFieldModel<CT>
    | DataServiceAliasDefinitionFieldModel<CT>;

/**
 * A field referencing a table column.
 */
export interface DataServiceColumnFieldModel<_CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The column name.
     */
    column: string;
}

/**
 * A field representing a constant value.
 * A string, number, boolean, or date/timestamp (as iso-8601 string).
 */
export interface DataServiceValueFieldModel<CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The constant value.
     */
    value: DataServiceMapColumnTypeToDataType[CT];
}

/**
 * A field that is an alias to another field. For example: `COUNT(users) as number_of_users`.
 * An alias that has been previously defined can be referenced later in the query without specifying the aliased field.
 */
export interface DataServiceAliasDefinitionFieldModel<CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The alias to define.
     */
    alias: string;
    /**
     * The field the alias is for.
     */
    field: DataServiceFieldModel<CT>;
}

/**
 * A field that is an alias to another field. For example: `COUNT(users) as number_of_users`.
 * An alias that has been previously defined can be referenced later in the query without specifying the aliased field.
 */
export interface DataServiceAliasReferenceFieldModel<_CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The alias to refer to.
     */
    alias: string;
}

/**
 * The type of aggregation.
 */
export type DataServiceAggregation = 'COUNT' | 'COUNT_DISTINCT' | 'SUM' | 'AVERAGE' | 'MEDIAN' | 'MIN' | 'MAX';
/**
 * Represents an aggregation applied to a field. For example: `COUNT(users)`.
 */
export interface DataServiceAggregationFieldModel<_CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The type of aggregation.
     */
    aggregation: DataServiceAggregation;
    /**
     * The field which is aggregated.
     */
    field: DataServiceFieldReferenceModel;
}

export type DataServiceFunction = 'MINUTE' | 'HOUR' | 'DAY' | 'DAY_NAME' | 'WEEK' | 'MONTH' | 'YEAR' | 'ROUND';
/**
 * Apply a function to a field, optionally with an argument.
 */
export interface DataServiceFunctionFieldModel<_CT extends DataServiceColumnType = DataServiceColumnType> {
    /**
     * The function to apply.
     */
    function: DataServiceFunction;
    /**
     * The field to use as argument.
     */
    field: DataServiceFieldReferenceModel; // note: input type != function return type
    /**
     * Optional argument to pass to the function. Currently only used by `'ROUND'`.
     */
    argument?: number | null;
}

export type DataServiceMathOperation = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';
/**
 * A field taking two arguments (left and right) and performing a mathematical operation on them.
 * For example: `revenue - cost`.
 */
export interface DataServiceMathFieldModel<_CT extends DataServiceColumnType = DataServiceNumericalColumnType> {
    /**
     * The mathematical operator to apply to the fields.
     */
    mathOperation: DataServiceMathOperation;
    /**
     * The left field of the calculation.
     */
    left: DataServiceFieldReferenceModel;
    /**
     * The right field of the calculation.
     */
    right: DataServiceFieldReferenceModel;
}

/**
 * The order in which a field should be sorted.
 */
export type DataServiceSortOrder = 'ASCENDING' | 'DESCENDING';
/**
 * A field and an ordering, which can be used in a SORT BY clause.
 */
export interface DataServiceSortByFieldModel {
    /**
     * A field by which to sort rows.
     */
    field: DataServiceFieldReferenceModel;
    /**
     * The order in which the rows should be sorted.
     */
    sortOrder: DataServiceSortOrder;
}

/**
 * This represents the various possible calculations used when comparing an aggregation to the previous period.
 * In the definitions below, CURRENT represents the data for the period being selected,
 * and PREVIOUS represents the data for the period the data will be compared against.
 *
 * In all cases, if any of the two values is `null`, the result will be `null`; otherwise, it will be non-null.
 *
 * - DIFFERENCE is defined as "CURRENT - PREVIOUS".
 * - RELATIVE_DIFFERENCE is defined as "(CURRENT - PREVIOUS) / PREVIOUS". If previous is equal to 0, it is replaced with 1 in the denominator.
 * - RATIO is defined as "CURRENT / PREVIOUS". If previous is equal to 0, it is replaced with 1 in the denominator.
 * - PREVIOUS_VALUE is defined as "PREVIOUS".
 */
export type DataServiceTrend = 'DIFFERENCE' | 'RELATIVE_DIFFERENCE' | 'RATIO' | 'PREVIOUS_VALUE';
/*
 * Calculate the trend compared to a previous period.
 */
export interface DataServiceTrendFieldModel<T extends DataServiceTrend = DataServiceTrend> {
    /**
     * The field to calculate the trend for.
     */
    field: DataServiceFieldReferenceModel;
    /**
     * The trend to calculate.
     */
    trend: T;
    /**
     * An optional name for the trend, returned in the response like an alias.
     */
    outputName?: string;
}
