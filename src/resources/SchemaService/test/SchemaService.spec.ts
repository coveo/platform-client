import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import SchemaService from '../SchemaService';
import {SchemaServiceQueryParams, CreateSchemaSourceModel} from '../SchemaServiceInterfaces';
import {SourceType} from '../../Enums';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SchemaService', () => {
    let schemaService: SchemaService;
    const api = new APIMock() as jest.Mocked<API>;
    const sourceType: SourceType = SourceType.SERVICENOW;
    const params: SchemaServiceQueryParams = {
        clientId: 'ici',
        instanceUrl: 'sont',
        clientSecretGuid: 'les',
        oauthRefreshTokenGuid: 'params',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        schemaService = new SchemaService(api);
    });

    describe('getEntities', () => {
        it('should make a GET call to the specific SchemaService url with the good params', () => {
            schemaService.getEntities(sourceType, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}/entities?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`
            );
        });
    });

    describe('getFields', () => {
        it('should make a GET call to the specific SchemaService url with the good params', () => {
            const entityName = 'miaowouioui';
            schemaService.getFields(sourceType, entityName, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}/entity/${entityName}?clientId=${params.clientId}&instanceUrl=${params.instanceUrl}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the SchemaSources base url', () => {
            const sourceModel: New<CreateSchemaSourceModel> = {};

            schemaService.create(sourceModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SchemaService.baseUrl, sourceModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific SchemaSources url', () => {
            const sourceId = '🐱';

            schemaService.delete(sourceId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific SchemaSources url', () => {
            const sourceId = '😽';

            schemaService.get(sourceId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SchemaSources url', () => {
            const sourceId = '🙀';
            const sourceModel: CreateSchemaSourceModel = {};

            schemaService.update(sourceId, sourceModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SchemaService.baseUrl}/${sourceId}`, sourceModel);
        });
    });
});
