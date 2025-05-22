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

export const scalar = (value: Scalar) => ({
    value,
});

export const numberScalar = (value: number): ScalarField<number> => ({
    value,
});

export const stringScalar = (value: string): ScalarField<string> => ({
    value,
});

export const column = <A extends string>(col: A) => ({
    column: col,
});

export const numberColumn = <A extends string>(col: A): ColumnField<A, number> => ({
    column: col,
});

export const stringColumn = <A extends string>(col: A): ColumnField<A, string> => ({
    column: col,
});

export const count = (field: Field): AggregateField<number> => ({
    aggregation: 'COUNT',
    field,
});

export const countDistinct = (field: Field): AggregateField<number> => ({
    aggregation: 'COUNT_DISTINCT',
    field,
});

export const sum = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'SUM',
    field,
});

export const average = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'AVERAGE',
    field,
});

export const median = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MEDIAN',
    field,
});

export const min = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MIN',
    field,
});

export const max = (field: Field<number>): AggregateField<number> => ({
    aggregation: 'MAX',
    field,
});

export const plus = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'ADDITION',
    left,
    right,
});

export const minus = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'SUBTRACTION',
    left,
    right,
});

export const multiply = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'MULTIPLICATION',
    left,
    right,
});

export const divide = <V extends Scalar>(left: Field<V>, right: Field<V>): OperationField<V> => ({
    mathOperation: 'DIVISION',
    left,
    right,
});

export const difference = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'DIFFERENCE',
    outputName,
});

export const ratio = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'RATIO',
    outputName,
});

export const relativeDifference = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'RELATIVE_DIFFERENCE',
    outputName,
});

export const previousValue = <V extends Scalar>(field: Field<V>, outputName: string): TrendField<V> => ({
    field,
    trend: 'PREVIOUS_VALUE',
    outputName,
});

export const isNull = (field: Field): Condition => ({
    field,
    operator: 'IS_NULL',
});

export const isNotNull = (field: Field): Condition => ({
    field,
    operator: 'IS_NOT_NULL',
});

export const equals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'EQUALS',
});

export const notEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'NOT_EQUALS',
});

export const greaterThan = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'GREATER_THAN',
});

export const greaterOrEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'GREATER_OR_EQUALS',
});

export const lessThan = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'LESS_THAN',
});
export const lessOrEquals = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'LESS_OR_EQUALS',
});
export const contains = (left: Field, right: Field): Condition => ({
    left,
    right,
    operator: 'CONTAINS',
});

export const isIn = (field: Field, values: Scalar[]): Condition => ({
    field,
    values,
    operator: 'IN',
});

export const notIn = (field: Field, values: Scalar[]): Condition => ({
    field,
    values,
    operator: 'NOT_IN',
});

export const and = (conditions: Condition[]): Condition => ({
    conditions,
    operator: 'AND',
});

export const or = (conditions: Condition[]): Condition => ({
    conditions,
    operator: 'OR',
});

export const sortByAscending = (field: Field): SortBy => ({
    field,
    sortOrder: 'ASCENDING',
});
export const sortByDescending = (field: Field): SortBy => ({
    field,
    sortOrder: 'DESCENDING',
});

export class QueryBuilder<T = object> {
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

    constructor(
        private readonly data: Data,
        private readonly query: Query,
    ) {}

    async execute() {
        return await this.data.query<T>(this.query);
    }

    fromTable(fromTable: string) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            fromTable,
        });
    }

    fromDate(fromDate: Date | number) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            fromDate: (fromDate instanceof Date ? fromDate : new Date(fromDate)).toISOString(),
        });
    }

    toDate(toDate: Date | number) {
        return new QueryBuilder<T>(this.data, {
            ...this.query,
            toDate: (toDate instanceof Date ? toDate : new Date(toDate)).toISOString(),
        });
    }

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
    selectField(field: Field, as?: string) {
        return new QueryBuilder(this.data, {
            ...this.query,
            selectFields: [...this.query.selectFields, as != null ? {alias: as, field} : field],
        });
    }

    selectTrend<V extends Scalar>(field: TrendField<V>, outputName: string) {
        return new QueryBuilder(this.data, {
            ...this.query,
            selectTrendFields: [...(this.query.selectTrendFields || []), {...field, outputName}],
        });
    }

    where(condition: Condition) {
        return new QueryBuilder(this.data, {
            ...this.query,
            where: condition,
        });
    }

    groupBy(field: Field) {
        return new QueryBuilder(this.data, {
            ...this.query,
            groupBy: [...(this.query.groupBy || []), field],
        });
    }

    having(condition: Condition) {
        return new QueryBuilder(this.data, {
            ...this.query,
            having: condition,
        });
    }

    sortBy(sortBy: SortBy) {
        return new QueryBuilder(this.data, {
            ...this.query,
            sortBy: [...(this.query.sortBy || []), sortBy],
        });
    }
}
