import {PageModel} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {ConditionModel, ListConditionsOptions, NewConditionModel} from './ConditionInterfaces.js';

export default class Condition extends Resource {
    static baseUrl = `/rest/search/v1/admin/pipelines/statements`;

    /**
     * Returns a paginated list of condition models.
     *
     * @param {ListConditionsOptions} options
     */
    list(options: ListConditionsOptions = {}) {
        return this.api.get<PageModel<ConditionModel, 'statements'>>(
            this.buildPath(Condition.baseUrl, {feature: 'when', organizationId: this.api.organizationId, ...options}),
        );
    }

    /**
     * Creates and returns a new condition model.
     *
     * @param {NewConditionModel} conditionModel
     */
    create(conditionModel: NewConditionModel) {
        return this.api.post<ConditionModel>(
            this.buildPath(Condition.baseUrl, {organizationId: this.api.organizationId}),
            conditionModel,
        );
    }

    /**
     * Delete a condition model.
     *
     * @param {string} conditionId The unique identifier of the condition to be deleted.
     */
    delete(conditionId: string) {
        return this.api.delete(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId}),
        );
    }

    /**
     * Returns a condition model.
     *
     * @param {string} conditionId The unique identifier of the condition to be fetched.
     */
    get(conditionId: string) {
        return this.api.get<ConditionModel>(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId}),
        );
    }

    /**
     * Update a condition model with the model sent and returns the updated condition model.
     *
     * @param {string} conditionId The unique identifier of the condition to be updated.
     * @param {ConditionModel | NewConditionModel} conditionModel
     */
    update(conditionId: string, conditionModel: ConditionModel | NewConditionModel) {
        return this.api.put<ConditionModel>(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId}),
            conditionModel,
        );
    }

    /**
     * Bulk get a list of conditions corresponding of the ids sent.
     *
     * @param {string[]} conditionIds The list of condition's ids to be fetched. Limit of 1000 incoming ids.
     * @param {ListConditionsOptions} params
     */

    bulkGet(conditionIds: string[], params: ListConditionsOptions = {}) {
        return this.api.post<PageModel<ConditionModel, 'statements'>>(
            this.buildPath(`${Condition.baseUrl}/bulkGet`, {
                organizationId: this.api.organizationId,
                ...params,
            }),
            {
                ids: conditionIds,
            },
        );
    }
}
