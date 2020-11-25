import API from '../../../../APICore';
import SourcesFields from '../SourcesFields';
import {ListSourcesFieldsParams, SourceFieldModel} from '../SourcesFieldsInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SourcesFields', () => {
    let field: SourcesFields;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        field = new SourcesFields(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific SourceField url', () => {
            const params: ListSourcesFieldsParams = {};

            field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/page/fields');
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific SourceField url', () => {
            const fieldId = '🍓';

            field.get(fieldId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/fields/${fieldId}?includeMappings=true`
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific SourceField url', () => {
            const fieldModel: SourceFieldModel = {};

            field.create(fieldModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/fields', fieldModel);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SourceField url', () => {
            const fieldId = '🍰';
            const fieldModel: SourceFieldModel = {};

            field.update(fieldId, fieldModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/fields/${fieldId}`,
                fieldModel
            );
        });
    });
});
