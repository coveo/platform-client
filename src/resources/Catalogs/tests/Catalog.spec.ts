import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Catalog from '../Catalog.js';
import {CreateCatalogModel, CatalogModel, FieldsSuggestionsQueryModel} from '../CatalogInterfaces.js';

jest.mock('../../../APICore.js');

describe('Catalog', () => {
    let catalog: Catalog;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        catalog = new Catalog(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the catalogs base url', async () => {
            await catalog.list({page: 2, pageSize: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the catalogs base url', async () => {
            const catalogModel: New<CreateCatalogModel> = {
                name: 'New catalog',
                catalogConfigurationId: 'id',
            };

            await catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });

        it('should be backward compatible with the legacy structure', async () => {
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

            await catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });

        it('should be backward compatible with the fields array', async () => {
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

            await catalog.create(catalogModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Catalog.baseUrl, catalogModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific catalog url', async () => {
            const catalogToDeleteId = 'catalog-to-be-deleted';
            await catalog.delete(catalogToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific catalog url', async () => {
            const catalogToGetId = 'catalog-to-be-fetched';
            await catalog.get(catalogToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogToGetId}`);
        });
    });

    describe('getFields', () => {
        it("should make a GET call to the specific catalog's fields url", async () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            await catalog.getFields(catalogOfFieldsToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fields`);
        });

        it('should allow bypassing the cache', async () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            await catalog.getFields(catalogOfFieldsToGetId, {bypassCache: true});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fields?bypassCache=true`,
            );
        });
    });

    describe('getFieldsSuggestions', () => {
        it('should make a POST call to to retrieve fields suggestions', async () => {
            const query: FieldsSuggestionsQueryModel = {
                sourceNames: ['source1'],
                availabilitySourceNames: ['availability_source1'],
                productObjectType: 'Product',
                variantObjectType: 'Variant',
                availabilityObjectType: 'Availability',
            };
            await catalog.getFieldsSuggestions(query);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Catalog.baseUrl}/fieldsSuggestions`, query);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific catalog url', async () => {
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

            await catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });

        it('should allow a PUT call with a catalog configuration id', async () => {
            const catalogModel: CreateCatalogModel = {
                id: 'catalog-to-update-id',
                name: 'Catalog to be updated',
                catalogConfigurationId: 'abc-123-def',
            };

            await catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });

        it('should be backward compatible with the legacy structure', async () => {
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

            await catalog.update(catalogModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogModel.id}`, catalogModel);
        });
    });

    describe('getFieldStats', () => {
        it("should make a GET call to the specific catalog's fields stats url", async () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            await catalog.getFieldStats(catalogOfFieldsToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fieldStats`);
        });

        it('should allow refreshing the field statistics cache', async () => {
            const catalogOfFieldsToGetId = 'catalog-of-fields';
            await catalog.getFieldStats(catalogOfFieldsToGetId, {forceRefresh: true});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Catalog.baseUrl}/${catalogOfFieldsToGetId}/fieldStats?forceRefresh=true`,
            );
        });
    });
});
