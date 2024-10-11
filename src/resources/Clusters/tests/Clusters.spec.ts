import API from '../../../APICore.js';
import Cluster from '../Cluster.js';

jest.mock('../../../APICore.js');

describe('Cluster', () => {
    let cluster: Cluster;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        cluster = new Cluster(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', async () => {
            await cluster.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Cluster.baseUrl);
        });
    });

    describe('listAgents', () => {
        it('should make a GET call to the cluster agents url', async () => {
            const clusterToGet = 'cluster-to-get';
            await cluster.listAgents(clusterToGet);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToGet}/agents`);
        });
    });

    describe('live', () => {
        it('should make a GET call to the live cluster url', async () => {
            await cluster.live();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/live`);
        });
    });

    describe('status', () => {
        it('should make a GET call to the status cluster url', async () => {
            const clusterToGet = 'cluster-to-get';
            await cluster.status(clusterToGet);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToGet}/status`);
        });
    });

    describe('synchronize', () => {
        it('should make a POST call to the live cluster url', async () => {
            const clusterToSync = 'cluster-to-sync';
            await cluster.synchronize(clusterToSync);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Cluster.baseUrl}/${clusterToSync}/synchronize`);
        });
    });
});
