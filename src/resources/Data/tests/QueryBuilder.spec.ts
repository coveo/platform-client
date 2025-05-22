import API from '../../../APICore.js';
import Data, {AliasField, ColumnField, Field, Query, QueryResponse, Scalar, ScalarField} from '../Data.js';
import {
    QueryBuilder,
    and,
    average,
    column,
    contains,
    count,
    countDistinct,
    difference,
    divide,
    equals,
    greaterOrEquals,
    greaterThan,
    isIn,
    isNotNull,
    isNull,
    lessOrEquals,
    lessThan,
    max,
    median,
    min,
    minus,
    multiply,
    notEquals,
    notIn,
    numberColumn,
    numberScalar,
    or,
    plus,
    previousValue,
    ratio,
    relativeDifference,
    scalar,
    sortByAscending,
    sortByDescending,
    stringColumn,
    stringScalar,
    sum,
} from '../QueryBuilder.js';

jest.mock('../../../APICore.js');

describe('QueryBuilder', () => {
    let data: Data;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        data = new Data(api, serverlessApi);
        jest.spyOn(data, 'query').mockResolvedValue({
            fields: [{name: 'test', type: 'STRING'}],
            rows: [],
        });
    });

    describe('create method', () => {
        it('should create a new QueryBuilder instance with default settings', () => {
            const queryBuilder = QueryBuilder.create(data);

            expect(queryBuilder).toBeInstanceOf(QueryBuilder);
            expect(queryBuilder.query).toEqual({
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
        });
    });

    describe('query building methods', () => {
        it('fromTable() should set the table name', () => {
            const result = QueryBuilder.create(data).fromTable('events');

            expect(result.query.fromTable).toBe('events');
        });

        it('fromDate() should set the start date as ISO string', () => {
            const date = new Date('2023-01-01');
            const result = QueryBuilder.create(data).fromDate(date);

            expect(result.query.fromDate).toBe(date.toISOString());
        });

        it('fromDate() should convert a timestamp to ISO string', () => {
            const timestamp = Date.parse('2023-01-01');
            const result = QueryBuilder.create(data).fromDate(timestamp);

            expect(result.query.fromDate).toBe(new Date(timestamp).toISOString());
        });

        it('toDate() should set the end date as ISO string', () => {
            const date = new Date('2023-12-31');
            const result = QueryBuilder.create(data).toDate(date);

            expect(result.query.toDate).toBe(date.toISOString());
        });

        it('toDate() should convert a timestamp to ISO string', () => {
            const timestamp = Date.parse('2023-12-31');
            const result = QueryBuilder.create(data).toDate(timestamp);

            expect(result.query.toDate).toBe(new Date(timestamp).toISOString());
        });

        it('selectField() should add a column field to selectFields', () => {
            const columnField: ColumnField<'testCol', string> = {column: 'testCol'};
            const result = QueryBuilder.create(data).selectField(columnField);

            expect(result.query.selectFields).toContainEqual(columnField);
        });

        it('selectField() should add an aliased scalar field to selectFields', () => {
            const scalarField: ScalarField<number> = {value: 42};
            const result = QueryBuilder.create(data).selectField(scalarField, 'testAlias');

            expect(result.query.selectFields).toContainEqual({
                alias: 'testAlias',
                field: scalarField,
            });
        });

        it('selectTrend() should add a trend field to selectTrendFields', () => {
            const trendField = difference(column('visits'), 'diff');
            const result = QueryBuilder.create(data).selectTrend(trendField, 'trend_output');

            expect(result.query.selectTrendFields).toEqual([{...trendField, outputName: 'trend_output'}]);
        });

        it('where() should set the where condition', () => {
            const condition = equals(column('status'), scalar('active'));
            const result = QueryBuilder.create(data).where(condition);

            expect(result.query.where).toEqual(condition);
        });

        it('groupBy() should add a field to groupBy', () => {
            const field = column('category');
            const result = QueryBuilder.create(data).groupBy(field);

            expect(result.query.groupBy).toEqual([field]);
        });

        it('having() should set the having condition', () => {
            const condition = greaterThan(count(column('visits')), scalar(100));
            const result = QueryBuilder.create(data).having(condition);

            expect(result.query.having).toEqual(condition);
        });

        it('sortBy() should add a sort configuration', () => {
            const sortConfig = sortByDescending(column('date'));
            const result = QueryBuilder.create(data).sortBy(sortConfig);

            expect(result.query.sortBy).toEqual([sortConfig]);
        });
    });

    describe('execute method', () => {
        it('should call data.query with the current query', async () => {
            const query: Query = {
                fromTable: 'events',
                selectFields: [column('name')],
                fromDate: new Date('2023-01-01').toISOString(),
                toDate: new Date('2023-12-31').toISOString(),
                perPage: 10,
                page: 0,
            };

            const queryBuilder = new QueryBuilder(data, query);
            await queryBuilder.execute();

            expect(data.query).toHaveBeenCalledWith(query);
        });

        it('should return the result from data.query', async () => {
            const mockResponse: QueryResponse = {
                fields: [{name: 'count', type: 'INTEGER'}],
                rows: [{count: 42}],
            };

            jest.spyOn(data, 'query').mockResolvedValueOnce(mockResponse);

            const result = await QueryBuilder.create(data)
                .fromTable('events')
                .fromDate(new Date('2023-01-01'))
                .toDate(new Date('2023-12-31'))
                .execute();

            expect(result).toBe(mockResponse);
        });
    });

    describe('helper functions', () => {
        describe('scalar field helpers', () => {
            it('scalar() should create a scalar field with the provided value', () => {
                expect(scalar('test')).toEqual({value: 'test'});
                expect(scalar(42)).toEqual({value: 42});
            });

            it('numberScalar() should create a scalar field with the provided number', () => {
                expect(numberScalar(42)).toEqual({value: 42});
            });

            it('stringScalar() should create a scalar field with the provided string', () => {
                expect(stringScalar('test')).toEqual({value: 'test'});
            });
        });

        describe('column field helpers', () => {
            it('column() should create a column field with the provided name', () => {
                expect(column('name')).toEqual({column: 'name'});
            });

            it('numberColumn() should create a number column field with the provided name', () => {
                expect(numberColumn('count')).toEqual({column: 'count'});
            });

            it('stringColumn() should create a string column field with the provided name', () => {
                expect(stringColumn('name')).toEqual({column: 'name'});
            });
        });

        describe('aggregation helpers', () => {
            it('count() should create a COUNT aggregation field', () => {
                const field = column('visits');
                expect(count(field)).toEqual({
                    aggregation: 'COUNT',
                    field,
                });
            });

            it('countDistinct() should create a COUNT_DISTINCT aggregation field', () => {
                const field = column('visitors');
                expect(countDistinct(field)).toEqual({
                    aggregation: 'COUNT_DISTINCT',
                    field,
                });
            });

            it('sum() should create a SUM aggregation field', () => {
                const field = numberColumn('revenue');
                expect(sum(field)).toEqual({
                    aggregation: 'SUM',
                    field,
                });
            });

            it('average() should create an AVERAGE aggregation field', () => {
                const field = numberColumn('score');
                expect(average(field)).toEqual({
                    aggregation: 'AVERAGE',
                    field,
                });
            });

            it('median() should create a MEDIAN aggregation field', () => {
                const field = numberColumn('age');
                expect(median(field)).toEqual({
                    aggregation: 'MEDIAN',
                    field,
                });
            });

            it('min() should create a MIN aggregation field', () => {
                const field = numberColumn('price');
                expect(min(field)).toEqual({
                    aggregation: 'MIN',
                    field,
                });
            });

            it('max() should create a MAX aggregation field', () => {
                const field = numberColumn('score');
                expect(max(field)).toEqual({
                    aggregation: 'MAX',
                    field,
                });
            });
        });

        describe('mathematical operation helpers', () => {
            it('plus() should create an ADDITION operation field', () => {
                const left = numberScalar(5);
                const right = numberScalar(3);
                expect(plus(left, right)).toEqual({
                    mathOperation: 'ADDITION',
                    left,
                    right,
                });
            });

            it('minus() should create a SUBTRACTION operation field', () => {
                const left = numberScalar(5);
                const right = numberScalar(3);
                expect(minus(left, right)).toEqual({
                    mathOperation: 'SUBTRACTION',
                    left,
                    right,
                });
            });

            it('multiply() should create a MULTIPLICATION operation field', () => {
                const left = numberScalar(5);
                const right = numberScalar(3);
                expect(multiply(left, right)).toEqual({
                    mathOperation: 'MULTIPLICATION',
                    left,
                    right,
                });
            });

            it('divide() should create a DIVISION operation field', () => {
                const left = numberScalar(6);
                const right = numberScalar(2);
                expect(divide(left, right)).toEqual({
                    mathOperation: 'DIVISION',
                    left,
                    right,
                });
            });
        });

        describe('trend field helpers', () => {
            it('difference() should create a DIFFERENCE trend field', () => {
                const field = numberColumn('visits');
                expect(difference(field, 'visits_diff')).toEqual({
                    field,
                    trend: 'DIFFERENCE',
                    outputName: 'visits_diff',
                });
            });

            it('ratio() should create a RATIO trend field', () => {
                const field = numberColumn('conversions');
                expect(ratio(field, 'conversion_ratio')).toEqual({
                    field,
                    trend: 'RATIO',
                    outputName: 'conversion_ratio',
                });
            });

            it('relativeDifference() should create a RELATIVE_DIFFERENCE trend field', () => {
                const field = numberColumn('revenue');
                expect(relativeDifference(field, 'revenue_growth')).toEqual({
                    field,
                    trend: 'RELATIVE_DIFFERENCE',
                    outputName: 'revenue_growth',
                });
            });

            it('previousValue() should create a PREVIOUS_VALUE trend field', () => {
                const field = numberColumn('visitors');
                expect(previousValue(field, 'prev_visitors')).toEqual({
                    field,
                    trend: 'PREVIOUS_VALUE',
                    outputName: 'prev_visitors',
                });
            });
        });

        describe('condition helpers', () => {
            it('isNull() should create an IS_NULL condition', () => {
                const field = column('lastLogin');
                expect(isNull(field)).toEqual({
                    field,
                    operator: 'IS_NULL',
                });
            });

            it('isNotNull() should create an IS_NOT_NULL condition', () => {
                const field = column('email');
                expect(isNotNull(field)).toEqual({
                    field,
                    operator: 'IS_NOT_NULL',
                });
            });

            it('equals() should create an EQUALS condition', () => {
                const left = column('status');
                const right = scalar('active');
                expect(equals(left, right)).toEqual({
                    left,
                    right,
                    operator: 'EQUALS',
                });
            });

            it('notEquals() should create a NOT_EQUALS condition', () => {
                const left = column('status');
                const right = scalar('deleted');
                expect(notEquals(left, right)).toEqual({
                    left,
                    right,
                    operator: 'NOT_EQUALS',
                });
            });

            it('greaterThan() should create a GREATER_THAN condition', () => {
                const left = column('age');
                const right = scalar(18);
                expect(greaterThan(left, right)).toEqual({
                    left,
                    right,
                    operator: 'GREATER_THAN',
                });
            });

            it('greaterOrEquals() should create a GREATER_OR_EQUALS condition', () => {
                const left = column('score');
                const right = scalar(60);
                expect(greaterOrEquals(left, right)).toEqual({
                    left,
                    right,
                    operator: 'GREATER_OR_EQUALS',
                });
            });

            it('lessThan() should create a LESS_THAN condition', () => {
                const left = column('price');
                const right = scalar(100);
                expect(lessThan(left, right)).toEqual({
                    left,
                    right,
                    operator: 'LESS_THAN',
                });
            });

            it('lessOrEquals() should create a LESS_OR_EQUALS condition', () => {
                const left = column('quantity');
                const right = scalar(10);
                expect(lessOrEquals(left, right)).toEqual({
                    left,
                    right,
                    operator: 'LESS_OR_EQUALS',
                });
            });

            it('contains() should create a CONTAINS condition', () => {
                const left = column('description');
                const right = scalar('keyword');
                expect(contains(left, right)).toEqual({
                    left,
                    right,
                    operator: 'CONTAINS',
                });
            });

            it('isIn() should create an IN condition', () => {
                const field = column('category');
                const values = ['books', 'movies', 'games'];
                expect(isIn(field, values)).toEqual({
                    field,
                    values,
                    operator: 'IN',
                });
            });

            it('notIn() should create a NOT_IN condition', () => {
                const field = column('status');
                const values = ['deleted', 'archived'];
                expect(notIn(field, values)).toEqual({
                    field,
                    values,
                    operator: 'NOT_IN',
                });
            });

            it('and() should create an AND compound condition', () => {
                const conditions = [
                    equals(column('category'), scalar('books')),
                    greaterThan(column('price'), scalar(10)),
                ];
                expect(and(conditions)).toEqual({
                    conditions,
                    operator: 'AND',
                });
            });

            it('or() should create an OR compound condition', () => {
                const conditions = [
                    equals(column('category'), scalar('books')),
                    equals(column('category'), scalar('movies')),
                ];
                expect(or(conditions)).toEqual({
                    conditions,
                    operator: 'OR',
                });
            });
        });

        describe('sort helpers', () => {
            it('sortByAscending() should create an ascending sort configuration', () => {
                const field = column('date');
                expect(sortByAscending(field)).toEqual({
                    field,
                    sortOrder: 'ASCENDING',
                });
            });

            it('sortByDescending() should create a descending sort configuration', () => {
                const field = column('date');
                expect(sortByDescending(field)).toEqual({
                    field,
                    sortOrder: 'DESCENDING',
                });
            });
        });
    });

    describe('complex query building', () => {
        it('should build a complete query with multiple features', () => {
            const startDate = new Date('2023-01-01');
            const endDate = new Date('2023-12-31');

            const queryBuilder = QueryBuilder.create(data)
                .fromTable('events')
                .fromDate(startDate)
                .toDate(endDate)
                .selectField(column('event_type'))
                .selectField(sum(numberColumn('revenue')), 'total_revenue')
                .selectField(count(column('user_id')), 'user_count')
                .selectTrend(difference(sum(numberColumn('revenue')), 'revenue_diff'), 'revenue_diff')
                .where(
                    and([
                        isNotNull(column('event_type')),
                        or([
                            equals(column('event_type'), scalar('purchase')),
                            equals(column('event_type'), scalar('subscription')),
                        ]),
                        greaterThan(column('revenue'), scalar(0)),
                    ]),
                )
                .groupBy(column('event_type'))
                .having(greaterThan(count(column('event_id')), scalar(10)))
                .sortBy(sortByDescending(column('total_revenue')));

            // Verify the built query structure
            expect(queryBuilder.query).toEqual({
                fromTable: 'events',
                fromDate: startDate.toISOString(),
                toDate: endDate.toISOString(),
                selectFields: [
                    {column: 'event_type'},
                    {alias: 'total_revenue', field: {aggregation: 'SUM', field: {column: 'revenue'}}},
                    {alias: 'user_count', field: {aggregation: 'COUNT', field: {column: 'user_id'}}},
                ],
                selectTrendFields: [
                    {
                        field: {aggregation: 'SUM', field: {column: 'revenue'}},
                        trend: 'DIFFERENCE',
                        outputName: 'revenue_diff',
                    },
                ],
                where: {
                    conditions: [
                        {field: {column: 'event_type'}, operator: 'IS_NOT_NULL'},
                        {
                            conditions: [
                                {
                                    left: {column: 'event_type'},
                                    right: {value: 'purchase'},
                                    operator: 'EQUALS',
                                },
                                {
                                    left: {column: 'event_type'},
                                    right: {value: 'subscription'},
                                    operator: 'EQUALS',
                                },
                            ],
                            operator: 'OR',
                        },
                        {
                            left: {column: 'revenue'},
                            right: {value: 0},
                            operator: 'GREATER_THAN',
                        },
                    ],
                    operator: 'AND',
                },
                groupBy: [{column: 'event_type'}],
                having: {
                    left: {aggregation: 'COUNT', field: {column: 'event_id'}},
                    right: {value: 10},
                    operator: 'GREATER_THAN',
                },
                sortBy: [
                    {
                        field: {column: 'total_revenue'},
                        sortOrder: 'DESCENDING',
                    },
                ],
                page: 0,
                perPage: 10,
                previousFromDate: '',
                previousToDate: '',
            });
        });
    });
});
