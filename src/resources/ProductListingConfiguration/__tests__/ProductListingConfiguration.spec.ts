import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import {FieldOperatorType, FieldValueType, FilterTypeEnum} from '../../Enums.js';
import ProductListingConfiguration from '../ProductListingConfiguration.js';
import {ListingConfigurationModel} from '../ProductListingConfigurationInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ProductListingConfiguration', () => {
    let productListingConfiguration: ProductListingConfiguration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        productListingConfiguration = new ProductListingConfiguration(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the product listing configuration base url', () => {
            productListingConfiguration.list({page: 2, pageSize: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListingConfiguration.baseUrl}?page=2&pageSize=10`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the product listing configuration base url', () => {
            const listingConfigurationModel: New<ListingConfigurationModel> = {
                matching: {
                    url: 'https://sports-dev.barca.group/browse/promotions/accessories/towels',
                },
                rules: {
                    id: '36e3c12a-b64f-496a-b4ef-879ec6dd835b',
                    rankingRules: [],
                    filterRules: [
                        {
                            name: 'ec_category_slug contains towels',
                            updatedAt: 0,
                            filters: [
                                {
                                    fieldName: 'ec_category_slug',
                                    operator: FieldOperatorType.CONTAINS,
                                    value: {
                                        type: FieldValueType.ARRAY,
                                        values: ['accessories/towels'],
                                    },
                                },
                            ],
                            type: FilterTypeEnum.INCLUDE,
                        },
                    ],
                    pinRules: [],
                },
            };

            productListingConfiguration.create(listingConfigurationModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(ProductListingConfiguration.baseUrl, listingConfigurationModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific product listing configuration', () => {
            const productListingConfigurationToDeleteId = 'product-listing-configuration-to-be-deleted';
            productListingConfiguration.delete(productListingConfigurationToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${productListingConfigurationToDeleteId}`,
            );
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific product listing configuration', () => {
            const productListingConfigurationToGetId = 'product-listing-configuration-to-be-fetched';
            productListingConfiguration.get(productListingConfigurationToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${productListingConfigurationToGetId}`,
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific product listing configuration', () => {
            const productListingConfigurationToUpdateId = 'product-listing-configuration-to-update-id';
            const listingConfigurationModel: ListingConfigurationModel = {
                matching: {
                    url: 'https://sports-dev.barca.group/browse/promotions/accessories/towels',
                },
                rules: {
                    id: '36e3c12a-b64f-496a-b4ef-879ec6dd835b',
                    rankingRules: [],
                    filterRules: [
                        {
                            name: 'ec_category_slug contains towels',
                            updatedAt: 0,
                            filters: [
                                {
                                    fieldName: 'ec_category_slug',
                                    operator: FieldOperatorType.CONTAINS,
                                    value: {
                                        type: FieldValueType.ARRAY,
                                        values: ['accessories/towels'],
                                    },
                                },
                            ],
                            type: FilterTypeEnum.INCLUDE,
                        },
                    ],
                    pinRules: [],
                },
            };
            productListingConfiguration.update(productListingConfigurationToUpdateId, listingConfigurationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/${productListingConfigurationToUpdateId}`,
                listingConfigurationModel,
            );
        });
    });

    describe('getGlobal', () => {
        it('should make a GET call to get global product listing configuration', () => {
            productListingConfiguration.getGlobal();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListingConfiguration.baseUrl}/global`);
        });
    });

    describe('updateGlobal', () => {
        it('should make a PUT call to the global product listing configuration', () => {
            const listingConfigurationModel: ListingConfigurationModel = {
                matching: {
                    url: 'https://sports-dev.barca.group/browse/promotions/accessories/towels',
                },
                rules: {
                    id: '36e3c12a-b64f-496a-b4ef-879ec6dd835b',
                    rankingRules: [],
                    filterRules: [
                        {
                            name: 'ec_category_slug contains towels',
                            updatedAt: 0,
                            filters: [
                                {
                                    fieldName: 'ec_category_slug',
                                    operator: FieldOperatorType.CONTAINS,
                                    value: {
                                        type: FieldValueType.ARRAY,
                                        values: ['accessories/towels'],
                                    },
                                },
                            ],
                            type: FilterTypeEnum.INCLUDE,
                        },
                    ],
                    pinRules: [],
                },
            };
            productListingConfiguration.updateGlobal(listingConfigurationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListingConfiguration.baseUrl}/global`,
                listingConfigurationModel,
            );
        });
    });
});
