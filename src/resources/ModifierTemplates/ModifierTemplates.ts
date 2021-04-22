import Resource from '../Resource';
import {ModifierModel, StatementDetailModel} from './ModifierTemplateInterfaces';

export default class ModifierTemplates extends Resource {
    static baseUrl = `/rest/modifiertemplates`;

    list() {
        return this.api.get<ModifierModel>(`${ModifierTemplates.baseUrl}`);
    }

    listPossibleStatements() {
        return this.api.get<StatementDetailModel[]>(`${ModifierTemplates.baseUrl}/statementdetails`);
    }
}
