import API from '../../../APICore.js';
import {SortingOrder} from '../../Enums.js';
import Indexes from '../../Indexes/Indexes.js';
import Field from '../Fields.js';
import {FieldListingOptions, FieldModel, ListFieldsParams} from '../FieldsInterfaces.js';

jest.mock('../../../APICore.js');

describe('Field', () => {
    let field: Field;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        field = new Field(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the specific Field url', async () => {
            const fieldModel: FieldModel = {};

            await field.create(fieldModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Field.baseUrl, fieldModel);
        });
    });

    describe('createFields', () => {
        it('should make a POST call to the specific Field url', async () => {
            const fieldModels: FieldModel[] = [];

            await field.createFields(fieldModels);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/batch/create`, fieldModels);
        });
    });

    describe('deleteFields', () => {
        it('should make a DELETE call to the specific Field url', async () => {
            const fieldIds = ['🧀', '', '🥓'];

            await field.deleteFields(fieldIds);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${Field.baseUrl}/batch/delete?fields=%F0%9F%A7%80&fields=%F0%9F%A5%93`,
            );
        });
    });

    describe('updateFields', () => {
        it('should make a PUT call to the specific Field url', async () => {
            const fieldModels: FieldModel[] = [];

            await field.updateFields(fieldModels);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Field.baseUrl}/batch/update`, fieldModels);
        });
    });

    describe('synchronize', () => {
        it('should make a POST call to the specific Field url', async () => {
            await field.synchronize();
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/synchronize`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Field url', async () => {
            const fieldId = '🦊';

            await field.delete(fieldId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Field url', async () => {
            const fieldId = '🍓';

            await field.get(fieldId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Field url', async () => {
            const fieldId = '🍰';
            const fieldModel: FieldModel = {};

            await field.update(fieldId, fieldModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`, fieldModel);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Field url', async () => {
            const params: ListFieldsParams = {};

            await field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/fields`);
        });

        it('should make a GET call to the specific Field url with the facetsOnly parameter set as true', async () => {
            const params: ListFieldsParams = {facetsOnly: true};

            await field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/fields?facetsOnly=true`);
        });
    });

    describe('search', () => {
        it('should make a POST call to the specific Field url', async () => {
            const params: FieldListingOptions = {};

            await field.search(params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/search`, {});
        });

        it('should make a POST call to the specific Field url with the facetsOnly parameter set as true', async () => {
            const params: FieldListingOptions = {order: SortingOrder.ASC};

            await field.search(params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/search`, params);
        });
    });
});
