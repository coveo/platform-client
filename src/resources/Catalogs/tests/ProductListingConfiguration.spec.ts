import API from '../../../APICore.js';
import {FieldOperatorType, FieldValueType} from '../../Enums.js';
import {New} from '../../BaseInterfaces.js';
import ProductListingConfiguration from '../ProductListingConfiguration.js';
import {ProductListingConfigurationModel, RankingTypeEnum} from '../ProductListingConfigurationInterfaces.js';

jest.mock('../../../APICore.js');

describe('ProductListingConfiguration', () => {
    const catalogId = 'catalogId';
    const productListingId = 'productlistingId';
    let productListingConfiguration: ProductListingConfiguration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        productListingConfiguration = new ProductListingConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the product listing configuration base url', async () => {
            await productListingConfiguration.list(catalogId, productListingId, {page: 2, perPage: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations?page=2&pageSize=10`,
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the product listing configuration base url', async () => {
            const productListingConfigurationModel: New<ProductListingConfigurationModel> = {
                rankingConfigurations: [
                    {
                        name: 'Bury brand',
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_EXACTLY,
                                value: {
                                    type: FieldValueType.STRING,
                                    value: 'New Balance',
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BURY,
                        value: 10,
                    },
                    {
                        name: 'Boost brand',
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_EXACTLY,
                                value: {
                                    type: FieldValueType.STRING,
                                    value: 'Puma',
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BOOST,
                        value: 15,
                    },
                ],
            };

            await productListingConfiguration.create(catalogId, productListingId, productListingConfigurationModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
                productListingConfigurationModel,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific product listing configuration url', async () => {
            const productListingConfigurationToDeleteId = 'product-listing-configuration-to-be-deleted';
            await productListingConfiguration.delete(
                catalogId,
                productListingId,
                productListingConfigurationToDeleteId,
            );
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToDeleteId}`,
            );
        });
    });

    describe('get product listing for a catalog', () => {
        it('should make a GET call to the specific product listing configuration url', async () => {
            const productListingConfigurationToGetId = 'product-listing-configuration-to-be-fetched';
            await productListingConfiguration.get(catalogId, productListingId, productListingConfigurationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToGetId}`,
            );
        });
    });

    describe('update', () => {
        const productListingConfigurationToUpdateId = 'product-listing-configuration-to-be-updated';

        it('should make a PUT call to the specific product listing configuration url', async () => {
            const productListingConfigurationModel = {
                id: 'testId',
                rankingConfigurations: [
                    {
                        name: 'Bury brand',
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_GREATER_THAN,
                                value: {
                                    type: FieldValueType.DECIMAL,
                                    value: 1,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BURY,
                        value: 100,
                    },
                    {
                        name: 'Boost brand',
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_LESS_THAN_OR_EQUAL_TO,
                                value: {
                                    type: FieldValueType.DECIMAL,
                                    value: 2,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BOOST,
                        value: 150,
                    },
                ],
            } as ProductListingConfigurationModel;

            await productListingConfiguration.update(
                catalogId,
                productListingId,
                productListingConfigurationToUpdateId,
                productListingConfigurationModel,
            );
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToUpdateId}`,
                productListingConfigurationModel,
            );
        });
    });
});
