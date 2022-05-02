import API from '../../APICore';
import {VaultFetchStrategy} from '../Enums';
import Resource from '../Resource';
import {MissingVaultModel, VaultEntryModel} from './VaultsInterfaces';

export default class Vaults extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/vaultentries`;

    /**
     * Find error vault keys for a given snapshot.
     *
     * @param {string} snapshotId The unique identifier of the target snapshot.
     *
     * @returns {MissingVaultModel}
     */
    findMissing(snapshotId: string) {
        return this.api.get<MissingVaultModel>(this.buildPath(`${Vaults.baseUrl}/missing`, {snapshotId}));
    }

    /**
     * Import vault entries from the starting organization into the current organization.
     *
     * @param {string} currentSnapshotId The unique identifier of the current snapshot.
     * @param {string} currentOrganizationId The unique identifier of the current organization.
     * @param {string} sourceOrganizationId The unique identifier of the source organization.
     * @param {VaultFetchStrategy} fetchStrategy Choosing the strategy to use when importing vault entries.
     */
    import(
        currentSnapshotId: string,
        currentOrganizationId: string,
        sourceOrganizationId: string,
        fetchStrategy: VaultFetchStrategy
    ) {
        return this.api.put(
            this.buildPath(`${Vaults.baseUrl}/fetch`, {
                referenceSnapshotId: currentSnapshotId,
                organizationId: currentOrganizationId,
                sourceOrganizationId,
                fetchStrategy,
            })
        );
    }

    /**
     * Create a vault entry.
     *
     * @param {VaultEntryModel} model Vault entry model
     */
    create(model: VaultEntryModel) {
        return this.api.post<VaultEntryModel>(Vaults.baseUrl, model);
    }
}
