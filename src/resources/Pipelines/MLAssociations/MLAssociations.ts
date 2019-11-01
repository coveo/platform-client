import API from '../../../APICore';
import Resource from '../../Resource';
import Pipelines from '../Pipelines';
import {
    AssociatedPipelinesData,
    AssociationsListModel,
    CreateAssociation,
    EditAssociation,
    ListAssociationsParams,
    MLAssociationModel,
} from './MLAssociationsInterfaces';

export default class MLAssociations extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/ml/model/associations`;

    list(pipelineId: string, options?: ListAssociationsParams) {
        return this.api.get<AssociationsListModel>(this.buildPath(MLAssociations.getBaseUrl(pipelineId), options));
    }

    associate(pipelineId: string, options: CreateAssociation) {
        return this.api.post(`${MLAssociations.getBaseUrl(pipelineId)}?organizationId=${API.orgPlaceholder}`, options);
    }

    getAssociation(pipelineId: string, associationId: string) {
        return this.api.get<MLAssociationModel>(
            `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}?organizationId=${API.orgPlaceholder}`
        );
    }

    disassociate(pipelineId: string, modelId: string, associationId: string) {
        return this.api.delete(
            `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}/${modelId}?organizationId=${API.orgPlaceholder}`
        );
    }

    updateAssociation(pipelineId: string, associationId: string, options?: EditAssociation) {
        return this.api.put(
            `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}?organizationId=${API.orgPlaceholder}`,
            options
        );
    }

    updatePosition(pipelineId: string, associationId: string, position: number) {
        return this.api.put(
            `${MLAssociations.getBaseUrl(pipelineId)}/${associationId}/position?position=${position}&organizationId=${
                API.orgPlaceholder
            }`,
            {}
        );
    }

    getAssociatedPipelines() {
        return this.api.get<AssociatedPipelinesData[]>(
            `${Pipelines.baseUrl}/ml/model/associations?organizationId=${API.orgPlaceholder}`
        );
    }
}
