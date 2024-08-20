import API from '../../APICore.js';
import {Paginated} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {DataServiceTrend} from './DataServiceFieldInterfaces.js';
import {
    DataServiceListTablesResponseModel,
    DataServiceExportQueryModel,
    DataServiceExportResponseModel,
    DataServiceQueryModel,
    DataServiceQueryResponseModel,
    DataServiceQueriesErrorResponseListItem,
    DataServiceQueriesResponseListItem,
    DataServiceQueriesResponseModelWithErrors,
    DataServiceQueriesResponseModel,
} from './DataServiceInterfaces.js';
import {DataServiceColumnType} from './DataServiceTableInterfaces.js';

export type DataServiceMapQueryResponseModel<
    CT extends readonly DataServiceColumnType[],
    TR extends readonly DataServiceTrend[],
> = DataServiceQueryResponseModel<[...CT, ...{[I in keyof TR]: 'FLOAT'}]>;

type DataServiceQueriesBodyBound = ReadonlyArray<
    Readonly<DataServiceQueryModel<readonly DataServiceColumnType[], readonly DataServiceTrend[]>>
>;

type DataServiceMapQueriesResponseModel<T extends DataServiceQueriesBodyBound> =
    DataServiceQueriesResponseModelWithErrors<{
        [I in keyof T]: T[I] extends DataServiceQueryModel<infer CT, infer TR>
            ? DataServiceMapQueryResponseModel<CT, TR>
            : DataServiceQueryModel;
    }>;

const isErrorResponseListItem = (
    subject: DataServiceQueriesResponseListItem,
): subject is DataServiceQueriesErrorResponseListItem => 'errorInfo' in subject;

const isSuccessResponse = <T extends readonly DataServiceQueryResponseModel[]>(
    response: DataServiceQueriesResponseModelWithErrors<T>,
): response is DataServiceQueriesResponseModel<T> => !response.queryResponses.some(isErrorResponseListItem);

export default class DataService extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/data/v1`;

    listTables(pagination?: Paginated, args?: RequestInit) {
        return this.api.get<DataServiceListTablesResponseModel>(
            super.buildPath(`${DataService.baseUrl}/tables`, pagination),
            args,
        );
    }

    query<CT extends readonly DataServiceColumnType[], TR extends readonly DataServiceTrend[]>(
        body: Readonly<DataServiceQueryModel<CT, TR>>,
        args?: RequestInit,
    ) {
        return this.api.post<DataServiceMapQueryResponseModel<CT, TR>>(
            super.buildPath(`${DataService.baseUrl}/query`),
            body,
            args,
        );
    }

    async queries<T extends DataServiceQueriesBodyBound>(body: [...T], args?: RequestInit) {
        const response = await this.api.post<DataServiceMapQueriesResponseModel<T>>(
            super.buildPath(`${DataService.baseUrl}/queries`),
            body,
            args,
        );

        // The queries endpoint may return errors among the responses, but dealing with that in the "success path" is akward.
        // So turn any errors into promise rejection
        if (isSuccessResponse(response)) {
            return response;
        }
        // Throw an Error, but also forward the queryResponses property on it.
        throw Object.defineProperty(
            new Error(
                response.queryResponses.reduce((message, listItem, index) => {
                    if (isErrorResponseListItem(listItem)) {
                        return message + `\n [${index}] ${listItem.errorInfo.errorCode}`;
                    }
                    return message;
                }, 'Queries encountered one or more errors:'),
            ),
            'queryResponses',
            {enumerable: true, value: response.queryResponses},
        );
    }

    export(body: Readonly<DataServiceExportQueryModel>, args?: RequestInit) {
        return this.api.post<DataServiceExportResponseModel>(
            super.buildPath(`${DataService.baseUrl}/export`),
            body,
            args,
        );
    }
}
