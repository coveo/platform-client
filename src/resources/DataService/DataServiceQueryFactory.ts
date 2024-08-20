import {
    DataServiceCombiningConditionModel,
    DataServiceCombiningOperator,
    DataServiceComparisonConditionModel,
    DataServiceComparisonOperator,
    DataServiceConditionModel,
    DataServiceListConditionModel,
    DataServiceListOperator,
    DataServiceUnaryConditionModel,
    DataServiceUnaryOperator,
} from './DataServiceConditionInterfaces.js';
import {
    DataServiceAggregation,
    DataServiceAggregationFieldModel,
    DataServiceAliasDefinitionFieldModel,
    DataServiceAliasReferenceFieldModel,
    DataServiceColumnFieldModel,
    DataServiceFieldModel,
    DataServiceFieldReferenceModel,
    DataServiceFunction,
    DataServiceFunctionFieldModel,
    DataServiceMathFieldModel,
    DataServiceMathOperation,
    DataServiceSortByFieldModel,
    DataServiceSortOrder,
    DataServiceTrend,
    DataServiceTrendFieldModel,
    DataServiceValueFieldModel,
} from './DataServiceFieldInterfaces.js';
import {DataServiceQueryModel} from './DataServiceInterfaces.js';
import {
    DataServiceColumnType,
    DataServiceMapColumnTypeToDataType,
    DataServiceNumericalColumnType,
    DataServiceTemporalColumnType,
} from './DataServiceTableInterfaces.js';

type FirstParameter<T extends (arg0: any, ...rest: readonly any[]) => any> = T extends (
    arg0: infer A,
    ..._: never
) => any
    ? A
    : never;
type BindFirst<T extends (arg0: any, ...rest: readonly any[]) => any> = T extends (
    _: never,
    ...args: infer P
) => infer R
    ? (...args: P) => R
    : never;
type BindFirstFixedReturn<T extends (arg0: any, ...rest: readonly any[]) => R, R> = T extends (
    _: never,
    ...args: infer P
) => R
    ? (...args: P) => R
    : never;

// Fields
interface AggregationFieldFactoryCount {
    (
        aggregation: 'COUNT' | 'COUNT_DISTINCT',
        field: DataServiceFieldReferenceModel,
    ): DataServiceAggregationFieldModel<'INTEGER'>;
}
interface AggregationFieldFactoryNumericalTypePreserving {
    <CT extends DataServiceNumericalColumnType>(
        aggregation: 'SUM',
        field: DataServiceFieldReferenceModel<CT>,
    ): DataServiceAggregationFieldModel<CT>;
}
interface AggregationFieldFactoryTypePreserving {
    <CT extends DataServiceColumnType>(
        aggregation: 'MIN' | 'MAX',
        field: DataServiceFieldReferenceModel<CT>,
    ): DataServiceAggregationFieldModel<CT>;
}
interface AggregationFieldFactoryTypePreservingBind<B extends DataServiceColumnType> {
    <CT extends B>(field: DataServiceFieldReferenceModel<CT>): DataServiceAggregationFieldModel<CT>;
}
interface AggregationFieldFactoryFractional {
    (
        aggregation: 'AVERAGE' | 'MEDIAN',
        field: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
    ): DataServiceAggregationFieldModel<'FLOAT'>;
}
interface AggregationFieldFactory
    extends AggregationFieldFactoryCount,
        AggregationFieldFactoryNumericalTypePreserving,
        AggregationFieldFactoryTypePreserving,
        AggregationFieldFactoryFractional {
    (
        aggregation: DataServiceAggregation,
        field: DataServiceFieldReferenceModel,
    ): DataServiceAggregationFieldModel<DataServiceNumericalColumnType>;
}
const aggregationField: AggregationFieldFactory = (
    aggregation: DataServiceAggregation,
    field: DataServiceFieldReferenceModel,
): DataServiceAggregationFieldModel => ({aggregation, field});

