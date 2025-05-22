import API from '../../APICore.js';
import Resource from '../Resource.js';
import {QueryBuilder} from './QueryBuilder.js';

export type Scalar = string | number;

export type ScalarField<V extends Scalar> = {
    value: V;
};

export type ColumnField<K extends string, V extends Scalar> = {
    column: K;
    _value?: V;
};

export type AggregateField<V extends Scalar> = {
    aggregation: 'COUNT' | 'COUNT_DISTINCT' | 'SUM' | 'AVERAGE' | 'MEDIAN' | 'MIN' | 'MAX';
    field: Field;
    _value?: V;
};

export type OperationField<V extends Scalar> = {
    mathOperation: 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';
    left: Field<V>;
    right: Field<V>;
};

export type AliasField<V extends Scalar> = {
    alias: string;
    field: Field<V>;
};

export type Field<V extends Scalar = Scalar> =
    | ScalarField<V>
    | ColumnField<string, V>
    | AggregateField<V>
    | OperationField<V>
    | AliasField<V>;

export type TrendField<V extends Scalar = Scalar> = {
    field: Field<V>;
    trend: 'DIFFERENCE' | 'RATIO' | 'RELATIVE_DIFFERENCE' | 'PREVIOUS_VALUE';
    outputName: string;
};

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

export type SortBy = {
    field: Field;
    sortOrder: 'ASCENDING' | 'DESCENDING';
};

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

export type BatchQueryResponse = {
    queryResponses: Array<{
        response: QueryResponse<Record<string, Scalar>>;
        errorInfo?: {
            errorCode: string;
            errorMessage: string;
        };
    }>;
};

export default class Data extends Resource {
    constructor(api: API, serverlessApi: API) {
        super(api, serverlessApi);
    }

    queryBuilder({fromTable, fromDate, toDate}: {fromTable: string; fromDate: Date | number; toDate: Date | number}) {
        return QueryBuilder.create(this).fromTable(fromTable).fromDate(fromDate).toDate(toDate);
    }

    async query<T = Record<string, Scalar>>(query: Query) {
        return await this.api.post<QueryResponse<T>>(
            `/rest/organizations/${this.api.organizationId}/data/v1/query`,
            query,
        );
    }

    async queries(queries: Query[]) {
        return await this.api.post<QueryResponse>(
            `/rest/organizations/${this.api.organizationId}/data/v1/queries`,
            queries,
        );
    }
}
