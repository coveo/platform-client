import API from '../../APICore';
import Ressource from '../Resource';
import {New} from '../BaseInterfaces';
import {
    SchemaEntities,
    SchemaServiceQueryParams,
    SchemaServiceSource,
    CreateSchemaSourceModel,
    CreateSchemaSourceOptions,
    ObjectsToGet,
    OffsetOrLimit,
    Filter,
    SchemaEntityFields,
    SimpleSchemaEntity,
} from './SchemaServiceInterfaces';
import {SourceType} from '../Enums';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/schema/sources`;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);
    }

    getEntities(sourceType: SourceType, parameters?: SchemaServiceQueryParams & OffsetOrLimit) {
        return this.api.get<SchemaEntities>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities`, parameters)
        );
    }

    getEntity(sourceType: SourceType, entityId: string, parameters?: SchemaServiceQueryParams & Filter) {
        return this.api.get<SimpleSchemaEntity>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities/${entityId}`, parameters)
        );
    }

    getFields(sourceType: SourceType, entityId: string, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaEntityFields>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities/${entityId}/fields`, parameters)
        );
    }

    delete(sourceId: string) {
        return this.api.delete(`${SchemaService.baseUrl}/${sourceId}`);
    }

    get(sourceId: string) {
        return this.api.get<SchemaServiceSource>(`${SchemaService.baseUrl}/${sourceId}`);
    }

    update(sourceId: string, source: CreateSchemaSourceModel, options?: CreateSchemaSourceOptions) {
        return this.api.put<{id: string}>(this.buildPath(`${SchemaService.baseUrl}/${sourceId}`, options), source);
    }

    create(source: New<CreateSchemaSourceModel, 'resourceId'>, options?: CreateSchemaSourceOptions) {
        return this.api.post<{id: string}>(this.buildPath(SchemaService.baseUrl, options), source);
    }

    translateToSpecificObjectsToGet(sourceType: SourceType, genericObjectsToGet: ObjectsToGet) {
        return this.api.post<any>(`${SchemaService.baseUrl}/${sourceType}/translate/specific`, genericObjectsToGet);
    }

    translateToSpecificObjectsToGetWithFields(
        sourceType: SourceType,
        genericObjectsToGet: ObjectsToGet,
        parameters?: SchemaServiceQueryParams
    ) {
        return this.api.post<any>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/translate/specificWithFields`, parameters),
            genericObjectsToGet
        );
    }

    translateToGenericObjectsToGet(sourceType: SourceType, specificObjectsToGet: any) {
        return this.api.post<ObjectsToGet>(
            `${SchemaService.baseUrl}/${sourceType}/translate/generic`,
            specificObjectsToGet
        );
    }

    getDefaultObjectsToGet(sourceType: string) {
        return this.api.get<ObjectsToGet>(`${SchemaService.baseUrl}/${sourceType}/defaultObjectsToGet`);
    }
}
