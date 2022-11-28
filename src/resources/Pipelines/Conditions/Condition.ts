import {PageModel} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {ConditionModel, ListConditionsOptions, NewConditionModel} from './ConditionInterfaces';

export default class Condition extends Resource {
    static baseUrl = `/rest/search/v1/admin/pipelines/statements`;

    list(options: ListConditionsOptions = {}) {
        return this.api.get<PageModel<ConditionModel, 'statements'>>(
            this.buildPath(Condition.baseUrl, {feature: 'when', organizationId: this.api.organizationId, ...options})
        );
    }

    create(conditionModel: NewConditionModel) {
        return this.api.post<ConditionModel>(
            this.buildPath(Condition.baseUrl, {organizationId: this.api.organizationId}),
            conditionModel
        );
    }

    delete(conditionId: string) {
        return this.api.delete(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId})
        );
    }

    get(conditionId: string) {
        return this.api.get<ConditionModel>(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId})
        );
    }

    update(conditionId: string, conditionModel: ConditionModel | NewConditionModel) {
        return this.api.put<ConditionModel>(
            this.buildPath(`${Condition.baseUrl}/${conditionId}`, {organizationId: this.api.organizationId}),
            conditionModel
        );
    }

    bulkGet(conditionIds: string[], params: ListConditionsOptions = {}) {
        return this.api.post<PageModel<ConditionModel, 'statements'>>(
            this.buildPath(`${Condition.baseUrl}/bulkGet`, {
                feature: 'when',
                organizationId: this.api.organizationId,
                ...params,
            }),
            {
                ids: conditionIds,
            }
        );
    }
}
