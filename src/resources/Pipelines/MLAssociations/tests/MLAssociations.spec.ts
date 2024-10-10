import API from '../../../../APICore.js';
import MLAssociations from '../MLAssociations.js';

jest.mock('../../../../APICore.js');

describe('MLAssociations', () => {
    let associations: MLAssociations;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        associations = new MLAssociations(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific MLAssociations url', async () => {
            const pipelineId = 'diEnilEpip';

            await associations.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(MLAssociations.getBaseUrl(pipelineId));
        });
    });

    describe('associate', () => {
        it('should make a POST call to the specific MLAssociations url', async () => {
            const pipelineId = '-_-';
            const options = {modelId: '0_0'};

            await associations.associate(pipelineId, options);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${MLAssociations.getBaseUrl(pipelineId)}`, options);
        });
    });

    describe('getAssociation', () => {
        it('should make a GET call to the specific MLAssociations url', async () => {
            const pipelineId = '-W-';
            const associationId = 'OWO';

            await associations.getAssociation(pipelineId, associationId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`);
        });
    });

    describe('disassociate', () => {
        it('should make a DELETE call to the specific MLAssociations url', async () => {
            const pipelineId = '123';
            const associationId = '000';

            await associations.disassociate(pipelineId, associationId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`);
        });
    });

    describe('updateAssociation', () => {
        it('should make a PUT call to the specific MLAssociations url', async () => {
            const pipelineId = '999';
            const associationId = '111';
            const options = {exclusive: true};

            await associations.updateAssociation(pipelineId, associationId, options);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`, options);
        });
    });

    describe('updatePosition', () => {
        it('should make a PUT call to the specific MLAssociations url', async () => {
            const pipelineId = '222';
            const associationId = '888';
            const position = 6;

            await associations.updatePosition(pipelineId, associationId, position);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}/position?position=${position}`,
                {},
            );
        });
    });

    describe('getAssociatedPipelines', () => {
        it('should make a GET call to the specific MLAssociations url', async () => {
            await associations.getAssociatedPipelines();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/search/v2/admin/pipelines/ml/model/associations');
        });
    });

    describe('bulkGet', () => {
        it('should make a POST call to the specific Associations url', async () => {
            const pipelineId = '🏐';
            const ids = ['one', 'two', 'three'];
            const page = 3;
            const perPage = 10;

            await associations.bulkGet(pipelineId, {ids, page, perPage});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}/bulkGet?page=${page}&perPage=${perPage}`,
                {ids},
            );
        });
    });
});
