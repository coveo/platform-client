import API from '../../APICore.js';
import {New} from '../BaseInterfaces.js';
import {SourceType} from '../Enums.js';
import Ressource from '../Resource.js';
import {
    CreateSchemaSourceModel,
    CreateSchemaSourceOptions,
    GetEntitiesQueryParams,
    GetEntityQueryParams,
    ObjectsToGet,
    SchemaEntities,
    SchemaEntityFields,
    SchemaServiceQueryParams,
    SchemaServiceSource,
    SimpleSchemaEntity,
    SlackTokenValidationResult,
} from './SchemaServiceInterfaces.js';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/schema/sources`;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);
    }

    /**
     * Retrieve entities from the targeted instance
     * (can be matches of a given query)
     * @param sourceType
     * @param [parameters]
     * @returns schemaEntities
     */
    getEntities(sourceType: SourceType, parameters?: GetEntitiesQueryParams) {
        return this.api.get<SchemaEntities>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities`, parameters),
        );
    }

    /**
     * Retrieve the entity of matching ID from the targeted instance
     * @param sourceType
     * @param entityId
     * @param [parameters]
     * @returns simpleSchemaEntity
     */
    getEntity(sourceType: SourceType, entityId: string, parameters?: GetEntityQueryParams) {
        return this.api.get<SimpleSchemaEntity>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities/${entityId}`, parameters),
        );
    }

    /**
     * Retrieve the fields of the given entity from the targeted instance
     * @param sourceType
     * @param entityId
     * @param [parameters]
     * @returns schemaEntityFields
     */
    getFields(sourceType: SourceType, entityId: string, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaEntityFields>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/entities/${entityId}/fields`, parameters),
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.api.post<any>(`${SchemaService.baseUrl}/${sourceType}/translate/specific`, genericObjectsToGet);
    }

    translateToSpecificObjectsToGetWithFields(
        sourceType: SourceType,
        genericObjectsToGet: ObjectsToGet,
        parameters?: SchemaServiceQueryParams,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.api.post<any>(
            this.buildPath(`${SchemaService.baseUrl}/${sourceType}/translate/specificWithFields`, parameters),
            genericObjectsToGet,
        );
    }

    translateToGenericObjectsToGet(sourceType: SourceType, specificObjectsToGet: Record<string, unknown>) {
        return this.api.post<ObjectsToGet>(
            `${SchemaService.baseUrl}/${sourceType}/translate/generic`,
            specificObjectsToGet,
        );
    }

    /**
     * Retrieve the default objectsToGet of the given sourceType
     * @param sourceType
     * @returns ObjectsToGet
     */
    getDefaultObjectsToGet(sourceType: string) {
        return this.api.get<ObjectsToGet>(`${SchemaService.baseUrl}/${sourceType}/defaultObjectsToGet`);
    }

    validateSlackToken(accessToken: string) {
        return this.api.post<SlackTokenValidationResult>(
            `${SchemaService.baseUrl}/SLACK/validateToken?accessToken=${accessToken}`,
        );
    }
}
