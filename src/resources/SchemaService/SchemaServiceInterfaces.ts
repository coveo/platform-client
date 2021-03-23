import {SourceModel, CreateSourceModel, CreateSourceOptions} from '../Sources/SourcesInterfaces';

export interface SimpleSchemaEntity {
    id: string;
    displayName: string;
    recordCount?: number;
}

export interface SchemaEntities {
    entities: Record<string, SimpleSchemaEntity>;
}

export interface SchemaEntityField {
    displayName: string;
    id: string;
    type: string;
    reference?: string;
}

export interface SchemaEntityFields {
    fieldsCount: number;
    fields: Record<string, SchemaEntityField>;
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

export interface Filter {
    filter?: string;
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
