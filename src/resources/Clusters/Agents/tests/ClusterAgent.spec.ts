import API from '../../../../APICore';
import {ClusterNodeUpgradeDataModel} from '../../ClusterInterfaces';
import ClusterAgent from '../ClusterAgent';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('clusterAgent', () => {
    let clusterAgent: ClusterAgent;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const clusterId = '🦋';

    beforeEach(() => {
        jest.clearAllMocks();
        clusterAgent = new ClusterAgent(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ClusterAgent base url', () => {
            clusterAgent.list(clusterId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ClusterAgent.getBaseUrl(clusterId));
        });
    });

    describe('upgrade', () => {
        it('should make a PUT call to the upgrade cluster agent url', () => {
            const agentId = '👐';
            const data: ClusterNodeUpgradeDataModel = {componentName: 'butterfly', version: '1.2.3'};
            clusterAgent.upgrade(clusterId, agentId, data);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ClusterAgent.getBaseUrl(clusterId)}/${agentId}/upgrade`, data);
        });
    });
});
