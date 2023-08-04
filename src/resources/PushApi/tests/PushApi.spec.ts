import API from '../../../APICore.js';
import {SinglePermissionIdentityType} from '../../Enums.js';
import PushApi from '../PushApi.js';
import {SecurityIdentityAliasModel, SecurityIdentityOptions} from '../PushApiInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('PushAPI', () => {
    let pushApi: PushApi;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const securityProviderId = 'testId';
    const securityProviderOptions: SecurityIdentityOptions = {orderingId: 1506700606240};
    const securityProviderAlias: SecurityIdentityAliasModel = {
        mappings: {
            additionalInfo: {},
            name: 'MyAlias',
            provider: 'Provider',
            type: SinglePermissionIdentityType.GROUP,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        pushApi = new PushApi(api, serverlessApi);
    });

    describe('Security Identity', () => {
        describe('createOrUpdateSecurityIdentityAlias', () => {
            test.each([
                [`/push/v1/organizations/{organizationName}/providers/${securityProviderId}/mappings`, undefined],
                [
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/mappings?orderingId=1506700606240`,
                    securityProviderOptions,
                ],
            ])('should make a PUT call to "%s"', (url, options) => {
                pushApi.createOrUpdateSecurityIdentityAlias(securityProviderId, securityProviderAlias, options);
                expect(serverlessApi.put).toHaveBeenCalledTimes(1);
                expect(serverlessApi.put).toHaveBeenCalledWith(url, {
                    mappings: {additionalInfo: {}, name: 'MyAlias', provider: 'Provider', type: 'GROUP'},
                });
            });
        });

        describe('deleteSecurityIdentity', () => {
            test.each([
                [`/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions`, undefined],
                [
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions?orderingId=1506700606240`,
                    securityProviderOptions,
                ],
            ])('should make a DELETE call to "%s"', (url, options) => {
                pushApi.deleteSecurityIdentity(
                    securityProviderId,
                    {
                        identity: {
                            name: 'Test Identity',
                            additionalInfo: {},
                            type: SinglePermissionIdentityType.GROUP,
                        },
                    },
                    options,
                );

                expect(serverlessApi.delete).toHaveBeenCalledTimes(1);
                expect(serverlessApi.delete).toHaveBeenCalledWith(url, {
                    body: '{"identity":{"name":"Test Identity","additionalInfo":{},"type":"GROUP"}}',
                    headers: {'Content-Type': 'application/json'},
                });
            });
        });

        describe('createOrUpdateSecurityIdentity', () => {
            test.each([
                [`/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions`, undefined],
                [
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions?orderingId=1506700606240`,
                    securityProviderOptions,
                ],
            ])('should make a PUT call to "%s"', (url, options) => {
                pushApi.createOrUpdateSecurityIdentity(
                    securityProviderId,
                    {
                        identity: {
                            name: 'Test Identity',
                            additionalInfo: {},
                            type: SinglePermissionIdentityType.GROUP,
                        },
                    },
                    options,
                );

                expect(serverlessApi.put).toHaveBeenCalledTimes(1);
                expect(serverlessApi.put).toHaveBeenCalledWith(url, {
                    identity: {additionalInfo: {}, name: 'Test Identity', type: 'GROUP'},
                });
            });
        });

        describe('manageSecurityIdentities', () => {
            it('should make a PUT call to "/push/v1/organizations/{organizationName}/providers/{securityProviderId}/permissions/batch', () => {
                pushApi.manageSecurityIdentities(securityProviderId, {fileId: 'testId'});
                expect(serverlessApi.put).toHaveBeenCalledTimes(1);
                expect(serverlessApi.put).toHaveBeenCalledWith(
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions/batch?fileId=testId`,
                );
            });
        });

        describe('deleteOldSecurityIdentities', () => {
            it('should make a DELETE call to "/push/v1/organizations/{organizationName}/providers/{securityProviderId}/permissions/olderthan', () => {
                pushApi.deleteOldSecurityIdentities(securityProviderId, {orderingId: 123456789});
                expect(serverlessApi.delete).toHaveBeenCalledTimes(1);
                expect(serverlessApi.delete).toHaveBeenCalledWith(
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions/olderthan?orderingId=123456789`,
                );
            });
        });
    });
});
