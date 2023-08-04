import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Catalog from '../Catalog.js';
import {CreateCatalogModel, CatalogModel, FieldsSuggestionsQueryModel} from '../CatalogInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Catalog', () => {
    let catalog: Catalog;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        catalog = new Catalog(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the catalogs base url', () => {
            catalog.list({page: 2, pageSize: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the catalogs base url', () => {
            const catalogModel: New<CreateCatalogModel> = {
                name: 'New catalog',
                catalogConfigurationId: 'id',
            };

            catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });

        it('should be backward compatible with the legacy structure', () => {
            const catalogModel: New<CreateCatalogModel> = {
                name: 'New catalog',
                configuration: {
                    id: 'configuration-to-update-id',
                    name: 'New configuration',
                    product: {
                        idField: '@uri',
                        objectType: 'product',
                    },
                },
            };

            catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });

        it('should be backward compatible with the fields array', () => {
            const catalogModel: New<CreateCatalogModel> = {
                name: 'New catalog',
                product: {
                    idField: '@uri',
                    objectType: 'product',
                    fields: ['ignored'],
                },
                variant: {
                    idField: 'bloup',
                    objectType: 'ok',
                    fields: ['ignored'],
                },
                availability: {
                    idField: 'fish',
                    objectType: 'wow',
                    availableSkusField: 'bananas',
                    fields: ['ignored'],
                },
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

    describe('getFields', () => {
        it("should make a GET call to the specific catalog's fields url", () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            catalog.getFields(catalogOfFieldsToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fields`);
        });

        it('should allow bypassing the cache', () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            catalog.getFields(catalogOfFieldsToGetId, {bypassCache: true});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fields?bypassCache=true`,
            );
        });
    });

    describe('getFieldsSuggestions', () => {
        it('should make a POST call to to retrieve fields suggestions', () => {
            const query: FieldsSuggestionsQueryModel = {
                sourceNames: ['source1'],
                availabilitySourceNames: ['availability_source1'],
                productObjectType: 'Product',
                variantObjectType: 'Variant',
                availabilityObjectType: 'Availability',
            };
            catalog.getFieldsSuggestions(query);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Catalog.baseUrl}/fieldsSuggestions`, query);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific catalog url', () => {
            const catalogModel: CreateCatalogModel = {
                id: 'catalog-to-update-id',
                name: 'Catalog to be updated',
                configuration: {
                    id: 'configuration-to-update-id',
                    name: 'Configuration',
                    product: {
                        idField: '@uri',
                        objectType: 'product',
                    },
                },
            };

            catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });

        it('should allow a PUT call with a catalog configuration id', () => {
            const catalogModel: CreateCatalogModel = {
                id: 'catalog-to-update-id',
                name: 'Catalog to be updated',
                catalogConfigurationId: 'abc-123-def',
            };

            catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });

        it('should be backward compatible with the legacy structure', () => {
            const catalogModel: CatalogModel = {
                id: 'catalog-to-update-id',
                name: 'New catalog',
                product: {
                    idField: '@uri',
                    objectType: 'product',
                    fields: ['ignored'],
                },
                variant: {
                    idField: 'bloup',
                    objectType: 'ok',
                    fields: ['ignored'],
                },
                availability: {
                    idField: 'fish',
                    objectType: 'wow',
                    availableSkusField: 'bananas',
                    fields: ['ignored'],
                },
            };

            catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });
    });

    describe('getFieldStats', () => {
        it("should make a GET call to the specific catalog's fields stats url", () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            catalog.getFieldStats(catalogOfFieldsToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fieldStats`);
        });

        it('should allow refreshing the field statistics cache', () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            catalog.getFieldStats(catalogOfFieldsToGetId, {forceRefresh: true});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fieldStats?forceRefresh=true`,
            );
        });
    });
});
