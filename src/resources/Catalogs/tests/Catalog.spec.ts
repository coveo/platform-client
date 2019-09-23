import API from '../../../APICore';
import Catalog from '../Catalog';
import {CatalogModel, CatalogsListOptions} from '../Interfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Catalog', () => {
    let catalog: Catalog;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        catalog = new Catalog(api);
    });

    describe('list', () => {
        it('should make a GET call to the catalogs base url', () => {
            const options: CatalogsListOptions = {
                page: 2,
                pageSize: 10,
            };
            catalog.list(options);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Catalog.baseUrl, options);
        });
    });

    describe('create', () => {
        it('should make a POST call to the catalogs base url', () => {
            const catalogModel: CatalogModel = {
                name: 'New catalog',
            };

            catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific catalog url', () => {
            const catalogToDeleteId = 'catalog-to-be-deleted';
            catalog.delete(catalogToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific catalog url', () => {
            const catalogToGetId = 'catalog-to-be-fetched';
            catalog.get(catalogToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific catalog url', () => {
            const catalogModel: CatalogModel = {
                id: 'catalog-to-update-id',
                name: 'Catalog to be updated',
            };

            catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });
    });
});
