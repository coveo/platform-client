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
    SchemaEntityFields,
    SimpleSchemaEntity,
    GetEntitiesQueryParams,
    GetEntityQueryParams,
    SlackTokenValidationResult,
} from './SchemaServiceInterfaces';
import {SourceType} from '../Enums';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/schema/sources`;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);
    }

    /**
     * Retrieve entities from the targeted instance
     * (can be matches of a given query)
     *
     * @param {SourceType} sourceType
     * @param {GetEntitiesQueryParams} [parameters]
     * @return {SchemaEntities} schemaEntities
     * @memberof SchemaService
     */
    getEntities(sourceType: SourceType, parameters?: GetEntitiesQueryParams) {
        return this.api.get<SchemaEntities>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities`, parameters)
        );
    }

    /**
     * Retrieve the entity of matching ID from the targeted instance
     *
     * @param {SourceType} sourceType
     * @param {string} entityId
     * @param {GetEntityQueryParams} [parameters]
     * @return {SimpleSchemaEntity} simpleSchemaEntity
     * @memberof SchemaService
     */
    getEntity(sourceType: SourceType, entityId: string, parameters?: GetEntityQueryParams) {
        return this.api.get<SimpleSchemaEntity>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities/${entityId}`, parameters)
        );
    }

    /**
     * Retrieve the fields of the given entity from the targeted instance
     *
     * @param {SourceType} sourceType
     * @param {string} entityId
     * @param {SchemaServiceQueryParams} [parameters]
     * @return {SchemaEntityFields} schemaEntityFields
     * @memberof SchemaService
     */
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

    /**
     * Retrieve the default objectsToGet of the given sourceType
     *
     * @param {string} sourceType
     * @return {ObjectsToGet} ObjectsToGet
     * @memberof SchemaService
     */
    getDefaultObjectsToGet(sourceType: string) {
        return this.api.get<ObjectsToGet>(`${SchemaService.baseUrl}/${sourceType}/defaultObjectsToGet`);
    }

    validateSlackToken(accessToken: string) {
        return this.api.post<SlackTokenValidationResult>(
            `${SchemaService.baseUrl}/SLACK/validateToken?accessToken=${accessToken}`
        );
    }
}
