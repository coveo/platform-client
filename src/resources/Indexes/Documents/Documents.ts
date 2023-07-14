import API from '../../../APICore.js';
import {
    DocumentPermissionForIdentityModel,
    DocumentPermissionModel,
    DocumentSecurityIdentityModel,
    SinglePermissionPageModel,
} from '../../index.js';
import Resource from '../../Resource.js';
import {ListEffectivePermissionsOptions} from './DocumentsInterfaces.js';

export default class Documents extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/indexes`;

    /**
     * Get the document permission model information for a security identity.
     *
     * @param {string} indexId The unique identifier of the target index.
     * @param {string} documentId The unique identifier of the item whose permissions to list.
     * @param {DocumentSecurityIdentityModel} the security identity for which we want the permissions from.
     *
     */
    getIdentityPermissions(indexId: string, documentId: string, identity: DocumentSecurityIdentityModel) {
        return this.api.post<DocumentPermissionForIdentityModel>(
            `${Documents.baseUrl}/${indexId}/documents/${encodeURIComponent(
                encodeURIComponent(documentId)
            )}/permissions/identity`,
            identity
        );
    }

    /**
     * Lists the [permissions](https://docs.coveo.com/en/223/glossary/permission) of an [item](https://docs.coveo.com/en/210/glossary/item) in a Coveo Cloud organization index.
     *
     * @param {string} indexId The unique identifier of the target index.
     * @param {string} documentId The unique identifier of the item whose permissions to list.
     *
     */
    listPermissions(indexId: string, documentId: string) {
        return this.api.get<DocumentPermissionModel>(
            `${Documents.baseUrl}/${indexId}/documents/${encodeURIComponent(
                encodeURIComponent(documentId)
            )}/permissions`
        );
    }

    /**
     * Lists the [effective permissions](https://docs.coveo.com/en/194/glossary/effective-permissions) of an [item](https://docs.coveo.com/en/210/glossary/item) in a Coveo Cloud organization index.
     *
     * @param {string} indexId The unique identifier of the target index.
     * @param {string} documentId The unique identifier of the item whose permissions to list.
     * @param {ListEffectivePermissionsOptions} options
     */
    listEffectivePermissions(indexId: string, documentId: string, options: ListEffectivePermissionsOptions = {}) {
        return this.api.get<SinglePermissionPageModel>(
            this.buildPath(
                `${Documents.baseUrl}/${indexId}/documents/${encodeURIComponent(
                    encodeURIComponent(documentId)
                )}/permissions/effective`,
                options
            )
        );
    }
}
