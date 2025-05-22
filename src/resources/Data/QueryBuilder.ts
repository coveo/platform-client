import Data, {
    AggregateField,
    ColumnField,
    Condition,
    Field,
    OperationField,
    Query,
    Scalar,
    ScalarField,
    SortBy,
    TrendField,
} from './Data.js';

/**
 * Creates a scalar field.
 * @param value - The scalar value
 * @returns A scalar field object
 */
export const scalar = (value: Scalar) => ({
    value,
});

/**
 * Creates a numeric scalar field.
 * @param value - The numeric value
 * @returns A scalar field object with a number type
 */
export const numberScalar = (value: number): ScalarField<number> => ({
    value,
});

/**
 * Creates a string scalar field.
 * @param value - The string value
 * @returns A scalar field object with a string type
 */
export const stringScalar = (value: string): ScalarField<string> => ({
    value,
});

/**
 * Creates a column field reference.
 * @template A - The column name type
 * @param col - The column name
 * @returns A column field object
 */
export const column = <A extends string>(col: A) => ({
    column: col,
});

/**
 * Creates a numeric column field reference.
 * @template A - The column name type
 * @param col - The column name
 * @returns A column field object with a number type
 */
export const numberColumn = <A extends string>(col: A): ColumnField<A, number> => ({
    column: col,
});

/**
 * Creates a string column field reference.
 * @template A - The column name type
 * @param col - The column name
 * @returns A column field object with a string type
 */
export const stringColumn = <A extends string>(col: A): ColumnField<A, string> => ({
    column: col,
});

/**
 * Creates a COUNT aggregation on a field.
 * @param field - The field to count
 * @returns An aggregate field with COUNT operation
 */
export const count = (field: Field): AggregateField<number> => ({
    aggregation: 'COUNT',
    field,
});

/**
 * Creates a COUNT DISTINCT aggregation on a field.
 * @param field - The field to count distinct values for
 * @returns An aggregate field with COUNT_DISTINCT operation
 */
export const countDistinct = (field: Field): AggregateField<number> => ({
    aggregation: 'COUNT_DISTINCT',
    field,
});

/**
 * Creates a SUM aggregation on a field.
 * @param field - The numeric field to sum
 * @returns An aggregate field with SUM operation
 */
export const sum = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'SUM',
    field,
});

/**
 * Creates an AVERAGE aggregation on a field.
 * @param field - The numeric field to average
 * @returns An aggregate field with AVERAGE operation
 */
export const average = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'AVERAGE',
    field,
});

/**
 * Creates a MEDIAN aggregation on a field.
 * @param field - The numeric field to find the median of
 * @returns An aggregate field with MEDIAN operation
 */
export const median = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MEDIAN',
    field,
});

/**
 * Creates a MIN aggregation on a field.
 * @param field - The numeric field to find the minimum value of
 * @returns An aggregate field with MIN operation
 */
export const min = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MIN',
    field,
});

/**
 * Creates a MAX aggregation on a field.
 * @param field - The numeric field to find the maximum value of
 * @returns An aggregate field with MAX operation
 */
export const max = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MAX',
    field,
});

/**
 * Creates an addition operation between two fields.
 * @template V - The scalar value type
 * @param left - The left operand
 * @param right - The right operand
 * @returns An operation field representing addition
 */
export const plus = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'ADDITION',
    left,
    right,
});

/**
 * Creates a subtraction operation between two fields.
 * @template V - The scalar value type
 * @param left - The left operand
 * @param right - The right operand
 * @returns An operation field representing subtraction
 */
export const minus = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'SUBTRACTION',
    left,
    right,
});

/**
 * Creates a multiplication operation between two fields.
 * @template V - The scalar value type
 * @param left - The left operand
 * @param right - The right operand
 * @returns An operation field representing multiplication
 */
export const multiply = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'MULTIPLICATION',
    left,
    right,
});

/**
 * Creates a division operation between two fields.
 * @template V - The scalar value type
 * @param left - The left operand (dividend)
 * @param right - The right operand (divisor)
 * @returns An operation field representing division
 */
export const divide = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'DIVISION',
    left,
    right,
});

/**
 * Creates a trend field that calculates the difference between current and previous values.
 * @template V - The scalar value type
 * @param field - The field to calculate differences for
 * @param outputName - The name for the output field
 * @returns A trend field with DIFFERENCE operation
 */
export const difference = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'DIFFERENCE',
    outputName,
});

