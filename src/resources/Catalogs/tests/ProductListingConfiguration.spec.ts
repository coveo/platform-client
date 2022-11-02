import API from '../../../APICore';
import {FieldOperatorType, FieldValueType} from '../../Enums';
import {New} from '../../BaseInterfaces';
import ProductListingConfiguration from '../ProductListingConfiguration';
import {ProductListingConfigurationModel, RankingTypeEnum} from '../ProductListingConfigurationInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('ProductListingConfiguration', () => {
    const catalogId = 'catalogId';
    const productListingId = 'productlistingId';
    let productListingConfiguration: ProductListingConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        productListingConfiguration = new ProductListingConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the product listing configuration base url', () => {
            productListingConfiguration.list(catalogId, productListingId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the product listing configuration base url', () => {
            const productListingConfigurationModel: New<ProductListingConfigurationModel> = {
                rankingConfigurations: [
                    {
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_EXACTLY,
                                value: {
                                    type: 'STRING',
                                    value: FieldValueType.STRING,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BURY,
                        value: 10,
                    },
                    {
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_EXACTLY,
                                value: {
                                    type: 'STRING',
                                    value: FieldValueType.STRING,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BOOST,
                        value: 15,
                    },
                ],
            };

            productListingConfiguration.create(catalogId, productListingId, productListingConfigurationModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations`,
                productListingConfigurationModel
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific product listing configuration url', () => {
            const productListingConfigurationToDeleteId = 'product-listing-configuration-to-be-deleted';
            productListingConfiguration.delete(catalogId, productListingId, productListingConfigurationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToDeleteId}`
            );
        });
    });

    describe('get product listing for a catalog', () => {
        it('should make a GET call to the specific product listing configuration url', () => {
            const productListingConfigurationToGetId = 'product-listing-configuration-to-be-fetched';
            productListingConfiguration.get(catalogId, productListingId, productListingConfigurationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToGetId}`
            );
        });
    });

    describe('update', () => {
        const productListingConfigurationToUpdateId = 'product-listing-configuration-to-be-updated';

        it('should make a PUT call to the specific product listing configuration url', () => {
            const productListingConfigurationModel: ProductListingConfigurationModel = {
                rankingConfigurations: [
                    {
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_GREATER_THAN,
                                value: {
                                    type: 'decimal',
                                    value: FieldValueType.DECIMAL,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BURY,
                        value: 100,
                    },
                    {
                        include: [
                            {
                                fieldName: 'ec_brand',
                                operator: FieldOperatorType.IS_LESS_THAN_OR_EQUAL_TO,
                                value: {
                                    type: 'decimal',
                                    value: FieldValueType.DECIMAL,
                                },
                            },
                        ],
                        exclude: [],
                        type: RankingTypeEnum.BOOST,
                        value: 150,
                    },
                ],
            };

            productListingConfiguration.update(
                catalogId,
                productListingId,
                productListingConfigurationToUpdateId,
                productListingConfigurationModel
            );
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${catalogId}/productlistings/${productListingId}/configurations/${productListingConfigurationToUpdateId}`,
                productListingConfigurationModel
            );
        });
    });
});
