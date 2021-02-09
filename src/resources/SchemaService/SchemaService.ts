import API from '../../APICore';
import Ressource from '../Resource';
import {New} from '../BaseInterfaces';
import {
    SchemaEntities,
    SchemaServiceQueryParams,
    SchemaFields,
    SchemaServiceSource,
    CreateSchemaSourceModel,
    CreateSchemaSourceOptions,
    ObjectsToGet,
} from './SchemaServiceInterfaces';
import {SourceType} from '../Enums';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/schema/sources`;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);
    }

    getEntities(sourceType: SourceType, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaEntities>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities`, parameters)
        );
    }

    getFields(sourceType: SourceType, entityName, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaFields>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entity/${entityName}`, parameters)
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

    translateToSpecificObjectsToGet(sourceType: SourceType, genericObjectsToGet: ObjectsToGet,parameters?: SchemaServiceQueryParams){
        return this.api.post<any>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/translate/specific`, parameters),
            genericObjectsToGet,
        );
    }

    translateToGenericObjectsToGet(sourceType: SourceType, specificObjectsToGet: any, parameters?: SchemaServiceQueryParams) {
        return this.api.post<ObjectsToGet>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/translate/generic`, parameters),
            specificObjectsToGet,
        );
    }

    translateToSpecificObjectsToGetWithFields(sourceType: SourceType, genericObjectsToGet: ObjectsToGet, parameters?: SchemaServiceQueryParams) {
        return this.api.post<any>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/translate/specificWithFields`, parameters),
            genericObjectsToGet,
        );
    }
}
