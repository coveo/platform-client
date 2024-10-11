import API from '../../APICore.js';
import {normalizePaginatedOptions} from '../../utils/normalizePaginatedOptions.js';
import {PageModel} from '../BaseInterfaces.js';
import {VaultFetchStrategy} from '../Enums.js';
import Resource from '../Resource.js';
import {MissingVaultModel, VaultEntryListOptions, VaultEntryModel} from './VaultsInterfaces.js';

export default class Vaults extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/vaultentries`;

    /**
     * Find error vault keys for a given snapshot.
     * @param snapshotId The unique identifier of the target snapshot.
     */
    findMissing(snapshotId: string) {
        return this.api.get<MissingVaultModel>(this.buildPath(`${Vaults.baseUrl}/missing`, {snapshotId}));
    }

    /**
     * Import vault entries from the starting organization into the current organization.
     * @param currentSnapshotId The unique identifier of the current snapshot.
     * @param sourceOrganizationId The unique identifier of the source organization.
     * @param fetchStrategy Choosing the strategy to use when importing vault entries.
     */
    import(currentSnapshotId: string, sourceOrganizationId: string, fetchStrategy: VaultFetchStrategy) {
        return this.api.put(
            this.buildPath(`${Vaults.baseUrl}/fetch`, {
                referenceSnapshotId: currentSnapshotId,
                sourceOrganizationId,
                fetchStrategy,
            }),
        );
    }

    /**
     * Create a vault entry.
     * @param model Vault entry model
     */
    create(model: VaultEntryModel) {
        return this.api.post<VaultEntryModel>(Vaults.baseUrl, model);
    }

    /**
     * Get all vault entries for an organization.
     * @param options pagination options
     */
    list(options?: VaultEntryListOptions) {
        const normalizedOptions = normalizePaginatedOptions(options);
        return this.api.get<PageModel<VaultEntryModel>>(this.buildPath(Vaults.baseUrl, normalizedOptions));
    }
}
