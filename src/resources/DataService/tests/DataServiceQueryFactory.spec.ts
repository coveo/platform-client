import {DataServiceConditionModel} from '../DataServiceConditionInterfaces';
import {
    DataServiceAggregationFieldModel,
    DataServiceAliasReferenceFieldModel,
    DataServiceColumnFieldModel,
    DataServiceFunctionFieldModel,
} from '../DataServiceFieldInterfaces';
import {DataServiceQueryFactory} from '../DataServiceQueryFactory';

describe('DataServiceQueryBuilder', () => {
    const booleanField: DataServiceColumnFieldModel<'BOOLEAN'> = {column: 'With_Coveo'};
    const floatField: DataServiceColumnFieldModel<'FLOAT'> = {column: 'Revenue'};
    const timestampField: DataServiceColumnFieldModel<'TIMESTAMP'> = {column: 'Timestamp'};
    const intField: DataServiceAggregationFieldModel<'INTEGER'> = {aggregation: 'COUNT', field: timestampField};
    const dateField: DataServiceFunctionFieldModel<'DATE'> = {function: 'DAY', field: timestampField};
    const stringField: DataServiceFunctionFieldModel<'STRING'> = {function: 'DAY_NAME', field: dateField};

    // For binary operations
    const left: DataServiceColumnFieldModel<'FLOAT'> = {column: 'left'};
    const right: DataServiceAliasReferenceFieldModel<'FLOAT'> = {alias: 'right'};

    describe('aggregationField', () => {
        it('count creates a COUNT aggregation', () => {
            expect(DataServiceQueryFactory.count(booleanField)).toStrictEqual({
                aggregation: 'COUNT',
                field: booleanField,
            });
        });

        it('countDistinct creates a COUNT_DISTINCT aggregation', () => {
            expect(DataServiceQueryFactory.countDistinct(stringField)).toStrictEqual({
                aggregation: 'COUNT_DISTINCT',
                field: stringField,
            });
        });

        it('sum creates a SUM aggregation', () => {
            expect(DataServiceQueryFactory.sum(intField)).toStrictEqual({
                aggregation: 'SUM',
                field: intField,
            });
        });

        it('average creates a AVERAGE aggregation', () => {
            expect(DataServiceQueryFactory.average(floatField)).toStrictEqual({
                aggregation: 'AVERAGE',
                field: floatField,
            });
        });

        it('median creates a MEDIAN aggregation', () => {
            expect(DataServiceQueryFactory.median(floatField)).toStrictEqual({
                aggregation: 'MEDIAN',
                field: floatField,
            });
        });

        it('max creates a MAX aggregation', () => {
            expect(DataServiceQueryFactory.max(timestampField)).toStrictEqual({
                aggregation: 'MAX',
                field: timestampField,
            });
        });

        it('min creates a MIN aggregation', () => {
            expect(DataServiceQueryFactory.min(dateField)).toStrictEqual({
                aggregation: 'MIN',
                field: dateField,
            });
        });
    });

    describe('defineAliasField', () => {
        it('creates an alias definition object having alias and field properties', () => {
            expect(DataServiceQueryFactory.defineAliasField('Day', stringField)).toStrictEqual({
                alias: 'Day',
                field: stringField,
            });
        });
    });

    describe('referenceAliasField', () => {
        it('creates an alias reference object from a string', () => {
            expect(DataServiceQueryFactory.referenceAliasField('test')).toStrictEqual({alias: 'test'});
        });

        it('creates an alias reference object from an alias property', () => {
            expect(DataServiceQueryFactory.referenceAliasField({alias: 'test'})).toStrictEqual({alias: 'test'});
        });
    });

    describe('columnField', () => {
        it('creates an object having a single column property', () => {
            expect(DataServiceQueryFactory.columnField('test')).toStrictEqual({column: 'test'});
        });
    });

    describe('functionField', () => {
        it('minute creates a MINUTE function', () => {
            expect(DataServiceQueryFactory.minute(timestampField)).toStrictEqual({
                function: 'MINUTE',
                field: timestampField,
            });
        });

        it('hour creates a HOUR function', () => {
            expect(DataServiceQueryFactory.hour(timestampField)).toStrictEqual({
                function: 'HOUR',
                field: timestampField,
            });
        });

        it('day creates a DAY function', () => {
            expect(DataServiceQueryFactory.day(timestampField)).toStrictEqual({
                function: 'DAY',
                field: timestampField,
            });
        });

        it('dayName creates a DAY_NAME function', () => {
            expect(DataServiceQueryFactory.dayName(dateField)).toStrictEqual({
                function: 'DAY_NAME',
                field: dateField,
            });
        });

        it('week creates a WEEK function', () => {
            expect(DataServiceQueryFactory.week(timestampField)).toStrictEqual({
                function: 'WEEK',
                field: timestampField,
            });
        });

        it('month creates a MONTH function', () => {
            expect(DataServiceQueryFactory.month(dateField)).toStrictEqual({
                function: 'MONTH',
                field: dateField,
            });
        });

        it('year creates a YEAR function', () => {
            expect(DataServiceQueryFactory.year(dateField)).toStrictEqual({
                function: 'YEAR',
                field: dateField,
            });
        });

        it('round creates a ROUND function with no additional argument', () => {
            expect(DataServiceQueryFactory.round(floatField)).toStrictEqual({
                function: 'ROUND',
                field: floatField,
            });
        });

        it('round creates a ROUND function with zero argument', () => {
            expect(DataServiceQueryFactory.round(floatField, 0)).toStrictEqual({
                function: 'ROUND',
                field: floatField,
                argument: 0,
            });
        });
    });

    describe('mathField', () => {
        it('addition creates an ADDITION math field', () => {
            expect(DataServiceQueryFactory.addition(left, right)).toStrictEqual({
                mathOperation: 'ADDITION',
                left,
                right,
            });
        });

        it('subtraction creates a SUBTRACTION math field', () => {
            expect(DataServiceQueryFactory.subtraction(left, right)).toStrictEqual({
                mathOperation: 'SUBTRACTION',
                left,
                right,
            });
        });

        it('multiplication creates a MULTIPLICATION math field', () => {
            expect(DataServiceQueryFactory.multiplication(left, right)).toStrictEqual({
                mathOperation: 'MULTIPLICATION',
                left,
                right,
            });
        });

        it('division creates a DIVISION math field', () => {
            expect(DataServiceQueryFactory.division(left, right)).toStrictEqual({
                mathOperation: 'DIVISION',
                left,
                right,
            });
        });
    });

    describe('trendField', () => {
        it('trendDifference creates a DIFFERENCE trend field', () => {
            expect(DataServiceQueryFactory.trendDifference(floatField)).toStrictEqual({
                trend: 'DIFFERENCE',
                field: floatField,
            });
        });

        it('trendRelativeDifference creates a RELATIVE_DIFFERENCE trend field', () => {
            expect(DataServiceQueryFactory.trendRelativeDifference(floatField)).toStrictEqual({
                trend: 'RELATIVE_DIFFERENCE',
                field: floatField,
            });
        });

        it('trendRatio creates a RATIO trend field', () => {
            expect(DataServiceQueryFactory.trendRatio(floatField)).toStrictEqual({
                trend: 'RATIO',
                field: floatField,
            });
        });

        it('trendPreviousValue creates a PREVIOUS_VALUE trend field', () => {
            expect(DataServiceQueryFactory.trendPreviousValue(floatField)).toStrictEqual({
                trend: 'PREVIOUS_VALUE',
                field: floatField,
            });
        });
    });

    describe('valueField', () => {
        it.each(['2024-02-07', 1337, false, null])('creates an object having a single value property', (value) => {
            expect(DataServiceQueryFactory.valueField(value)).toStrictEqual({value});
        });
    });

    describe('combiningCondition', () => {
        const conditions: DataServiceConditionModel[] = [
            {operator: 'IS_NULL', field: stringField},
            {operator: 'IN', field: dateField, values: ['2024-01-01', '2024-02-02', '2024-03-03']},
        ];

        it('and creates an AND combining condition', () => {
            expect(DataServiceQueryFactory.and(conditions)).toStrictEqual({
                operator: 'AND',
                conditions,
            });
        });

        it('or creates an OR combining condition', () => {
            expect(DataServiceQueryFactory.or(conditions)).toStrictEqual({
                operator: 'OR',
                conditions,
            });
        });
    });

    describe('comparisonCondition', () => {
        it('equals creates an EQUALS comparison condition', () => {
            expect(DataServiceQueryFactory.equals(left, right)).toStrictEqual({
                operator: 'EQUALS',
                left,
                right,
            });
        });

        it('notEquals creates a NOT_EQUALS comparison condition', () => {
            expect(DataServiceQueryFactory.notEquals(left, right)).toStrictEqual({
                operator: 'NOT_EQUALS',
                left,
                right,
            });
        });

        it('greaterThan creates a GREATER_THAN comparison condition', () => {
            expect(DataServiceQueryFactory.greaterThan(left, right)).toStrictEqual({
                operator: 'GREATER_THAN',
                left,
                right,
            });
        });

        it('lessThan creates a LESS_THAN comparison condition', () => {
            expect(DataServiceQueryFactory.lessThan(left, right)).toStrictEqual({
                operator: 'LESS_THAN',
                left,
                right,
            });
        });

        it('greaterOrEqual creates a GREATER_OR_EQUAL comparison condition', () => {
            expect(DataServiceQueryFactory.greaterOrEqual(left, right)).toStrictEqual({
                operator: 'GREATER_OR_EQUAL',
                left,
                right,
            });
        });

        it('lessOrEqual creates a LESS_OR_EQUAL comparison condition', () => {
            expect(DataServiceQueryFactory.lessOrEqual(left, right)).toStrictEqual({
                operator: 'LESS_OR_EQUAL',
                left,
                right,
            });
        });
    });

    describe('listCondition', () => {
        const values: number[] = [1, 2, 3];

        it('inList creates an IN list condition', () => {
            expect(DataServiceQueryFactory.inList(intField, values)).toStrictEqual({
                operator: 'IN',
                field: intField,
                values,
            });
        });

        it('notInList creates a NOT_IN list condition', () => {
            expect(DataServiceQueryFactory.notInList(intField, values)).toStrictEqual({
                operator: 'NOT_IN',
                field: intField,
                values,
            });
        });
    });

    describe('unaryCondition', () => {
        it('isNull creates an IS_NULL unary condition', () => {
            expect(DataServiceQueryFactory.isNull(booleanField)).toStrictEqual({
                operator: 'IS_NULL',
                field: booleanField,
            });
        });

        it('isNotNull creates an IS_NOT_NULL unary condition', () => {
            expect(DataServiceQueryFactory.isNotNull(booleanField)).toStrictEqual({
                operator: 'IS_NOT_NULL',
                field: booleanField,
            });
        });
    });

    describe('sortByField', () => {
        it('sortAscending creates an ASCENDING unary condition', () => {
            expect(DataServiceQueryFactory.sortAscending(floatField)).toStrictEqual({
                sortOrder: 'ASCENDING',
                field: floatField,
            });
        });

        it('sortDescending creates a DESCENDING unary condition', () => {
            expect(DataServiceQueryFactory.sortDescending(floatField)).toStrictEqual({
                sortOrder: 'DESCENDING',
                field: floatField,
            });
        });
    });

    describe('infer', () => {
        it('returns the input as-is', () => {
            // Note: already infer, to "test" the type signature resolves.
            const input = DataServiceQueryFactory.infer({
                fromTable: 'test',
                selectFields: [
                    DataServiceQueryFactory.columnField<'DATE'>('day'),
                    DataServiceQueryFactory.columnField<'STRING'>('category'),
                    DataServiceQueryFactory.columnField<'FLOAT'>('value'),
                ],
                selectTrendFields: [DataServiceQueryFactory.trendDifference({column: 'value'})],
                fromDate: new Date('2024-01-01T00:00:00.000Z'),
                toDate: new Date('2024-03-31T23:59:59.999Z'),
            });

            expect(DataServiceQueryFactory.infer(input)).toBe(input);
        });
    });
});
