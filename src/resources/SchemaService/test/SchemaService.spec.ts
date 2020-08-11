import API from '../../../APICore';
import SchemaService from '../SchemaService';
import {SchemaServiceQueryParams} from '../SchemaServiceInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SchemaService', () => {
    let schemaService: SchemaService;
    const api = new APIMock() as jest.Mocked<API>;
    const orgId = 'orgId';
    const sourceType = 'SERVICE_NOW';
    const params: SchemaServiceQueryParams = {
        clientId: 'ici',
        instanceId: 'sont',
        clientSecretGuid: 'les',
        oauthRefreshTokenGuid: 'params',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        schemaService = new SchemaService(api);
    });

    describe('getEntities', () => {
        it('should make a GET call to the specific SchemaService url with the good params', () => {
            schemaService.getEntities(orgId, sourceType, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${SchemaService.baseUrl}/organizations/${orgId}/schema/sources/${sourceType}/entities?clientId=${params.clientId}&instanceId=${params.instanceId}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`
            );
        });
    });

    describe('getFields', () => {
        it('should make a GET call to the specific SchemaService url with the good params', () => {
            const entityName = 'miaowouioui';
            schemaService.getFields(orgId, sourceType, entityName, params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${SchemaService.baseUrl}/organizations/${orgId}/schema/sources/${sourceType}/entity/${entityName}?clientId=${params.clientId}&instanceId=${params.instanceId}&clientSecretGuid=${params.clientSecretGuid}&oauthRefreshTokenGuid=${params.oauthRefreshTokenGuid}`
            );
        });
    });
});
