import API from '../../../APICore.js';
import {PageModel} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {ListSourcesFieldsParams, SourceFieldModel} from './SourcesFieldsInterfaces.js';

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
