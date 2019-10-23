import API from '../../../../APICore';
import {ClusterNodeUpgradeDataModel} from '../../ClusterInterfaces';
import ClusterNode from '../ClusterNode';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('clusterNode', () => {
    let clusterNode: ClusterNode;
    const api = new APIMock() as jest.Mocked<API>;
    const clusterId = 'cluster-id';

    beforeEach(() => {
        jest.clearAllMocks();
        clusterNode = new ClusterNode(api);
    });

    describe('list', () => {
        it('should make a GET call to the ClusterNode base url', () => {
            clusterNode.list(clusterId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ClusterNode.getBaseUrl(clusterId));
        });
    });

    describe('listUpgrades', () => {
        it('should make a GET call to the ClusterNode upgrades url', () => {
            const nodeId = 'expected-node-id';
            clusterNode.listUpgrades(clusterId, nodeId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/upgrades`);
        });
    });

    describe('start', () => {
        it('should make a POST call to the ClusterNode start url', () => {
            const nodeId = 'expected-node-id';
            clusterNode.start(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/start`);
        });
    });

    describe('stop', () => {
        it('should make a POST call to the ClusterNode stop url', () => {
            const nodeId = 'expected-node-id';
            clusterNode.stop(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/stop`);
        });
    });

    describe('dumps', () => {
        it('should make a POST call to the ClusterNode dumps url', () => {
            const nodeId = 'expected-node-id';
            clusterNode.dump(clusterId, nodeId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/dumps`);
        });
    });

    describe('upgrade', () => {
        it('should make a PUT call to the upgrade cluster agent url', () => {
            const nodeId = 'expected-node-id';
            const data: ClusterNodeUpgradeDataModel = {componentName: 'butterfly', version: '1.2.3'};
            clusterNode.upgrade(clusterId, nodeId, data);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ClusterNode.getBaseUrl(clusterId)}/${nodeId}/upgrades`, data);
        });
    });
});
