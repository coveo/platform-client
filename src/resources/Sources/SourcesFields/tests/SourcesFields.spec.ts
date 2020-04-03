import API from '../../../../APICore';
import Sources from '../../Sources';
import SourcesFields from '../SourcesFields';
import {SourceFieldModel, SourceFieldParams} from '../SourcesFieldsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SourcesFields', () => {
    let fields: SourcesFields;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        fields = new SourcesFields(api);
    });

    describe('list', () => {
        it('should make a GET call to the specific SourceField url', () => {
            const params: SourceFieldParams = {};

            fields.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Sources.baseUrl}/page/fields`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific SourceField url', () => {
            const fieldId = '🍓';

            fields.get(fieldId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SourcesFields.baseUrl}/${fieldId}?includeMappings=true`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific SourceField url', () => {
            const fieldModel: SourceFieldModel = {};

            fields.create(fieldModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SourcesFields.baseUrl, fieldModel);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SourceField url', () => {
            const fieldId = '🍰';
            const fieldModel: SourceFieldModel = {};

            fields.update(fieldId, fieldModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SourcesFields.baseUrl}/${fieldId}`, fieldModel);
        });
    });
});