/**
 * Creates a trend field that calculates the ratio between current and previous values.
 * @template V - The scalar value type
 * @param field - The field to calculate ratios for
 * @param outputName - The name for the output field
 * @returns A trend field with RATIO operation
 */
export const ratio = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'RATIO',
    outputName,
});

/**
 * Creates a trend field that calculates the relative difference between current and previous values.
 * @template V - The scalar value type
 * @param field - The field to calculate relative differences for
 * @param outputName - The name for the output field
 * @returns A trend field with RELATIVE_DIFFERENCE operation
 */
export const relativeDifference = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'RELATIVE_DIFFERENCE',
    outputName,
});

/**
 * Creates a trend field that includes the previous value.
 * @template V - The scalar value type
 * @param field - The field to get previous values for
 * @param outputName - The name for the output field
 * @returns A trend field with PREVIOUS_VALUE operation
 */
export const previousValue = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'PREVIOUS_VALUE',
    outputName,
});

/**
 * Creates a condition that checks if a field is NULL.
 * @param field - The field to check
 * @returns A condition representing the IS_NULL check
 */
export const isNull = (field: Field): Condition => ({
    field,
    operator: 'IS_NULL',
});

/**
 * Creates a condition that checks if a field is NOT NULL.
 * @param field - The field to check
 * @returns A condition representing the IS_NOT_NULL check
 */
export const isNotNull = (field: Field): Condition => ({
    field,
    operator: 'IS_NOT_NULL',
});

/**
 * Creates a condition that checks if two fields are equal.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the equality check
 */
export const equals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'EQUALS',
});

/**
 * Creates a condition that checks if two fields are not equal.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the inequality check
 */
export const notEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'NOT_EQUALS',
});

/**
 * Creates a condition that checks if the left field is greater than the right field.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the greater than check
 */
export const greaterThan = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'GREATER_THAN',
});

/**
 * Creates a condition that checks if the left field is greater than or equal to the right field.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the greater than or equal check
 */
export const greaterOrEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'GREATER_OR_EQUALS',
});

/**
 * Creates a condition that checks if the left field is less than the right field.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the less than check
 */
export const lessThan = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'LESS_THAN',
});

/**
 * Creates a condition that checks if the left field is less than or equal to the right field.
 * @param left - The left field to compare
 * @param right - The right field to compare
 * @returns A condition representing the less than or equal check
 */
export const lessOrEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'LESS_OR_EQUALS',
});

/**
 * Creates a condition that checks if the left field contains the right field.
 * @param left - The field to check within
 * @param right - The field to check for
 * @returns A condition representing the contains check
 */
export const contains = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'CONTAINS',
});

/**
 * Creates a condition that checks if a field's value is in a list of values.
 * @param field - The field to check
 * @param values - The list of values to check against
 * @returns A condition representing the IN check
 */
export const isIn = (field: Field, values: Scalar[]): Condition => ({
    field,
    values,
    operator: 'IN',
});

/**
 * Creates a condition that checks if a field's value is not in a list of values.
 * @param field - The field to check
 * @param values - The list of values to check against
 * @returns A condition representing the NOT_IN check
 */
export const notIn = (field: Field, values: Scalar[]): Condition => ({
    field,
    values,
    operator: 'NOT_IN',
});

/**
 * Creates a compound condition with AND logic between all provided conditions.
 * @param conditions - The array of conditions to combine with AND
 * @returns A compound condition with AND operator
 */
export const and = (conditions: Condition[]): Condition => ({
    conditions,
    operator: 'AND',
});

/**
 * Creates a compound condition with OR logic between all provided conditions.
 * @param conditions - The array of conditions to combine with OR
 * @returns A compound condition with OR operator
 */
export const or = (conditions: Condition[]): Condition => ({
    conditions,
    operator: 'OR',
});

/**
 * Creates a sort configuration for ascending order.
 * @param field - The field to sort by
 * @returns A sort configuration with ASCENDING order
 */
export const sortByAscending = (field: Field): SortBy => ({
    field,
    sortOrder: 'ASCENDING',
});

/**
 * Creates a sort configuration for descending order.
 * @param field - The field to sort by
 * @returns A sort configuration with DESCENDING order
 */
export const sortByDescending = (field: Field): SortBy => ({
    field,
    sortOrder: 'DESCENDING',
});

/**
 * QueryBuilder class implements a fluent interface for constructing data queries.
 * It provides methods to build complex queries in a type-safe manner.
 * @template T - The type representing the structure of the query result
 */
