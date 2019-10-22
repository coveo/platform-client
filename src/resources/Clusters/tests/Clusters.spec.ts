import API from '../../../APICore';
import Cluster from '../Cluster';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Cluster', () => {
    let cluster: Cluster;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        cluster = new Cluster(api);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', () => {
            cluster.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Cluster.baseUrl);
        });
    });

    describe('listAgents', () => {
        it('should make a GET call to the cluster agents url', () => {
            const clusterToGet = 'cluster-to-get';
            cluster.listAgents(clusterToGet);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToGet}/agents`);
        });
    });

    describe('live', () => {
        it('should make a GET call to the live cluster url', () => {
            cluster.live();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/live`);
        });
    });

    describe('status', () => {
        it('should make a GET call to the status cluster url', () => {
            const clusterToGet = 'cluster-to-get';
            cluster.status(clusterToGet);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToGet}/status`);
        });
    });

    describe('synchronize', () => {
        it('should make a POST call to the live cluster url', () => {
            const clusterToSync = 'cluster-to-sync';
            cluster.synchronize(clusterToSync);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToSync}/synchronize`, {});
        });
    });
});
