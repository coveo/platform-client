import API from '../../../../APICore.js';
import {SinglePermissionState} from '../../../Enums.js';
import Documents from '../Documents.js';

jest.mock('../../../../APICore.js');

const INDEX_ID = 'index-id';
const DOCUMENT_ID = '42.31537$file://movies/the-shining.txt';

describe('Documents', () => {
    let documents: Documents;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        documents = new Documents(api, serverlessApi);
    });

    describe('listPermissions', () => {
        it('should make a GET call to the specific Documents url', async () => {
            await documents.listPermissions(INDEX_ID, DOCUMENT_ID);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Documents.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions`,
            );
        });
    });

    describe('listEffectivePermissions', () => {
        it('should make a GET call to the specific Documents url', async () => {
            await documents.listEffectivePermissions(INDEX_ID, DOCUMENT_ID);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Documents.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions/effective`,
            );
        });

        it('should use the passed options in the query parameters', async () => {
            await documents.listEffectivePermissions(INDEX_ID, DOCUMENT_ID, {
                states: [SinglePermissionState.OUT_OF_DATE, SinglePermissionState.DISABLED],
                page: 0,
                perPage: 25,
                from: '2023-6-26T19:57:09.714Z',
                to: '2023-6-26T20:57:09.714Z',
                includedEntities: 'ALLOWED',
            });
            expect(api.get).toHaveBeenCalledWith(
                `${Documents.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions/effective?states=OUT_OF_DATE&states=DISABLED&page=0&perPage=25&from=2023-6-26T19%3A57%3A09.714Z&to=2023-6-26T20%3A57%3A09.714Z&includedEntities=ALLOWED`,
            );
        });
    });
});
