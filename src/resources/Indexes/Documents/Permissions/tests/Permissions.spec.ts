import API from '../../../../../APICore.js';
import {EffectivePermissionType, SinglePermissionState} from '../../../../Enums.js';
import Permissions from '../Permissions.js';

jest.mock('../../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

const INDEX_ID = 'index-id';
const DOCUMENT_ID = '42.31537$file://movies/the-shining.txt';

describe('Permissions', () => {
    let permissions: Permissions;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        permissions = new Permissions(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Permissions url', () => {
            permissions.list(INDEX_ID, DOCUMENT_ID);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Permissions.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions`
            );
        });
    });

    describe('listEffective', () => {
        it('should make a GET call to the specific Permissions url with the passed parameters', () => {
            permissions.listEffective(INDEX_ID, DOCUMENT_ID);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Permissions.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions/effective`
            );
        });

        it('should use the passed options in the query parameters', () => {
            permissions.listEffective(INDEX_ID, DOCUMENT_ID, {
                states: [SinglePermissionState.OUT_OF_DATE, SinglePermissionState.DISABLED],
                page: 0,
                perPage: 25,
                from: '2023-6-26T19:57:09.714Z',
                to: '2023-6-26T20:57:09.714Z',
                includedEntities: EffectivePermissionType.Allowed,
            });
            expect(api.get).toHaveBeenCalledWith(
                `${Permissions.baseUrl}/${INDEX_ID}/documents/42.31537%2524file%253A%252F%252Fmovies%252Fthe-shining.txt/permissions/effective?states=OUT_OF_DATE&states=DISABLED&page=0&perPage=25&from=2023-6-26T19%3A57%3A09.714Z&to=2023-6-26T20%3A57%3A09.714Z&includedEntities=ALLOWED`
            );
        });
    });
});
