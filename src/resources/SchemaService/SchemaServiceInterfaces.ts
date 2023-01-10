import {SourceModel, CreateSourceModel, CreateSourceOptions} from '../Sources/SourcesInterfaces.js';

export interface SimpleSchemaEntity {
    /**
     * The id of the entity
     * (equivalent to ServiceNow Name column)
     */
    id: string;
    /**
     * The name to be displayed of the entity
     * (equivalent to ServiceNow Label column)
     */
    displayName: string;
    /**
     * The number of records that this entity represents
     * This can be based on the filter sent to the schema-service
     */
    recordCount?: number;
}

export interface SchemaEntities {
    /**
     * A Record containing SimpleSchemaEntities, indexed by their id
     */
    entities: Record<string, SimpleSchemaEntity>;
    /**
     * The number of entities contained in the query ServiceNow instance
     */
    entitiesCount?: number;
}

export interface SchemaEntityField {
    /**
     * The id of the field
     * (equivalent to the ServiceNow Label column)
     */
    id: string;
    /**
     * The name to be displayed of the field
     * (equivalent to ServiceNow Label column)
     */
    displayName: string;
    /**
     * The Coveo type of the field
     */
    type: string;
    /**
     * The id of the entity this field references
     */
    reference?: string;
    /**
     * Marks fields indexed by default by the connector
     */
    isAlwaysIndexed?: boolean;
}

export interface SchemaEntityFields {
    /**
     * A Record containing SchemaEntityFields, indexed by their id
     */
    fields: Record<string, SchemaEntityField>;
    /**
     * The number of fields contained in the given entity
     */
    fieldsCount: number;
}

export interface SchemaServiceQueryParams {
    instanceUrl: string;
    username?: string;
    passwordGuid?: string;
    clientId?: string;
    clientSecretGuid?: string;
    oauthRefreshTokenGuid?: string;
}

export interface GetEntitiesQueryParams extends SchemaServiceQueryParams {
    /**
     * The offset from which to start retrieving entities
     * (used for server-side pagination)
     */
    offset?: number;
    /**
     * The number of entities to fetch
     * (used for server-side pagination)
     */
    limit?: number;
    /**
     * A query to fetch matching entity names and ids
     */
    query?: string;
    /**
     * IDs of the entities to retrieve, as a comma-separated list
     */
    entityIds?: string;
}

export interface GetEntityQueryParams extends SchemaServiceQueryParams {
    /**
     * A filter used to fetch the correct amount of records
     */
    filter?: string;
}

/**
 * The object fields to be indexed
 */
export interface GenericObjectField {
    name?: string;
}

/**
 * The fields from other objects that have a junction relation to this one
 */
export interface GenericObjectRelation {
    name?: string;
    fields?: string[];
    fromField?: string;
    toField?: string;
    toObject?: string;
}

/**
 * The conditions that must be satisfied in order for the object to be indexed
 */
export interface GenericObjectCondition {
    field?: string;
    operator?: string;
    type?: string;
    values?: string[];
}

/**
 * The generic format for a source's entity/object/table
 */
export interface GenericObject {
    name?: string;
    conditions?: GenericObjectCondition[];
    fields?: GenericObjectField[];
    relations?: GenericObjectRelation[];
    /**
     * The attachment field name
     */
    attachment?: string;
    /**
     * The filter applied to the records of the object
     */
    filter?: string;
}

export interface ObjectsToGet {
    /**
     * The list of objects/entities/tables to be indexed
     */
    objects?: GenericObject[];
}

export interface SchemaServiceSource extends SourceModel {
    objectsToGet?: ObjectsToGet;
}

export interface CreateSchemaSourceModel extends CreateSourceModel {
    /**
     * A stringified version of the objectsToGet of a source
     */
    objectsToGetConfiguration?: string;
}

export interface CreateSchemaSourceOptions extends CreateSourceOptions {}

/**
 * Wraps whether or not a Slack token can validly be used with a Slack source
 */
export interface SlackTokenValidationResult {
    valid: boolean;
    workspace?: string;
    reason?: string;
}
