import API from '../../../APICore.js';
import Vaults from '../Vaults.js';
import {VaultFetchStrategy} from '../../Enums.js';
import {VaultEntryModel} from '../VaultsInterfaces.js';

jest.mock('../../../APICore.js');

describe('Vaults', () => {
    let vaults: Vaults;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        vaults = new Vaults(api, serverlessApi);
    });

    describe('findMissing', () => {
        it('should make a GET call to the specific Vaults url', async () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            await vaults.findMissing(snapshotToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Vaults.baseUrl}/missing?snapshotId=${snapshotToGetId}`);
        });
    });

    describe('import', () => {
        it('should make a PUT call to the specific Vaults url', async () => {
            const currentSnaphostId = 'current-snapshot-id';
            const sourceOrganizationId = 'source-organization-id';

            await vaults.import(currentSnaphostId, sourceOrganizationId, VaultFetchStrategy.overwrite);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Vaults.baseUrl}/fetch?referenceSnapshotId=${currentSnaphostId}&sourceOrganizationId=${sourceOrganizationId}&fetchStrategy=${VaultFetchStrategy.overwrite}`,
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific Vaults url', async () => {
            const vaultEntryModel: VaultEntryModel = {};
            await vaults.create(vaultEntryModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Vaults.baseUrl, vaultEntryModel);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Vaults url', async () => {
            await vaults.list({page: 2, perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Vaults.baseUrl}?page=2&pageSize=10`);
        });
    });
});