const defineAliasField = <CT extends DataServiceColumnType>(
    alias: string,
    field: DataServiceFieldModel<CT>,
): DataServiceAliasDefinitionFieldModel<CT> => ({alias, field});

const referenceAliasField = <CT extends DataServiceColumnType>(
    aliasOrField: DataServiceAliasDefinitionFieldModel<CT> | DataServiceAliasReferenceFieldModel<CT> | string,
): DataServiceAliasReferenceFieldModel<CT> => ({
    alias: typeof aliasOrField === 'string' ? aliasOrField : aliasOrField.alias,
});

const columnField = <CT extends DataServiceColumnType = DataServiceColumnType>(
    column: string,
): DataServiceColumnFieldModel<CT> => ({column});

interface FunctionFieldFactoryTruncateToTimestamp {
    (
        sqlFunction: 'MINUTE' | 'HOUR',
        field: DataServiceFieldReferenceModel<'TIMESTAMP'>,
    ): DataServiceFunctionFieldModel<'TIMESTAMP'>;
}
interface FunctionFieldFactoryTruncateToDate {
    (
        sqlFunction: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        field: DataServiceFieldReferenceModel<DataServiceTemporalColumnType>,
    ): DataServiceFunctionFieldModel<'DATE'>;
}
interface FunctionFieldFactoryExtractName {
    (
        sqlFunction: 'DAY_NAME',
        field: DataServiceFieldReferenceModel<DataServiceTemporalColumnType>,
    ): DataServiceFunctionFieldModel<'STRING'>;
}
interface FunctionFieldFactoryRound {
    <S extends number = 0>(
        sqlFunction: 'ROUND',
        field: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
        scale?: S,
        // Note that negative scales round the position "before the decimal dot", for example -2 rounds
        // to the nearest multiple of 100. Technically Snowflake allows scales in the range [-38, 38],
        // but lets keep the listed negative values in a sensible range.
    ): S extends 0 | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9 | -10 | -11 | -12
        ? DataServiceFunctionFieldModel<'INTEGER'>
        : DataServiceFunctionFieldModel<'FLOAT'>;
}
interface FunctionFieldFactory
    extends FunctionFieldFactoryTruncateToTimestamp,
        FunctionFieldFactoryTruncateToDate,
        FunctionFieldFactoryExtractName,
        FunctionFieldFactoryRound {
    (
        sqlFunction: DataServiceFunction,
        field: DataServiceFieldReferenceModel,
        argument?: number,
    ): DataServiceFunctionFieldModel;
}
const functionField: FunctionFieldFactory = (
    sqlFunction: DataServiceFunction,
    field: DataServiceFieldReferenceModel,
    argument?: number,
): DataServiceFunctionFieldModel =>
    typeof argument === 'number' ? {function: sqlFunction, field, argument} : {function: sqlFunction, field};

type MathOperationIntegerPreserving = Extract<DataServiceMathOperation, 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION'>;
interface MathFieldFactory {
    (
        mathOperation: MathOperationIntegerPreserving,
        left: DataServiceFieldReferenceModel<'INTEGER'>,
        right: DataServiceFieldReferenceModel<'INTEGER'>,
    ): DataServiceMathFieldModel<'INTEGER'>;
    (
        mathOperation: DataServiceMathOperation,
        left: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
        right: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
    ): DataServiceMathFieldModel<'FLOAT'>;
}
// Sadly there is no way to derive this interface with overloads
interface MathFieldFactoryIntegerPreservingBind {
    (
        left: DataServiceFieldReferenceModel<'INTEGER'>,
        right: DataServiceFieldReferenceModel<'INTEGER'>,
    ): DataServiceMathFieldModel<'INTEGER'>;
    (
        left: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
        right: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
    ): DataServiceMathFieldModel<'FLOAT'>;
}
const mathField: MathFieldFactory = (
    mathOperation: DataServiceMathOperation,
    left: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
    right: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
): DataServiceMathFieldModel<DataServiceNumericalColumnType> => ({mathOperation, left, right});

