import API from '../../../../APICore.js';
import {ClusterNodeUpgradeDataModel} from '../../ClusterInterfaces.js';
import ClusterNode from '../ClusterNode.js';

jest.mock('../../../../APICore.js');

describe('clusterNode', () => {
    let clusterNode: ClusterNode;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const clusterId = 'cluster-id';

    beforeEach(() => {
        jest.clearAllMocks();
        clusterNode = new ClusterNode(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ClusterNode base url', async () => {
            await clusterNode.list(clusterId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ClusterNode.getBaseUrl(clusterId));
        });
    });

    describe('listUpgrades', () => {
        it('should make a GET call to the ClusterNode upgrades url', async () => {
            const nodeId = 'expected-node-id';
            await clusterNode.listUpgrades(clusterId, nodeId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/upgrades`);
        });
    });

    describe('start', () => {
        it('should make a POST call to the ClusterNode start url', async () => {
            const nodeId = 'expected-node-id';
            await clusterNode.start(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/start`);
        });
    });

    describe('stop', () => {
        it('should make a POST call to the ClusterNode stop url', async () => {
            const nodeId = 'expected-node-id';
            await clusterNode.stop(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/stop`);
        });
    });

    describe('dumps', () => {
        it('should make a POST call to the ClusterNode dumps url', async () => {
            const nodeId = 'expected-node-id';
            await clusterNode.dump(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/dumps`);
        });
    });

    describe('upgrade', () => {
        it('should make a PUT call to the upgrade cluster agent url', async () => {
            const nodeId = 'expected-node-id';
            const data: ClusterNodeUpgradeDataModel = {componentName: 'butterfly', version: '1.2.3'};
            await clusterNode.upgrade(clusterId, nodeId, data);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/upgrade`, data);
        });
    });
});
