import API from '../../../APICore.js';
import {SinglePermissionIdentityType} from '../../Enums.js';
import PushApi from '../PushApi.js';
import {FileContainer, SecurityIdentityAliasModel, SecurityIdentityOptions} from '../PushApiInterfaces.js';

jest.mock('../../../APICore.js');

describe('PushAPI', () => {
    let pushApi: PushApi;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
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

    describe('createFileContainer', () => {
        test.each([
            ['/push/v1/organizations/{organizationName}/files', undefined],
            ['/push/v1/organizations/{organizationName}/files', {}],
            [
                '/push/v1/organizations/{organizationName}/files?useVirtualHostedStyleUrl=true',
                {useVirtualHostedStyleUrl: true},
            ],
            [
                '/push/v1/organizations/{organizationName}/files?useVirtualHostedStyleUrl=false',
                {useVirtualHostedStyleUrl: false},
            ],
            ['/push/v1/organizations/{organizationName}/files', {useVirtualHostedStyleUrl: undefined}],
        ])('should make a POST call to %s when called with %o', async (url, options) => {
            (serverlessApi as jest.Mocked<API>).post.mockImplementation(() =>
                Promise.resolve<FileContainer>({
                    fileId: 'somefileid',
                    requiredHeaders: {a: 'b', c: 'd'},
                    uploadUri: 'https://something',
                }),
            );

            const fileContainer = await pushApi.createFileContainer(options);
            expect(fileContainer).toEqual({
                fileId: 'somefileid',
                requiredHeaders: {a: 'b', c: 'd'},
                uploadUri: 'https://something',
            });
            expect(serverlessApi.post).toHaveBeenCalledTimes(1);
            expect(serverlessApi.post).toHaveBeenCalledWith(url);
        });
    });

    describe('Security Identity', () => {
        describe('createOrUpdateSecurityIdentityAlias', () => {
            test.each([
                [`/push/v1/organizations/{organizationName}/providers/${securityProviderId}/mappings`, undefined],
                [
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/mappings?orderingId=1506700606240`,
                    securityProviderOptions,
                ],
            ])('should make a PUT call to "%s"', async (url, options) => {
                await pushApi.createOrUpdateSecurityIdentityAlias(securityProviderId, securityProviderAlias, options);
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
            ])('should make a DELETE call to "%s"', async (url, options) => {
                await pushApi.deleteSecurityIdentity(
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
            ])('should make a PUT call to "%s"', async (url, options) => {
                await pushApi.createOrUpdateSecurityIdentity(
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
            it('should make a PUT call to "/push/v1/organizations/{organizationName}/providers/{securityProviderId}/permissions/batch', async () => {
                await pushApi.manageSecurityIdentities(securityProviderId, {fileId: 'testId'});
                expect(serverlessApi.put).toHaveBeenCalledTimes(1);
                expect(serverlessApi.put).toHaveBeenCalledWith(
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions/batch?fileId=testId`,
                );
            });
        });

        describe('deleteOldSecurityIdentities', () => {
            it('should make a DELETE call to "/push/v1/organizations/{organizationName}/providers/{securityProviderId}/permissions/olderthan', async () => {
                await pushApi.deleteOldSecurityIdentities(securityProviderId, {orderingId: 123456789});
                expect(serverlessApi.delete).toHaveBeenCalledTimes(1);
                expect(serverlessApi.delete).toHaveBeenCalledWith(
                    `/push/v1/organizations/{organizationName}/providers/${securityProviderId}/permissions/olderthan?orderingId=123456789`,
                );
            });
        });
    });
});
