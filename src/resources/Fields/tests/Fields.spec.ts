import API from '../../../APICore.js';
import {SortingOrder} from '../../Enums.js';
import Indexes from '../../Indexes/Indexes.js';
import Field from '../Fields.js';
import {FieldListingOptions, FieldModel, ListFieldsParams} from '../FieldsInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Field', () => {
    let field: Field;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        field = new Field(api, serverlessApi);
    });

    describe('create', () => {
        it('should make a POST call to the specific Field url', () => {
            const fieldModel: FieldModel = {};

            field.create(fieldModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Field.baseUrl, fieldModel);
        });
    });

    describe('createFields', () => {
        it('should make a POST call to the specific Field url', () => {
            const fieldModels: FieldModel[] = [];

            field.createFields(fieldModels);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/batch/create`, fieldModels);
        });
    });

    describe('deleteFields', () => {
        it('should make a DELETE call to the specific Field url', () => {
            const fieldIds = ['🧀', '', '🥓'];

            field.deleteFields(fieldIds);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${Field.baseUrl}/batch/delete?fields=%F0%9F%A7%80&fields=%F0%9F%A5%93`
            );
        });
    });

    describe('updateFields', () => {
        it('should make a PUT call to the specific Field url', () => {
            const fieldModels: FieldModel[] = [];

            field.updateFields(fieldModels);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Field.baseUrl}/batch/update`, fieldModels);
        });
    });

    describe('synchronize', () => {
        it('should make a POST call to the specific Field url', () => {
            field.synchronize();
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/synchronize`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Field url', () => {
            const fieldId = '🦊';

            field.delete(fieldId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Field url', () => {
            const fieldId = '🍓';

            field.get(fieldId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Field url', () => {
            const fieldId = '🍰';
            const fieldModel: FieldModel = {};

            field.update(fieldId, fieldModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Field.baseUrl}/${fieldId}`, fieldModel);
        });
    });

    describe('list', () => {
        it('should make a GET call to the specific Field url', () => {
            const params: ListFieldsParams = {};

            field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/fields`);
        });

        it('should make a GET call to the specific Field url with the facetsOnly parameter set as true', () => {
            const params: ListFieldsParams = {facetsOnly: true};

            field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/page/fields?facetsOnly=true`);
        });
    });

    describe('search', () => {
        it('should make a POST call to the specific Field url', () => {
            const params: FieldListingOptions = {};

            field.search(params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/search`, {});
        });

        it('should make a POST call to the specific Field url with the facetsOnly parameter set as true', () => {
            const params: FieldListingOptions = {order: SortingOrder.ASC};

            field.search(params);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Field.baseUrl}/search`, params);
        });
    });
});
