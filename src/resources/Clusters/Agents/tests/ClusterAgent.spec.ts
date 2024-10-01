import API from '../../../../APICore.js';
import {ClusterNodeUpgradeDataModel} from '../../ClusterInterfaces.js';
import ClusterAgent from '../ClusterAgent.js';

jest.mock('../../../../APICore.js');

describe('clusterAgent', () => {
    let clusterAgent: ClusterAgent;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const clusterId = '🦋';

    beforeEach(() => {
        jest.clearAllMocks();
        clusterAgent = new ClusterAgent(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the ClusterAgent base url', async () => {
            await clusterAgent.list(clusterId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ClusterAgent.getBaseUrl(clusterId));
        });
    });

    describe('upgrade', () => {
        it('should make a PUT call to the upgrade cluster agent url', async () => {
            const agentId = '👐';
            const data: ClusterNodeUpgradeDataModel = {componentName: 'butterfly', version: '1.2.3'};
            await clusterAgent.upgrade(clusterId, agentId, data);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${ClusterAgent.getBaseUrl(clusterId)}/${agentId}/upgrade`, data);
        });
    });
});
