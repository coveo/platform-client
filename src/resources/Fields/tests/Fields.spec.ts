import API from '../../../APICore';
import Indexes from '../../Indexes/Indexes';
import Field from '../Fields';
import {FieldModel, ListFieldsParams} from '../FieldsInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Field', () => {
    let field: Field;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        field = new Field(api);
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
            field.deleteFields(['']);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Field.baseUrl}/batch/delete`);
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
    });
});
