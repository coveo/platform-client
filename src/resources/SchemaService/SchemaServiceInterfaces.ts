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
