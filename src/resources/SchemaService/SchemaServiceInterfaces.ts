import {SourceModel, CreateSourceModel, CreateSourceOptions} from '../Sources/SourcesInterfaces';

export interface SchemaEntities {
    entities?: SchemaEntity[];
}

export interface SchemaEntity {
    name?: string;
    displayName?: string;
    id?: string;
}

export interface SchemaFields {
    name?: string;
    id?: string;
    fields?: SchemaField[];
}

export interface SchemaField {
    name?: string;
    id?: string;
    coveoType?: string;
    reference?: string;
}

export interface SchemaServiceQueryParams {
    oauthRefreshTokenGuid?: string;
    clientSecretGuid?: string;
    instanceId: string;
    clientId?: string;
    passwordGuid?: string;
    username?: string;
}

export interface ObjectsToGetField {
    name: string;
}

export interface ObjectsToGetRelation {
    name: string;
    fields: string[];
    fromField: string;
    toField: string;
    toObject: string;
}
export interface ObjectsToGetCondition {
    field: string;
    operator: string;
    type: string;
    values: string[];
}

export interface ObjectsToGetObject {
    name: string;
    conditions: ObjectsToGetCondition[];
    fields: ObjectsToGetField[];
    relations: ObjectsToGetRelation[];
    attachment: string;
}

export interface ObjectsToGet {
    objects: ObjectsToGetObject[];
}

export interface SchemaServiceSource extends SourceModel {
    objectsToGet: ObjectsToGet;
}

export interface CreateSchemaSourceModel extends CreateSourceModel {}

export interface CreateSchemaSourceOptions extends CreateSourceOptions {}
