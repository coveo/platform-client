import {SourceModel, CreateSourceModel, CreateSourceOptions} from '../Sources/SourcesInterfaces';

export interface SimpleSchemaEntity {
    id: string;
    displayName: string;
}

export interface SimpleSchemaEntityMap {
    [index: string]: SimpleSchemaEntity;
}

export interface SchemaEntities {
    entities: SimpleSchemaEntityMap;
}

export interface SchemaEntityField {
    displayName: string;
    id: string;
    type: string;
    reference?: string;
}

export interface SchemaEntityFieldMap {
    [index: string]: SchemaEntityField;
}

export interface SchemaEntityFields {
    fieldCount: number;
    fields: SchemaEntityFieldMap;
}

export interface SchemaServiceQueryParams {
    oauthRefreshTokenGuid?: string;
    clientSecretGuid?: string;
    instanceUrl: string;
    clientId?: string;
    passwordGuid?: string;
    username?: string;
}

export interface OffsetOrLimit {
    offset?: number;
    limit?: number;
}

export interface GenericObjectField {
    name?: string;
}

export interface GenericObjectRelation {
    name?: string;
    fields?: string[];
    fromField?: string;
    toField?: string;
    toObject?: string;
}
export interface GenericObjectCondition {
    field?: string;
    operator?: string;
    type?: string;
    values?: string[];
}

export interface GenericObject {
    name?: string;
    conditions?: GenericObjectCondition[];
    fields?: GenericObjectField[];
    relations?: GenericObjectRelation[];
    attachment?: string;
    filter?: string;
}

export interface ObjectsToGet {
    objects?: GenericObject[];
}

export interface SchemaServiceSource extends SourceModel {
    objectsToGet?: ObjectsToGet;
}

export interface CreateSchemaSourceModel extends CreateSourceModel {
    objectsToGetConfiguration?: string;
}

export interface CreateSchemaSourceOptions extends CreateSourceOptions {}
