import API from '../../../APICore';
import {PageModel} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {ListSourcesFieldsParams, SourceFieldModel} from './SourcesFieldsInterfaces';

export default class SourcesFields extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    list(params?: ListSourcesFieldsParams) {
        return this.api.get<PageModel<SourceFieldModel>>(
            this.buildPath(`${SourcesFields.baseUrl}/page/fields`, params)
        );
    }

    get(fieldId: string, includeMappings = true) {
        return this.api.get<SourceFieldModel>(
            this.buildPath(`${SourcesFields.baseUrl}/fields/${fieldId}`, {includeMappings})
        );
    }

    create(fieldModel: SourceFieldModel) {
        return this.api.post(`${SourcesFields.baseUrl}/fields`, fieldModel);
    }

    update(fieldId: string, fieldModel: SourceFieldModel) {
        return this.api.put(`${SourcesFields.baseUrl}/fields/${fieldId}`, fieldModel);
    }
}
