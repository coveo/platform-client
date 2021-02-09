import {SourceModel, CreateSourceModel, CreateSourceOptions} from '../Sources/SourcesInterfaces';

export interface SchemaEntities {
    entities?: SchemaEntity[];
}

export interface SchemaEntity {
    id?: string;
}

export interface SchemaFields {
    id: string;
    fields: SchemaField[];
    recordCount?: number;
}

export interface SchemaField {
    id?: string;
    type?: string;
}

export interface SchemaServiceQueryParams {
    oauthRefreshTokenGuid?: string;
    clientSecretGuid?: string;
    instanceUrl: string;
    clientId?: string;
    passwordGuid?: string;
    username?: string;
    offset?: number;
    limit?: number;
}

export interface ObjectsToGetField {
    name?: string;
}

export interface ObjectsToGetRelation {
    name?: string;
    fields?: string[];
    fromField?: string;
    toField?: string;
    toObject?: string;
}
export interface ObjectsToGetCondition {
    field?: string;
    operator?: string;
    type?: string;
    values?: string[];
}

export interface ObjectsToGetObject {
    name: string;
    conditions?: ObjectsToGetCondition[];
    fields?: ObjectsToGetField[];
    relations?: ObjectsToGetRelation[];
    attachment?: string;
    filter?: string;
}

export interface ObjectsToGet {
    objects?: ObjectsToGetObject[];
}

export interface SchemaServiceSource extends SourceModel {
    objectsToGet?: ObjectsToGet;
}

export interface CreateSchemaSourceModel extends CreateSourceModel {
    objectsToGetConfiguration?: string;
}

export interface CreateSchemaSourceOptions extends CreateSourceOptions {}
