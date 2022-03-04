import API from '../../../APICore';
import Vaults from '../Vaults';

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
});