const trendField = <TR extends DataServiceTrend>(
    trend: TR,
    field: DataServiceFieldReferenceModel<DataServiceNumericalColumnType>,
    outputName?: string,
): DataServiceTrendFieldModel<TR> => (typeof outputName === 'string' ? {field, trend, outputName} : {field, trend});

const valueField = <CT extends DataServiceColumnType>(
    value: DataServiceMapColumnTypeToDataType[CT],
): DataServiceValueFieldModel<CT> => ({value});

// Conditions
const combiningCondition = (
    operator: DataServiceCombiningOperator,
    conditions: DataServiceConditionModel[],
): DataServiceCombiningConditionModel => ({operator, conditions});

interface ComparisonConditionFactoryBind {
    <CT extends DataServiceColumnType>(
        left: DataServiceFieldReferenceModel<CT>,
        right: DataServiceFieldReferenceModel<CT>,
    ): DataServiceComparisonConditionModel;
}
const comparisonCondition = <CT extends DataServiceColumnType>(
    operator: DataServiceComparisonOperator,
    left: DataServiceFieldReferenceModel<CT>,
    right: DataServiceFieldReferenceModel<CT>,
): DataServiceComparisonConditionModel => ({operator, left, right});

interface ListConditionFactoryBind {
    <CT extends DataServiceColumnType>(
        field: DataServiceFieldReferenceModel<CT>,
        values: Array<Exclude<DataServiceMapColumnTypeToDataType[CT], null>>,
    ): DataServiceListConditionModel;
}
const listCondition = <CT extends DataServiceColumnType>(
    operator: DataServiceListOperator,
    field: DataServiceFieldReferenceModel<CT>,
    values: Array<Exclude<DataServiceMapColumnTypeToDataType[CT], null>>,
): DataServiceListConditionModel => ({values: values as DataServiceListConditionModel['values'], operator, field});

const unaryCondition = (
    operator: DataServiceUnaryOperator,
    field: DataServiceFieldReferenceModel,
): DataServiceUnaryConditionModel => ({operator, field});

// SortBy
const sortByField = (
    sortOrder: DataServiceSortOrder,
    field: DataServiceFieldReferenceModel,
): DataServiceSortByFieldModel => ({field, sortOrder});

const infer = <CT extends readonly DataServiceColumnType[], TR extends readonly DataServiceTrend[] = []>(
    query: DataServiceQueryModel<CT, TR>,
) => query;

