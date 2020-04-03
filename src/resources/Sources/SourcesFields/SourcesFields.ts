import API from '../../../APICore';
import {PageModel} from '../../BaseInterfaces';
import Resource from '../../Resource';
import Sources from '../Sources';
import {SourceFieldModel, SourceFieldParams} from './SourcesFieldsInterfaces';

export default class SourcesFields extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources/fields`;

    list(params?: SourceFieldParams) {
        return this.api.get<PageModel<SourceFieldModel>>(this.buildPath(`${Sources.baseUrl}/page/fields`, params));
    }

    get(fieldId: string, includeMappings = true) {
        return this.api.get<SourceFieldModel>(this.buildPath(`${SourcesFields.baseUrl}/${fieldId}`, {includeMappings}));
    }

    create(fieldModel: SourceFieldModel) {
        return this.api.post(SourcesFields.baseUrl, fieldModel);
    }

    update(fieldId: string, fieldModel: SourceFieldModel) {
        return this.api.put(`${SourcesFields.baseUrl}/${fieldId}`, fieldModel);
    }
}
