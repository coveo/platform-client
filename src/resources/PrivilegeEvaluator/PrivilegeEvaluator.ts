import Ressource from '../Resource';
import {PrivilegeEvaluatorModel} from './PrivilegeEvaluatorInterfaces';

export default class PrivilegeEvaluator extends Ressource {
    static baseUrl = `/rest/privilege/evaluate`;

    /**
     * Evaluates a specific privilege request
     *
     * @param {RestTokenParams} tokenParams
     * @returns
     */
    evaluate(privilegeEvaluatorParams: PrivilegeEvaluatorModel) {
        privilegeEvaluatorParams = {
            organizationId: this.api.organizationId,
            ...privilegeEvaluatorParams,
        };
        return this.api.post<PrivilegeEvaluatorModel>(`${PrivilegeEvaluator.baseUrl}`, privilegeEvaluatorParams);
    }
}
