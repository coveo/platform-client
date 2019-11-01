import API from '../../../../APICore';
import Pipelines from '../../Pipelines';
import MLAssociations from '../MLAssociations';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('MLAssociations', () => {
    let associations: MLAssociations;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        associations = new MLAssociations(api);
    });

    describe('list', () => {
        it('should make a GET call to the specific MLAssociations url', () => {
            const pipelineId = 'diEnilEpip';

            associations.list(pipelineId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(MLAssociations.getBaseUrl(pipelineId));
        });
    });

    describe('associate', () => {
        it('should make a POST call to the specific MLAssociations url', () => {
            const pipelineId = '-_-';
            const options = {
                modelId: 'mini-model',
            };

            associations.associate(pipelineId, options);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}?organizationId=${API.orgPlaceholder}`,
                options
            );
        });
    });

    describe('getAssociation', () => {
        it('should make a GET call to the specific MLAssociations url', () => {
            const pipelineId = '-W-';
            const associationId = 'OWO';

            associations.getAssociation(pipelineId, associationId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}?organizationId=${API.orgPlaceholder}`
            );
        });
    });

    describe('disassociate', () => {
        it('should make a DELETE call to the specific MLAssociations url', () => {
            const pipelineId = '123';
            const modelId = '321';
            const associationId = '000';

            associations.disassociate(pipelineId, modelId, associationId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}/${modelId}?organizationId=${
                    API.orgPlaceholder
                }`
            );
        });
    });

    describe('updateAssociation', () => {
        it('should make a PUT call to the specific MLAssociations url', () => {
            const pipelineId = '999';
            const associationId = '111';
            const options = {
                exclusive: true,
            };

            associations.updateAssociation(pipelineId, associationId, options);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}?organizationId=${API.orgPlaceholder}`,
                options
            );
        });
    });

    describe('updatePosition', () => {
        it('should make a PUT call to the specific MLAssociations url', () => {
            const pipelineId = '222';
            const associationId = '888';
            const position = 6;

            associations.updatePosition(pipelineId, associationId, position);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${MLAssociations.getBaseUrl(
                    pipelineId
                )}/${associationId}/position?position=${position}&organizationId=${API.orgPlaceholder}`,
                {}
            );
        });
    });

    describe('getAssociatedPipelines', () => {
        it('should make a GET call to the specific MLAssociations url', () => {
            associations.getAssociatedPipelines();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Pipelines.baseUrl}/ml/model/associations?organizationId=${API.orgPlaceholder}`
            );
        });
    });
});
