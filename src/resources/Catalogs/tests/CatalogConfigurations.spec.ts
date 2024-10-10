import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import CatalogConfiguration from '../CatalogConfiguration.js';
import {CreateCatalogConfigurationModel} from '../CatalogInterfaces.js';

jest.mock('../../../APICore.js');

describe('CatalogConfiguration', () => {
    let catalogConfiguration: CatalogConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        catalogConfiguration = new CatalogConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the catalog configurations base url', async () => {
            await catalogConfiguration.list({page: 2, pageSize: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the catalog configurations base url', async () => {
            const catalogConfigurationModel: New<CreateCatalogConfigurationModel> = {
                name: 'New configuration',
                product: {
                    idField: 'bloup',
                    objectType: 'ok',
                },
                fieldsMapping: {},
                host: 'https://www.example.com',
                locale: 'en-us-usd',
            };

            await catalogConfiguration.create(catalogConfigurationModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(CatalogConfiguration.baseUrl, catalogConfigurationModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific configuration url', async () => {
            const configurationToDeleteId = 'configuration-to-be-deleted';
            await catalogConfiguration.delete(configurationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}/${configurationToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific configuration url', async () => {
            const configurationToGetId = 'configuration-to-be-fetched';
            await catalogConfiguration.get(configurationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}/${configurationToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific catalog configuration url', async () => {
            const catalogConfigurationModel: CreateCatalogConfigurationModel = {
                id: 'wow',
                name: 'Configuration to be updated',
                product: {
                    idField: '@uri',
                    objectType: 'product',
                },
                fieldsMapping: {},
                host: 'https://www.example.com',
                locale: 'en-us-usd',
            };

            await catalogConfiguration.update(catalogConfigurationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${CatalogConfiguration.baseUrl}/${catalogConfigurationModel.id}`,
                catalogConfigurationModel,
            );
        });
    });
});
