import API from '../../APICore.js';
import Resource from '../Resource.js';
import {
    SecurityIdentityAliasModel,
    SecurityIdentityBatchConfig,
    SecurityIdentityDelete,
    SecurityIdentityDeleteOptions,
    SecurityIdentityModel,
    SecurityIdentityOptions,
} from './PushApiInterfaces.js';

export default class PushApi extends Resource {
    static baseUrl = `/push/v1/organizations/${API.orgPlaceholder}/providers`;

    createOrUpdateSecurityIdentityAlias(
        securityProviderId: string,
        alias: SecurityIdentityAliasModel,
        options?: SecurityIdentityOptions,
    ) {
        return this.serverlessApi.put<void>(
            this.buildPath(`${PushApi.baseUrl}/${securityProviderId}/mappings`, options),
            alias,
        );
    }

    deleteSecurityIdentity(
        securityProviderId: string,
        securityIdentity: SecurityIdentityDelete,
        options?: SecurityIdentityOptions,
    ) {
        return this.serverlessApi.delete<void>(
            this.buildPath(`${PushApi.baseUrl}/${securityProviderId}/permissions`, options),
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
            this.buildPath(`${PushApi.baseUrl}/${securityProviderId}/permissions`, options),
            securityIdentity,
        );
    }

    manageSecurityIdentities(securityProviderId: string, batchConfig: SecurityIdentityBatchConfig) {
        return this.serverlessApi.put<void>(
            this.buildPath(`${PushApi.baseUrl}/${securityProviderId}/permissions/batch`, batchConfig),
        );
    }

    deleteOldSecurityIdentities(securityProviderId: string, batchDelete: SecurityIdentityDeleteOptions) {
        return this.serverlessApi.delete<void>(
            this.buildPath(`${PushApi.baseUrl}/${securityProviderId}/permissions/olderthan`, batchDelete),
        );
    }
}
