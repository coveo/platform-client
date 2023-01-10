import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import {ProductsSortByType, ProductsFacetRequestSortType, SortingOrder} from '../../Enums.js';
import Products from '../Product.js';
import {ProductsRequestModel} from '../ProductInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Product', () => {
    let products: Products;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        products = new Products(api, serverlessApi);
    });

    describe('getProducts', () => {
        it('should make a POST call to to retrieve filtered products', () => {
            const query: New<ProductsRequestModel> = {
                additionalFields: ['brand', 'store'],
                advancedFiltersModel: {
                    queryFilter:
                        '$qre(expression: @objecttype==Product @ec_brand=="Old·Navy", modifier: \'1000\', isConstant: true)',
                },
                advancedParameters: {
                    debug: false,
                    viewAllContent: false,
                },
                clientId: '1234-5678-9012',
                facets: {
                    options: {
                        enableIndexFacetOrdering: false,
                        freezeFacetOrder: false,
                    },
                    requests: [
                        {
                            currentValues: [],
                            customOrder: [],
                            facetId: '1234',
                            field: 'ec_brand',
                            isFieldExpanded: true,
                            numberOfValues: 15,
                            preventAutoSelect: false,
                            sortCriteria: ProductsFacetRequestSortType.alphanumeric,
                        },
                    ],
                },
                pagination: {
                    page: 0,
                    numberOfValues: 100,
                },
                sort: {
                    by: ProductsSortByType.relevance,
                    fields: [
                        {
                            name: 'ec_brand',
                            direction: SortingOrder.ASC,
                        },
                    ],
                },
                url: 'https://fashion.coveodemo.com/browse/men/hats',
            };
            products.get(query);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Products.baseUrl}/listing?refreshCache=false`, query);
        });
    });

    describe('getProducts while force refreshing the product listings cache', () => {
        it('should make a POST call to to retrieve filtered products', () => {
            const query: New<ProductsRequestModel> = {
                url: 'https://fashion.coveodemo.com/browse/men/hats',
            };
            products.get(query, true);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Products.baseUrl}/listing?refreshCache=true`, query);
        });
    });
});
