import {DataServiceFieldReferenceModel} from './DataServiceFieldInterfaces.js';

export type DataServiceConditionModel =
    | DataServiceCombiningConditionModel
    | DataServiceComparisonConditionModel
    | DataServiceListConditionModel
    | DataServiceUnaryConditionModel;

export type DataServiceComparisonOperator =
    | 'EQUALS'
    | 'NOT_EQUALS'
    | 'GREATER_THAN'
    | 'LESS_THAN'
    | 'GREATER_OR_EQUAL'
    | 'LESS_OR_EQUAL';
/**
 * A condition taking two arguments (left and right) and performing a comparison on the two.
 * For example: `country = 'Canada'`.
 */
export interface DataServiceComparisonConditionModel {
    /**
     * The comparison operator to use.
     */
    operator: DataServiceComparisonOperator;
    /**
     * The left field of the comparison.
     */
    left: DataServiceFieldReferenceModel;
    /**
     * The right field of the comparison.
     */
    right: DataServiceFieldReferenceModel;
}

export type DataServiceListOperator = 'IN' | 'NOT_IN';
/**
 * A condition that applies an operator to a field and a list of values.
 * For example: `country IN ('Canada', 'Netherlands')`.
 */
export interface DataServiceListConditionModel {
    /**
     * The list operator to use.
     */
    operator: DataServiceListOperator;
    /**
     * The field to which the values will be compared.
     */
    field: DataServiceFieldReferenceModel;
    /**
     * The values which will be compared to the field.
     */
    values: string[] | number[] | boolean[];
}

export type DataServiceUnaryOperator = 'IS_NULL' | 'IS_NOT_NULL';
/**
 * A condition which is applied to a field. For example: `name IS NOT NULL`.
 */
export interface DataServiceUnaryConditionModel {
    /**
     * The unary operator to use.
     */
    operator: DataServiceUnaryOperator;
    /**
     * The field to which the operator will be applied.
     */
    field: DataServiceFieldReferenceModel;
}

export type DataServiceCombiningOperator = 'AND' | 'OR';
/**
 * A condition that is used to combine multiple other conditions together.
 * The conditions will be combined by the chosen operator. For example: `a OR b OR c`.
 */
export interface DataServiceCombiningConditionModel {
    /**
     * The combining operator to use.
     */
    operator: DataServiceCombiningOperator;
    /**
     * The conditions, that will all be combined using the operator.
     */
    conditions: DataServiceConditionModel[];
}
