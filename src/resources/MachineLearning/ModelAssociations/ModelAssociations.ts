import API from '../../../APICore.js';
import {PageModel} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {AssociationItem, ModelAssociationsListParams} from './ModelAssociationsInterfaces.js';

export default class ModelAssociations extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/querypipelines`;

    /**
     * Lists the organization associations corresponding to the specified pipelineId.
     * @param pipelineId The unique identifier of the query pipeline.
     * @param params The pagination parameters.
     * @returns A list of associated models
     */
    list(pipelineId: string, params: ModelAssociationsListParams): Promise<PageModel<AssociationItem>> {
        return this.api.get(this.buildPath(`${ModelAssociations.baseUrl}/${pipelineId}/associations`, params));
    }
}
