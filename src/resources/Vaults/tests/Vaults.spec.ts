import API from '../../../APICore';
import Vaults from '../Vaults';
import {VaultFetchStrategy} from '../../Enums';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Vaults', () => {
    let vaults: Vaults;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        vaults = new Vaults(api, serverlessApi);
    });

    describe('findMissing', () => {
        it('should make a GET call to the specific Vaults url', () => {
            const snapshotToGetId = 'snapshot-to-be-fetched';

            vaults.findMissing(snapshotToGetId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Vaults.baseUrl}/missing?snapshotId=${snapshotToGetId}`);
        });
    });

    describe('import', () => {
        it('should make a PUT call to the specific Vaults url', () => {
            const currentSnaphostId = 'current-snapshot-id';
            const currentOrganizationId = 'current-organization-id';
            const sourceOrganizationId = 'source-organization-id';

            vaults.import(currentSnaphostId, currentOrganizationId, sourceOrganizationId, VaultFetchStrategy.overwrite);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Vaults.baseUrl}/fetch?referenceSnapshotId=${currentSnaphostId}&organizationId=${currentOrganizationId}&sourceOrganizationId=${sourceOrganizationId}&fetchStrategy=${VaultFetchStrategy.overwrite}`
            );
        });
    });
});