export class QueryBuilder<T = object> {
    /**
     * Creates a new QueryBuilder instance with default settings.
     * @param dataService - The Data service to execute queries with
     * @returns A new QueryBuilder instance
     */
    static create(dataService: Data) {
        return new QueryBuilder(dataService, {
            fromTable: '',
            selectFields: [],
            selectTrendFields: [],
            fromDate: '',
            toDate: '',
            previousFromDate: '',
            previousToDate: '',
            perPage: 10,
            page: 0,
        });
    }

    /**
     * Constructs a new QueryBuilder instance.
     * @param data - The Data service instance to execute queries with
     * @param query - The current query configuration
     */
    constructor(
        private readonly data: Data,
        private readonly query: Query,
    ) {}

    /**
     * Executes the current query.
     * @returns A promise that resolves to the query response with the specified type
     */
    async execute() {
        return await this.data.query<T>(this.query);
    }

    /**
     * Sets the table to query from.
     * @param fromTable - The name of the table
     * @returns A new QueryBuilder instance with the updated query
     */
    fromTable(fromTable: string) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            fromTable,
        });
    }

    /**
     * Sets the start date for the query time range.
     * @param fromDate - The start date, either as Date object or timestamp
     * @returns A new QueryBuilder instance with the updated query
     */
    fromDate(fromDate: Date | number) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            fromDate: (fromDate instanceof Date ? fromDate : new Date(fromDate)).toISOString(),
        });
    }

    /**
     * Sets the end date for the query time range.
     * @param toDate - The end date, either as Date object or timestamp
     * @returns A new QueryBuilder instance with the updated query
     */
    toDate(toDate: Date | number) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            toDate: (toDate instanceof Date ? toDate : new Date(toDate)).toISOString(),
        });
    }

    /**
     * Adds a field to select in the query.
     * This method has multiple overloads to handle different field types and provide type safety.
     */
    selectField<A extends string, V extends Scalar>(field: ColumnField<A, V>): QueryBuilder<T & Record<A, V>>;
    selectField<A extends string, V extends Scalar>(field: ScalarField<V>, as: A): QueryBuilder<T & Record<A, V>>;
    selectField<A extends string, V extends Scalar>(
        field: AggregateField<V>,
        as: A,
    ): QueryBuilder<T & Record<A, number>>;
    selectField<A extends string, V extends Scalar>(
        field: OperationField<V>,
        as: A,
    ): QueryBuilder<T & Record<A, Scalar>>;
    /**
     * Implementation of the selectField method.
     * @param field - The field to select
     * @param as - Optional alias for the field
     * @returns A new QueryBuilder instance with the updated query
     */
    selectField(field: Field, as?: string) {
        return new QueryBuilder(this.data, {
            ...this.query,
            selectFields: [...this.query.selectFields, as != null ? {alias: as, field} : field],
        });
    }

    /**
     * Adds a trend field to select in the query.
     * @template V - The scalar value type
     * @param field - The trend field to select
     * @param outputName - The name for the output field
     * @returns A new QueryBuilder instance with the updated query
     */
    selectTrend<V extends Scalar>(field: TrendField<V>, outputName: string) {
        return new QueryBuilder(this.data, {
            ...this.query,
            selectTrendFields: [...(this.query.selectTrendFields || []), {...field, outputName}],
        });
    }

    /**
     * Sets the condition for filtering records in the query.
     * @param condition - The condition to apply
     * @returns A new QueryBuilder instance with the updated query
     */
    where(condition: Condition) {
        return new QueryBuilder(this.data, {
            ...this.query,
            where: condition,
        });
    }

    /**
     * Adds a field to group by in the query.
     * @param field - The field to group by
     * @returns A new QueryBuilder instance with the updated query
     */
    groupBy(field: Field) {
        return new QueryBuilder(this.data, {
            ...this.query,
            groupBy: [...(this.query.groupBy || []), field],
        });
    }

    /**
     * Sets a condition to filter the groups in the query (used with groupBy).
     * @param condition - The condition to apply to groups
     * @returns A new QueryBuilder instance with the updated query
     */
    having(condition: Condition) {
        return new QueryBuilder(this.data, {
            ...this.query,
            having: condition,
        });
    }

    /**
     * Adds a sort configuration to the query.
     * @param sortBy - The sort configuration to add
     * @returns A new QueryBuilder instance with the updated query
     */
    sortBy(sortBy: SortBy) {
        return new QueryBuilder(this.data, {
            ...this.query,
            sortBy: [...(this.query.sortBy || []), sortBy],
        });
    }
}
