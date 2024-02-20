import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    FileContainer,
    FileContainerOptions,
    SecurityIdentityAliasModel,
    SecurityIdentityBatchConfig,
    SecurityIdentityDelete,
    SecurityIdentityDeleteOptions,
    SecurityIdentityModel,
    SecurityIdentityOptions,
} from './PushApiInterfaces.js';

export default class PushApi extends Resource {
    static baseUrl = `/push/v1/organizations/${API.orgPlaceholder}`;

    createFileContainer(options?: FileContainerOptions) {
        return this.serverlessApi.post<FileContainer>(this.buildPath(`${PushApi.baseUrl}/files`, options));
    }

    createOrUpdateSecurityIdentityAlias(
        securityProviderId: string,
        alias: SecurityIdentityAliasModel,
        options?: SecurityIdentityOptions,
    ) {
        return this.serverlessApi.put<void>(
            this.buildPath(`${PushApi.baseUrl}/providers/${securityProviderId}/mappings`, options),
            alias,
        );
    }

    deleteSecurityIdentity(
        securityProviderId: string,
        securityIdentity: SecurityIdentityDelete,
        options?: SecurityIdentityOptions,
    ) {
        return this.serverlessApi.delete<void>(
            this.buildPath(`${PushApi.baseUrl}/providers/${securityProviderId}/permissions`, options),
            {
                body: JSON.stringify(securityIdentity),
                headers: {'Content-Type': 'application/json'},
            },
        );
    }

    createOrUpdateSecurityIdentity(
        securityProviderId: string,
        securityIdentity: SecurityIdentityModel,
        options?: SecurityIdentityOptions,
    ) {
        return this.serverlessApi.put<void>(
            this.buildPath(`${PushApi.baseUrl}/providers/${securityProviderId}/permissions`, options),
            securityIdentity,
        );
    }

    manageSecurityIdentities(securityProviderId: string, batchConfig: SecurityIdentityBatchConfig) {
        return this.serverlessApi.put<void>(
            this.buildPath(`${PushApi.baseUrl}/providers/${securityProviderId}/permissions/batch`, batchConfig),
        );
    }

    deleteOldSecurityIdentities(securityProviderId: string, batchDelete: SecurityIdentityDeleteOptions) {
        return this.serverlessApi.delete<void>(
            this.buildPath(`${PushApi.baseUrl}/providers/${securityProviderId}/permissions/olderthan`, batchDelete),
        );
    }
}
