import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import SchemaService from '../SchemaService.js';
import {SchemaServiceQueryParams, CreateSchemaSourceModel} from '../SchemaServiceInterfaces.js';
import {SourceType} from '../../Enums.js';

jest.mock('../../../APICore.js');

describe('SchemaService', () => {
    let schemaService: SchemaService;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const sourceType: SourceType = SourceType.SERVICENOW;
    const params: SchemaServiceQueryParams = {
        clientId: 'ici',
        instanceUrl: 'sont',
        clientSecretGuid: 'les',
        oauthRefreshTokenGuid: 'params',
    };
    const genericObjectsToGet = {
        objects: [
            {
                name: "I'm a good object",
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        schemaService = new SchemaService(api, serverlessApi);
    });

    describe('getEntities', () => {
        it('should make a GET call to the specific SchemaService url with the correct params', async () => {
            await schemaService.getEntities(sourceType, {
                ...params,
                offset: 100,
                limit: 100,
                query: 'toTheMoon',
                entityIds: 'sys_dictionary,sys_user',
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}/entities?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}&offset=100&limit=100&query=toTheMoon&entityIds=sys_dictionary%2Csys_user`,
            );
        });
    });

    describe('getEntity', () => {
        it('should make a GET call to the specific SchemaService url with the correct params', async () => {
            const entityId = '🆔';
            await schemaService.getEntity(sourceType, entityId, {...params, filter: 'filter'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}/entities/${entityId}?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}&filter=filter`,
            );
        });
    });

    describe('getFields', () => {
        it('should make a GET call to the specific SchemaService url with the correct params', async () => {
            const entityId = 'miaowouioui';
            await schemaService.getFields(sourceType, entityId, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}/entities/${entityId}/fields?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`,
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the SchemaSources base url', async () => {
            const sourceModel: New<CreateSchemaSourceModel> = {};

            await schemaService.create(sourceModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SchemaService.baseUrl, sourceModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific SchemaSources url', async () => {
            const sourceId = '🐱';

            await schemaService.delete(sourceId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific SchemaSources url', async () => {
            const sourceId = '😽';

            await schemaService.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SchemaSources url', async () => {
            const sourceId = '🙀';
            const sourceModel: CreateSchemaSourceModel = {};

            await schemaService.update(sourceId, sourceModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`, sourceModel);
        });
    });

    describe('translateToSpecificObjectsToGet', () => {
        it('should make a POST call to the specific SchemaSources url', async () => {
            await schemaService.translateToSpecificObjectsToGet(sourceType, genericObjectsToGet);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SchemaService.baseUrl}/${sourceType}/translate/specific`,
                genericObjectsToGet,
            );
        });
    });

    describe('translateToSpecificObjectsToGetWithFields', () => {
        it('should make a POST call to the specific SchemaSources url', async () => {
            await schemaService.translateToSpecificObjectsToGetWithFields(sourceType, genericObjectsToGet, params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SchemaService.baseUrl}/${sourceType}/translate/specificWithFields?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`,
                genericObjectsToGet,
            );
        });
    });

    describe('translateToGenericObjectsToGet', () => {
        it('should make a POST call to the specific SchemaSources url', async () => {
            await schemaService.translateToGenericObjectsToGet(sourceType, {toTheMoon: '🚀'});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceType}/translate/generic`, {
                toTheMoon: '🚀',
            });
        });
    });

    describe('getDefaultObjectsToGet', () => {
        it('should make a GET call to the specific SchemaSources url', async () => {
            await schemaService.getDefaultObjectsToGet(sourceType);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceType}/defaultObjectsToGet`);
        });
    });

    describe('validateSlackToken', () => {
        it('should make a POST call to the specific SchemaSources url', async () => {
            const someSlackToken = '🎄';
            await schemaService.validateSlackToken(someSlackToken);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SchemaService.baseUrl}/SLACK/validateToken?accessToken=${someSlackToken}`,
            );
        });
    });
});
