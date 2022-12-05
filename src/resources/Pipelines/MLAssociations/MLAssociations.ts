import {PageModel} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {
    AssociatedPipelinesData,
    BulkGetAssociationsParams,
    CreateAssociation,
    EditAssociation,
    ListAssociationsParams,
    MLAssociationModel,
} from './MLAssociationsInterfaces';

export default class MLAssociations extends Resource {
    static getBaseUrl = (pipelineId: string) => `/rest/search/v2/admin/pipelines/${pipelineId}/ml/model/associations`;

    list(pipelineId: string, options?: ListAssociationsParams) {
        return this.api.get<PageModel<MLAssociationModel, 'rules'>>(
            this.buildPath(MLAssociations.getBaseUrl(pipelineId), {organizationId: this.api.organizationId, ...options})
        );
    }

    associate(pipelineId: string, options: CreateAssociation) {
        return this.api.post(
            this.buildPath(MLAssociations.getBaseUrl(pipelineId), {organizationId: this.api.organizationId}),
            options
        );
    }

    getAssociation(pipelineId: string, associationId: string) {
        return this.api.get<MLAssociationModel>(
            this.buildPath(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    disassociate(pipelineId: string, associationId: string) {
        return this.api.delete(
            this.buildPath(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`, {
                organizationId: this.api.organizationId,
            })
        );
    }

    updateAssociation(pipelineId: string, associationId: string, options?: EditAssociation) {
        return this.api.put(
            this.buildPath(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}`, {
                organizationId: this.api.organizationId,
            }),
            options
        );
    }

    updatePosition(pipelineId: string, associationId: string, position: number) {
        return this.api.put(
            this.buildPath(`${MLAssociations.getBaseUrl(pipelineId)}/${associationId}/position`, {
                position,
                organizationId: this.api.organizationId,
            }),
            {}
        );
    }

    getAssociatedPipelines() {
        return this.api.get<AssociatedPipelinesData[]>(
            this.buildPath('/rest/search/v2/admin/pipelines/ml/model/associations', {
                organizationId: this.api.organizationId,
            })
        );
    }

    bulkGet(pipelineId: string, {ids, ...allQueryStringOptions}: BulkGetAssociationsParams) {
        return this.api.post<PageModel<MLAssociationModel, 'rules'>>(
            this.buildPath(`${MLAssociations.getBaseUrl(pipelineId)}/bulkGet`, {
                organizationId: this.api.organizationId,
                ...allQueryStringOptions,
            }),
            {ids}
        );
    }
}