// Until TypeScript fully supports bind signatures with generic parameters on the target function as well as overloads,
// we'll have to maintain these overloads to select the correct signature for TypeScript instead.
interface ResolveBindSignature {
    // AggregationField
    (
        fn: AggregationFieldFactory,
        operator: FirstParameter<AggregationFieldFactoryCount>,
    ): BindFirst<AggregationFieldFactoryCount>;
    (
        fn: AggregationFieldFactory,
        operator: FirstParameter<AggregationFieldFactoryFractional>,
    ): BindFirst<AggregationFieldFactoryFractional>;
    (
        fn: AggregationFieldFactory,
        operator: FirstParameter<AggregationFieldFactoryNumericalTypePreserving>,
    ): AggregationFieldFactoryTypePreservingBind<DataServiceNumericalColumnType>;
    (
        fn: AggregationFieldFactory,
        operator: FirstParameter<AggregationFieldFactoryTypePreserving>,
    ): AggregationFieldFactoryTypePreservingBind<DataServiceColumnType>;
    // FunctionField
    (
        fn: FunctionFieldFactory,
        operator: FirstParameter<FunctionFieldFactoryTruncateToTimestamp>,
    ): BindFirst<FunctionFieldFactoryTruncateToTimestamp>;
    (
        fn: FunctionFieldFactory,
        operator: FirstParameter<FunctionFieldFactoryTruncateToDate>,
    ): BindFirst<FunctionFieldFactoryTruncateToDate>;
    (
        fn: FunctionFieldFactory,
        operator: FirstParameter<FunctionFieldFactoryExtractName>,
    ): BindFirst<FunctionFieldFactoryExtractName>;
    (
        fn: FunctionFieldFactory,
        operator: FirstParameter<FunctionFieldFactoryRound>,
    ): BindFirst<FunctionFieldFactoryRound>;
    // MathField
    (fn: MathFieldFactory, operator: MathOperationIntegerPreserving): MathFieldFactoryIntegerPreservingBind;
    // TrendField
    <TR extends DataServiceTrend>(
        fn: typeof trendField,
        trend: TR,
    ): BindFirstFixedReturn<typeof trendField, DataServiceTrendFieldModel<TR>>;
    // ComparisonCondition
    (fn: typeof comparisonCondition, operator: DataServiceComparisonOperator): ComparisonConditionFactoryBind;
    // ListCondition
    (fn: typeof listCondition, operator: DataServiceListOperator): ListConditionFactoryBind;
    // General case
    <F extends (operator: O, ...args: any[]) => any, O>(fn: F, operator: O): BindFirst<F>;
}

const bind: ResolveBindSignature = (fn: (...args: readonly any[]) => any, operator: unknown) => fn.bind(null, operator);

/**
 * Utility type that contains various utilities to help build query parts.
 * These utilities provide opt-in type safety; when used correctly, types will infer correctly.
 * This does require specifying the correct type as type argument to `columnField`.
 */
