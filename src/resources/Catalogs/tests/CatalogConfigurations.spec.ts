import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import CatalogConfiguration from '../CatalogConfiguration.js';
import {CreateCatalogConfigurationModel} from '../CatalogInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('CatalogConfiguration', () => {
    let catalogConfiguration: CatalogConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        catalogConfiguration = new CatalogConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the catalog configurations base url', () => {
            catalogConfiguration.list({page: 2, pageSize: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the catalog configurations base url', () => {
            const catalogConfigurationModel: New<CreateCatalogConfigurationModel> = {
                name: 'New configuration',
                product: {
                    idField: 'bloup',
                    objectType: 'ok',
                },
                fieldsMapping: {},
            };

            catalogConfiguration.create(catalogConfigurationModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(CatalogConfiguration.baseUrl, catalogConfigurationModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific configuration url', () => {
            const configurationToDeleteId = 'configuration-to-be-deleted';
            catalogConfiguration.delete(configurationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}/${configurationToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific configuration url', () => {
            const configurationToGetId = 'configuration-to-be-fetched';
            catalogConfiguration.get(configurationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${CatalogConfiguration.baseUrl}/${configurationToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific catalog configuration url', () => {
            const catalogConfigurationModel: CreateCatalogConfigurationModel = {
                id: 'wow',
                name: 'Configuration to be updated',
                product: {
                    idField: '@uri',
                    objectType: 'product',
                },
                fieldsMapping: {},
            };

            catalogConfiguration.update(catalogConfigurationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${CatalogConfiguration.baseUrl}/${catalogConfigurationModel.id}`,
                catalogConfigurationModel
            );
        });
    });
});
