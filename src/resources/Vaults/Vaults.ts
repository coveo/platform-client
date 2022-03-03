import API from '../../APICore';
import Resource from '../Resource';
import {MissingVaultModel} from './VaultsInterfaces';

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
}
