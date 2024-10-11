import API from '../../../APICore.js';
import {FieldOperatorType, FieldValueType} from '../../Enums.js';
import {New} from '../../BaseInterfaces.js';
import ProductListing from '../ProductListing.js';
import {ProductListingModel} from '../ProductListingInterfaces.js';

jest.mock('../../../APICore.js');

describe('ProductListings', () => {
    const catalogId = 'catalogId';
    let productListing: ProductListing;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        productListing = new ProductListing(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the base product listings url of a catalog', async () => {
            await productListing.list(catalogId, {page: 2, perPage: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings?page=2&pageSize=10`,
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the base product listing url of a catalog', async () => {
            const productListingModel: New<ProductListingModel> = {
                name: 'New product listing',
                include: [
                    {
                        fieldName: 'ec_brand',
                        operator: FieldOperatorType.IS_EXACTLY,
                        value: {
                            type: FieldValueType.STRING,
                            value: 'Adidas',
                        },
                    },
                ],
                urls: ['first-url', 'second-url'],
            };

            await productListing.create(catalogId, productListingModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings`,
                productListingModel,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific product listing url of a catalog', async () => {
            const productListingToDeleteId = 'product-listing-to-be-deleted';
            await productListing.delete(catalogId, productListingToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingToDeleteId}`,
            );
        });
    });

    describe('get product listing for a catalog', () => {
        it('should make a GET call to the specific product listing url of a catalog', async () => {
            const productListingToGetId = 'product-listing-to-be-fetched';
            await productListing.get(catalogId, productListingToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingToGetId}`,
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific product listing url of a catalog', async () => {
            const productListingModel: ProductListingModel = {
                id: '1234',
                name: 'New product listing',
                include: [
                    {
                        fieldName: 'ec_brand',
                        operator: FieldOperatorType.IS_EXACTLY,
                        value: {
                            type: FieldValueType.STRING,
                            value: 'Nike',
                        },
                    },
                ],
                urls: ['first-url', 'second-url'],
            };

            await productListing.update(catalogId, productListingModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingModel.id}`,
                productListingModel,
            );
        });
    });

    describe('get product listings grouped by catalog', () => {
        it('should make a GET call to a specific url on the product listing base path', async () => {
            await productListing.getByCatalog();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListing.baseProductListingsUrl}/catalogs`);
        });
    });

    describe('get urls to query product listings', () => {
        it('should make a GET call to a specific url on the product listing base path', async () => {
            await productListing.getUrls();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListing.baseProductListingsUrl}/urls`);
        });
    });
});
