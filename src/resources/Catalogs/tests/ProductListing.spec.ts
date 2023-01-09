import API from '../../../APICore.js';
import {FieldOperatorType, FieldValueType} from '../../Enums.js';
import {New} from '../../BaseInterfaces.js';
import ProductListing from '../ProductListing.js';
import {ProductListingModel} from '../ProductListingInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('ProductListings', () => {
    const catalogId = 'catalogId';
    let productListing: ProductListing;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        productListing = new ProductListing(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the base product listings url of a catalog', () => {
            productListing.list(catalogId, {page: 2, perPage: 10});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings?page=2&pageSize=10`
            );
        });
    });

    describe('create', () => {
        it('should make a POST call to the base product listing url of a catalog', () => {
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

            productListing.create(catalogId, productListingModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings`,
                productListingModel
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific product listing url of a catalog', () => {
            const productListingToDeleteId = 'product-listing-to-be-deleted';
            productListing.delete(catalogId, productListingToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingToDeleteId}`
            );
        });
    });

    describe('get product listing for a catalog', () => {
        it('should make a GET call to the specific product listing url of a catalog', () => {
            const productListingToGetId = 'product-listing-to-be-fetched';
            productListing.get(catalogId, productListingToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingToGetId}`
            );
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific product listing url of a catalog', () => {
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

            productListing.update(catalogId, productListingModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${ProductListing.baseCatalogsUrl}/${catalogId}/productlistings/${productListingModel.id}`,
                productListingModel
            );
        });
    });

    describe('get product listings grouped by catalog', () => {
        it('should make a GET call to a specific url on the product listing base path', () => {
            productListing.getByCatalog();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListing.baseProductListingsUrl}/catalogs`);
        });
    });

    describe('get urls to query product listings', () => {
        it('should make a GET call to a specific url on the product listing base path', () => {
            productListing.getUrls();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ProductListing.baseProductListingsUrl}/urls`);
        });
    });
});
