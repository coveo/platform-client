import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Indexes from '../Indexes/Indexes.js';
import Resource from '../Resource.js';
import {FieldListingOptions, FieldModel, ListFieldsParams} from './FieldsInterfaces.js';

export default class Field extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/indexes/fields`;

    create(field: FieldModel) {
        return this.api.post(Field.baseUrl, field);
    }

    createFields(fields: FieldModel[]) {
        return this.api.post(`${Field.baseUrl}/batch/create`, fields);
    }

    deleteFields(fieldIds: string[]) {
        return this.api.delete(this.buildPath(`${Field.baseUrl}/batch/delete`, {fields: fieldIds}));
    }

    updateFields(fields: FieldModel[]) {
        return this.api.put(`${Field.baseUrl}/batch/update`, fields);
    }

    synchronize() {
        return this.api.post(`${Field.baseUrl}/synchronize`);
    }

    delete(fieldId: string) {
        return this.api.delete(`${Field.baseUrl}/${fieldId}`);
    }

    get(fieldId: string) {
        return this.api.get<FieldModel>(`${Field.baseUrl}/${fieldId}`);
    }

    update(fieldId: string, options: FieldModel) {
        return this.api.put(`${Field.baseUrl}/${fieldId}`, options);
    }

    /**
     * @deprecated list(params?: ListFieldsParams) is kept for backward compatibility, you should now use `search(params?: FieldListingOptions)`.
     */
    list(params?: ListFieldsParams) {
        return this.api.get<PageModel<FieldModel>>(this.buildPath(`${Indexes.baseUrl}/page/fields`, params));
    }

    search(params?: FieldListingOptions) {
        return this.api.post<PageModel<FieldModel>>(this.buildPath(`${Field.baseUrl}/search`), params);
    }
}
