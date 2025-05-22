import API from '../../APICore.js';
import Resource from '../Resource.js';
import {QueryBuilder} from './QueryBuilder.js';

/**
 * Represents a scalar value in the data query system.
 * A scalar can be either a string or a number.
 */
export type Scalar = string | number;

/**
 * Represents a field with a scalar value.
 * @template V - The type of scalar value (string or number)
 */
export type ScalarField<V extends Scalar> = {
    value: V;
};

/**
 * Represents a field that references a column in a table.
 * @template K - The column name type
 * @template V - The type of scalar value (string or number)
 */
export type ColumnField<K extends string, V extends Scalar> = {
    column: K;
    _value?: V;
};

/**
 * Represents an aggregation operation on a field.
 * @template V - The type of scalar value (string or number) returned by the aggregation
 */
export type AggregateField<V extends Scalar> = {
    aggregation: 'COUNT' | 'COUNT_DISTINCT' | 'SUM' | 'AVERAGE' | 'MEDIAN' | 'MIN' | 'MAX';
    field: Field;
    _value?: V;
};

/**
 * Represents a mathematical operation between two fields.
 * @template V - The type of scalar value (string or number)
 */
export type OperationField<V extends Scalar> = {
    mathOperation: 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';
    left: Field<V>;
    right: Field<V>;
};

/**
 * Represents a field with an alias.
 * @template V - The type of scalar value (string or number)
 */
export type AliasField<V extends Scalar> = {
    alias: string;
    field: Field<V>;
};

/**
 * Union type representing any field in the query system.
 * @template V - The type of scalar value (string or number)
 */
export type Field<V extends Scalar = Scalar> =
    | ScalarField<V>
    | ColumnField<string, V>
    | AggregateField<V>
    | OperationField<V>
    | AliasField<V>;

/**
 * Represents a trend calculation on a field.
 * @template V - The type of scalar value (string or number)
 */
export type TrendField<V extends Scalar = Scalar> = {
    field: Field<V>;
    trend: 'DIFFERENCE' | 'RATIO' | 'RELATIVE_DIFFERENCE' | 'PREVIOUS_VALUE';
    outputName: string;
};

/**
 * Represents a condition for filtering data in queries.
 * Can be a simple field condition, comparison between fields, field-in-values condition,
 * or a complex logical condition combining multiple conditions with AND/OR.
 */
export type Condition =
    | {
          field: Field;
          operator: 'IS_NULL' | 'IS_NOT_NULL';
      }
    | {
          left: Field;
          right: Field;
          operator:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_OR_EQUALS'
              | 'LESS_THAN'
              | 'LESS_OR_EQUALS'
              | 'CONTAINS';
      }
    | {
          field: Field;
          values: Scalar[];
          operator: 'IN' | 'NOT_IN';
      }
    | {
          conditions: Condition[];
          operator: 'AND' | 'OR';
      };

/**
 * Represents sorting configuration for query results.
 */
export type SortBy = {
    field: Field;
    sortOrder: 'ASCENDING' | 'DESCENDING';
};

/**
 * Represents a complete data query configuration.
 */
export type Query = {
    fromTable: string;
    selectFields: Field[];
    selectTrendFields?: TrendField[];
    where?: Condition;
    groupBy?: Field[];
    having?: Condition;
    sortBy?: SortBy[];
    fromDate: string;
    toDate: string;
    previousFromDate?: string;
    previousToDate?: string;
    distinct?: boolean;
    timeZone?: string;
    perPage: number;
    page: number;
    includePaginationInfo?: boolean;
};

/**
 * Represents the response from a data query.
 * @template T - The type of records in the rows array
 */
export type QueryResponse<T = Record<string, Scalar>> = {
    fields: [
        {
            name: string;
            type: 'STRING' | 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'TIMESTAMP' | 'DATE';
        },
    ];
    rows: T[];

    pagination?: {
        page: number;
        perPage: number;
        totalPages: number;
        totalItems: number;
    };
};

/**
 * Represents the response from a batch query operation.
 */
export type BatchQueryResponse = {
    queryResponses: Array<{
        response: QueryResponse<Record<string, Scalar>>;
        errorInfo?: {
            errorCode: string;
            errorMessage: string;
        };
    }>;
};

/**
 * Data resource for querying organizational data.
 * Provides methods for building and executing queries against the data API.
 */
export default class Data extends Resource {
    /**
     * Creates a new Data resource.
     * @param api - The API instance for making authenticated requests
     * @param serverlessApi - The serverless API instance for making authenticated requests to serverless endpoints
     */
    constructor(api: API, serverlessApi: API) {
        super(api, serverlessApi);
    }

    /**
     * Creates a new query builder to construct data queries.
     * @param options - Configuration options for the query
     * @param options.fromTable - The table to query from
     * @param options.fromDate - The start date for the time range
     * @param options.toDate - The end date for the time range
     * @returns A QueryBuilder instance for building and executing the query
     */
    queryBuilder({fromTable, fromDate, toDate}: {fromTable: string; fromDate: Date | number; toDate: Date | number}) {
        return QueryBuilder.create(this).fromTable(fromTable).fromDate(fromDate).toDate(toDate);
    }

    /**
     * Executes a data query.
     * @template T - The expected return type of the query
     * @param query - The query to execute
     * @returns A promise resolving to the query response
     */
    async query<T = Record<string, Scalar>>(query: Query) {
        return await this.api.post<QueryResponse<T>>(`/rest/organizations/${API.orgPlaceholder}/data/v1/query`, query);
    }

    /**
     * Executes multiple queries in a batch.
     * @param queries - An array of queries to execute
     * @returns A promise resolving to the batch query response
     */
    async queries(queries: Query[]) {
        return await this.api.post<QueryResponse>(`/rest/organizations/${API.orgPlaceholder}/data/v1/queries`, queries);
    }
}
