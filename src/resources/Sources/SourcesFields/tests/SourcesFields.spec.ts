import API from '../../../../APICore.js';
import SourcesFields from '../SourcesFields.js';
import {ListSourcesFieldsParams, SourceFieldModel} from '../SourcesFieldsInterfaces.js';

jest.mock('../../../../APICore.js');

describe('SourcesFields', () => {
    let field: SourcesFields;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        field = new SourcesFields(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific SourceField url', async () => {
            const params: ListSourcesFieldsParams = {};

            await field.list(params);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/page/fields');
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific SourceField url', async () => {
            const fieldId = '🍓';

            await field.get(fieldId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/fields/${fieldId}?includeMappings=true`,
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the specific SourceField url', async () => {
            const fieldModel: SourceFieldModel = {};

            await field.create(fieldModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/sources/fields', fieldModel);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific SourceField url', async () => {
            const fieldId = '🍰';
            const fieldModel: SourceFieldModel = {};

            await field.update(fieldId, fieldModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/sources/fields/${fieldId}`,
                fieldModel,
            );
        });
    });
});