export const DataServiceQueryFactory = {
    // Fields
    /**
     * Create an aggregation field, to define how to aggregate values when grouping.
     * Note that some aggregations change the type of the field. The count aggregations
     * work on all field types, other aggregations require numerical field types.
     *
     * @param aggregation The {@link DataServiceAggregation} to use.
     * @param field The field to aggregate values of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    aggregationField,
    /**
     * Create an aggregation that will count the number of rows that have a non-`null` value for the field.
     * This works on all field types, and changes the type to integer.
     *
     * @param field The field to count non-null values of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    count: bind(aggregationField, 'COUNT'),
    /**
     * Create an aggregation that will count the number of rows that have a distinct non-`null` value for the field.
     * This works on all field types, and changes the type to integer.
     *
     * @param field The field to count non-null values of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    countDistinct: bind(aggregationField, 'COUNT_DISTINCT'),
    /**
     * Create an aggregation that will sum the values of numerical field types.
     * If there are no rows in a group, or if all rows have a `null` value, the resulting value is `null`.
     *
     * @param field The field to sum numerical values of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    sum: bind(aggregationField, 'SUM'),
    /**
     * Create an aggregation that will calculate the average value of numerical field types.
     * If there are no rows in a group, or if all rows have a `null` value, the resulting value is `null`.
     *
     * @param field The field to calcualte the average numerical value of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    average: bind(aggregationField, 'AVERAGE'),
    /**
     * Create an aggregation that will calculate the median value of numerical field types.
     * If there are no rows in a group, or if all rows have a `null` value, the resulting value is `null`.
     *
     * @param field The field to calcualte the average numerical value of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    median: bind(aggregationField, 'MEDIAN'),
    /**
     * Create an aggregation that selects the minimum value, based on the collation rules for the data type.
     * If there are no rows in a group, or if all rows have a `null` value, the resulting value is `null`.
     *
     * @param field The field to determine the minimum value of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    min: bind(aggregationField, 'MIN'),
    /**
     * Create an aggregation that selects the maximum value, based on the collation rules for the data type.
     * If there are no rows in a group, or if all rows have a `null` value, the resulting value is `null`.
     *
     * @param field The field to determine the maximum value of.
     * @returns The created {@link DataServiceAggregationFieldModel}.
     */
    max: bind(aggregationField, 'MAX'),

    /**
     * Create an alias definition field, which can be used in the `selectFields` (at top level) only.
     * Besides creating an alias, this also defines the field this alias refers to.
     * Other parts of the query can refer to this alias instead of repeating the field definition.
     *
     * @param alias The alias to define for the field.
     * @param field The field that this alias is for.
     * @returns The created {@link DataServiceAliasDefinitionFieldModel}.
     */
    defineAliasField,

    /**
     * Create an alias reference field, which can be used to refer to an alias definition in the select fields.
     * It is highly recommended to create this alias reference definition from a {@link DataServiceAliasDefinitionFieldModel},
     * as this automatically preserves the known type of the field.
     *
     * @example
     * ```
     * // Definition of the column field in the table.
     * const REVENUE = DataServiceQueryFactory.columnField<'FLOAT'>('REVENUE');
     * // Define an alias for the sum of revenue; use this in the `selectFields` (and only once).
     * const TOTAL_REVENUE_ALIAS = DataServiceQueryFactory.defineAliasField('TOTAL_REVENUE', DataServiceQueryFactory.sum(REVENUE));
     *
     * // Define an alias reference field, that should be used to refer to the field defined in the `selectQuery`.
     * // Examples of where you may use this reference are in the `trendSelectFields`, the `sortBy` clause, or even in another (calculated) field in `selectFields`.
     * // Note that by passing TOTAL_REVENUE_ALIAS, the resolved type is DataServiceAliasReferenceFieldModel<'FLOAT'>.
     * const TOTAL_REVENUE_ALIAS_REFERENCE = DataServiceQueryFactory.referenceAliasField(TOTAL_REVENUE_ALIAS);
     * ```
     *
     * @param aliasOrField The alias, or alias definition field, this refers to.
     * @returns The created {@link DataServiceAliasReferenceFieldModel}.
     */
    referenceAliasField,

    /**
     * Define a field based on a table column, possibly defining the field type too.
     * It is highly recommended to pass the column type as type argument, if known.
     *
     * @example
     * ```
     * // Resolved type: DataServiceColumnFieldModel<'STRING'>;
     * const PRODUCT_NAME = DataServiceQueryFactory.columnField<'STRING'>('PRODUCT_NAME');
     *
     * // Resolved type: DataServiceColumnFieldModel<'FLOAT'>;
     * const REVENUE = DataServiceQueryFactory.columnField<'FLOAT'>('REVENUE');
     * ```
     *
     * @param column The name of the column in the table.
     * @returns The created {@link DataServiceColumnFieldModel}.
     */
    columnField,

    /**
     * Create a field that applies the {@link DataServiceFunction} to a field value, yielding a transformed value.
     * Different functions have different effects, check the specific function method for details.
     * Note that functions may change the type of their input value.
     *
     * @param sqlFunction The {@link DataServiceFunction} to apply.
     * @param field The field value to apply the function on.
     * @param argument Optional argument to the function, only applicable for some functions.
     * @returns The created {@link DataServiceFieldModel}.
     */
    functionField,
    /**
     * Create a field that truncates timestamp values to the minute level.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    minute: bind(functionField, 'MINUTE'),
    /**
     * Create a field that truncates timestamp values to the hour level.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    hour: bind(functionField, 'HOUR'),
    /**
     * Create a field that truncates temporal values to the day level.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    day: bind(functionField, 'DAY'),
    /**
     * Create a field that extracts the day name from a date or timestamp value.
     *
     * @param field The field value to extract the day name from.
     * @returns The created {@link DataServiceFieldModel}.
     */
    dayName: bind(functionField, 'DAY_NAME'),
    /**
     * Create a field that truncates temporal values to the week level.
     * How the start of the week is interpreted depends on the locale the query is run with.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    week: bind(functionField, 'WEEK'),
    /**
     * Create a field that truncates temporal values to the month level.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    month: bind(functionField, 'MONTH'),
    /**
     * Create a field that truncates temporal values to the year level.
     * Can be combined with `groupBy` to aggregate data to this level.
     *
     * @param field The field value to apply temporal truncation on.
     * @returns The created {@link DataServiceFieldModel}.
     */
    year: bind(functionField, 'YEAR'),
    /**
     * Create a field that rounds numerical values to the specified scale.
     *
     * @param field The field value to round.
     * @param scale Defines the scale to round to relative to the decimal dot, defaults to `0`.
     * Using zero rounds values to integer, positive values round to the specified number of digits.
     * Negative values are interpreted as rounding "left of the decimal dot", so `-1` rounds to multiples of `10`,
     * `-2` multiples of `100` et cetera.
     * @returns The created {@link DataServiceFieldModel}.
     */
    round: bind(functionField, 'ROUND'),

    /**
     * Create a field that applies a binary mathematical operation on numerical fields.
     * If either value is `null`, the result will be `null`.
     *
     * @param mathOperation The {@link DataServiceMathOperation} to apply.
     * @param left The left hand side of the operation.
     * @param right The right hand side of the operation.
     * @returns The created {@link DataServiceMathFieldModel}.
     */
    mathField,
    /**
     * Create a field that adds two numerical fields.
     * If either value is `null`, the result will be `null`.
     *
     * @param left The left hand side of the addition.
     * @param right The right hand side of the addition.
     * @returns The created {@link DataServiceMathFieldModel}.
     */
    addition: bind(mathField, 'ADDITION'),
    /**
     * Create a field that subtracts two numerical fields.
     * If either value is `null`, the result will be `null`.
     *
     * @param left The left hand side of the subtraction.
     * @param right The right hand side of the subtraction.
     * @returns The created {@link DataServiceMathFieldModel}.
     */
    subtraction: bind(mathField, 'SUBTRACTION'),
    /**
     * Create a field that multiplies two numerical fields.
     * If either value is `null`, the result will be `null`.
     *
     * @param left The left hand side of the multiplication.
     * @param right The right hand side of the multiplication.
     * @returns The created {@link DataServiceMathFieldModel}.
     */
    multiplication: bind(mathField, 'MULTIPLICATION'),
    /**
     * Create a field that divides `left` by `right`, coercing divide-by-zero to the value `0`.
     * If either value is `null`, the result will be `null`.
     *
     * @param left The dividend of the division, the value being divided.
     * @param right The divisor of the division, the value being divided by.
     * @returns The created {@link DataServiceMathFieldModel}.
     */
    division: bind(mathField, 'DIVISION'),

    /**
     * Create a trend field to use in the `selectTrendFields` section of a query.
     * Note that trends may refer to aliases defined in the `selectFields`, instead of repeating the field.
     *
     * @param trend The {@link DataServiceTrend} to calculate.
     * @param field The field to calculate the trend of.
     * @param outputName Optional: the name of the trend field in the output.
     * Effectively does the same as an `alias` definition in the `selectFields`, but this name cannot be referred to.
     * @returns The created {@link DataServiceTrendFieldModel}.
     */
    trendField,
    /**
     * Create a "difference" trend to use in the `selectTrendFields` section of a query.
     * `'DIFFERENCE'` is defined as `CURRENT - PREVIOUS`, so values will represent the absolute difference.
     * Note that trends may refer to aliases defined in the `selectFields`, instead of repeating the field.
     *
     * @param field The field to calculate the difference trend of.
     * @param outputName Optional: the name of the trend field in the output.
     * Effectively does the same as an `alias` definition in the `selectFields`, but this name cannot be referred to.
     * @returns The created {@link DataServiceTrendFieldModel}.
     */
    trendDifference: bind(trendField, 'DIFFERENCE'),
    /**
     * Create a "relative difference" trend to use in the `selectTrendFields` section of a query.
     * `'RELATIVE_DIFFERENCE'` is defined as `(CURRENT - PREVIOUS) / PREVIOUS`, so values will represent the ratio of change.
     * If previous is equal to `0`, it is replaced with `1` in the divisor.
     * Note that trends may refer to aliases defined in the `selectFields`, instead of repeating the field.
     *
     * @param field The field to calculate the relative difference trend of.
     * @param outputName Optional: the name of the trend field in the output.
     * Effectively does the same as an `alias` definition in the `selectFields`, but this name cannot be referred to.
     * @returns The created {@link DataServiceTrendFieldModel}.
     */
    trendRelativeDifference: bind(trendField, 'RELATIVE_DIFFERENCE'),
    /**
     * Create a "ratio" trend to use in the `selectTrendFields` section of a query.
     * `'RATIO'` is defined as `CURRENT / PREVIOUS`, so values will represent the ratio between the current and previous value.
     * If previous is equal to `0`, it is replaced with `1` in the divisor.
     * Note that trends may refer to aliases defined in the `selectFields`, instead of repeating the field.
     *
     * @param field The field to calculate the ratio trend of.
     * @param outputName Optional: the name of the trend field in the output.
     * Effectively does the same as an `alias` definition in the `selectFields`, but this name cannot be referred to.
     * @returns The created {@link DataServiceTrendFieldModel}.
     */
    trendRatio: bind(trendField, 'RATIO'),
    /**
     * Create a "previous value" trend to use in the `selectTrendFields` section of a query.
     * `'PREVIOUS_VALUE'` is defined as `PREVIOUS`, so it simply returns the previous value.
     * Note that trends may refer to aliases defined in the `selectFields`, instead of repeating the field.
     *
     * @param field The field to retrieve the previous value of.
     * @param outputName Optional: the name of the trend field in the output.
     * Effectively does the same as an `alias` definition in the `selectFields`, but this name cannot be referred to.
     * @returns The created {@link DataServiceTrendFieldModel}.
     */
    trendPreviousValue: bind(trendField, 'PREVIOUS_VALUE'),

    /**
     * Create a static value field, for example to compare to.
     * Note that while {@link DataServiceValueFieldModel} accepts `null` values, in many contexts
     * (such as comparison) using `null` is not valid. This requires using a unary operation instead.
     *
     * @param value The value to use.
     * @returns The created {@link DataServiceValueFieldModel}.
     */
    valueField,

    // Conditions
    /**
     * Create a logical AND or OR of two or more conditions.
     *
     * @param operator The logical operation to use to evualuate the condition result.
     * @param conditions The conditions to combine, must contain at least two conditions.
     * @returns The created {@link DataServiceCombiningConditionModel}.
     */
    combiningCondition,
    /**
     * Create a logical AND of two or more conditions.
     *
     * @param conditions The conditions to combine, must contain at least two conditions.
     * @returns The created {@link DataServiceCombiningConditionModel}.
     */
    and: bind(combiningCondition, 'AND'),
    /**
     * Create a logical OR of two or more conditions.
     *
     * @param conditions The conditions to combine, must contain at least two conditions.
     * @returns The created {@link DataServiceCombiningConditionModel}.
     */
    or: bind(combiningCondition, 'OR'),

    /**
     * Create a condition that compares two values based on an operator.
     * Note that this should not be used to check against `null` values, use a unary condition for that.
     *
     * @param operator The {@link DataServiceComparisonOperator} to apply.
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    comparisonCondition,
    /**
     * Create a condition that verifies if `left == right`.
     * Note that this should not be used to check against `null` values, use the unary `isNull` condition for that.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    equals: bind(comparisonCondition, 'EQUALS'),
    /**
     * Create a condition that verifies if `left != right`.
     * Note that this should not be used to check against `null` values, use the unary `isNotNull` condition for that.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    notEquals: bind(comparisonCondition, 'NOT_EQUALS'),
    /**
     * Create a condition that verifies if `left < right`.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    greaterThan: bind(comparisonCondition, 'GREATER_THAN'),
    /**
     * Create a condition that verifies if `left > right`.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    lessThan: bind(comparisonCondition, 'LESS_THAN'),
    /**
     * Create a condition that verifies if `left <= right`.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    greaterOrEqual: bind(comparisonCondition, 'GREATER_OR_EQUAL'),
    /**
     * Create a condition that verifies if `left >= right`.
     *
     * @param left The left hand side of the comparison.
     * @param right The right hand side of the comparison.
     * @returns The created {@link DataServiceComparisonConditionModel}.
     */
    lessOrEqual: bind(comparisonCondition, 'LESS_OR_EQUAL'),

    /**
     * Create a list condition, which can check a field value is or is not in a list of values.
     * Note that this list may not contain `null` values, to check for (not) `null`, use a unary condition.
     *
     * @param operator The list operator to apply.
     * @param field The field to apply the check on.
     * @param values The values to check against.
     * @returns The created {@link DataServiceListConditionModel}.
     */
    listCondition,
    /**
     * Create a list condition that checks a field value is in a list of values.
     * Note that this list may not contain `null` values, to check for `null`, use the unary `isNull` condition.
     *
     * @param field The field to apply the check on.
     * @param values The values to check against.
     * @returns The created {@link DataServiceListConditionModel}.
     */
    inList: bind(listCondition, 'IN'),
    /**
     * Create a list condition that checks a field value is not in a list of values.
     * Note that this list may not contain `null` values, to check for not `null`, use the unary `isNotNull` condition.
     *
     * @param field The field to apply the check on.
     * @param values The values to check against.
     * @returns The created {@link DataServiceListConditionModel}.
     */
    notInList: bind(listCondition, 'NOT_IN'),

    /**
     * Create a unary condition on a field.
     *
     * @param operator The {@link DataServiceUnaryOperator} to apply.
     * @param field The field to apply the condition to.
     * @returns The created {@link DataServiceUnaryConditionModel}.
     */
    unaryCondition,
    /**
     * Create a `null` check condition on a field.
     *
     * @param operator The {@link DataServiceUnaryOperator} to apply.
     * @param field The field to apply the condition to.
     * @returns The created {@link DataServiceUnaryConditionModel}.
     */
    isNull: bind(unaryCondition, 'IS_NULL'),
    /**
     * Create a not `null` check condition on a field.
     *
     * @param operator The {@link DataServiceUnaryOperator} to apply.
     * @param field The field to apply the condition to.
     * @returns The created {@link DataServiceUnaryConditionModel}.
     */
    isNotNull: bind(unaryCondition, 'IS_NOT_NULL'),

    // SortBy
    /**
     * Sort by a field by the specified sort order.
     *
     * @param sortOrder The {@link DataServiceSortOrder} to use.
     * @param field The field to sort by.
     * @returns The created {@link DataServiceSortByFieldModel}.
     */
    sortByField,
    /**
     * Sort by a field in ascending order.
     *
     * @param field The field to sort by.
     * @returns The created {@link DataServiceSortByFieldModel}.
     */
    sortAscending: bind(sortByField, 'ASCENDING'),
    /**
     * Sort by a field in descending order.
     *
     * @param field The field to sort by.
     * @returns The created {@link DataServiceSortByFieldModel}.
     */
    sortDescending: bind(sortByField, 'DESCENDING'),

    // Infer
    /**
     * Pass a {@link DataServiceQueryModel} definition through this method to have TypeScript infer the query signature.
     *
     * @param query The query definition object to infer types from.
     * @returns The created value of `query` is returned as-is, this method's main goal is to have TypeScript infer types.
     */
    infer,
};
