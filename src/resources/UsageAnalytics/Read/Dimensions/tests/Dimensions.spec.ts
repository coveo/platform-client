import API from '../../../../../APICore';
import {DimensionEventTypes, DimensionType} from '../../../../Enums';
import Dimensions from '../Dimensions';
import {CreateCustomDimensionParams, CustomDimensionModel} from '../DimensionsInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Dimensions', () => {
    let dimensions: Dimensions;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        dimensions = new Dimensions(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Dimensions base url', () => {
            dimensions.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Dimensions.baseUrl);
        });
    });

    describe('listExportableDimensions', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.listExportableDimensions();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/exportables`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            const apiName = '🌞';
            dimensions.get(apiName);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/${apiName}`);
        });
    });

    describe('getValues', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            const dimension = '😎';
            dimensions.getValues(dimension);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/${dimension}/values`);
        });
    });

    describe('listCustomDimensions', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.listCustomDimensions(true);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom?includeOnlyParents=true`);
        });
    });

    describe('createCustomDimension', () => {
        it('should make a POST call to the specific Dimensions url', () => {
            const model: CustomDimensionModel = {
                displayName: '🆒',
                type: DimensionType.TEXT,
                path: ['Louis', 'est', 'sympa'],
            };
            const params: CreateCustomDimensionParams = {
                name: 'new-dimension',
            };

            dimensions.createCustomDimension(model, params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom?name=${params.name}`, model);
        });
    });

    describe('getCustomDimension', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            const apiName = '🥵';
            dimensions.getCustomDimension(apiName);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${apiName}`);
        });
    });

    describe('getCustomDimensionValues', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            const dimension = '🕶️';
            dimensions.getCustomDimensionValues(dimension);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${dimension}/values`);
        });
    });

    describe('updateCustomDimension', () => {
        it('should make a PUT call to the specific Dimensions url', () => {
            const apiName = '🏖️';
            const model: CustomDimensionModel = {
                displayName: '🦈',
                type: DimensionType.TEXT,
            };
            dimensions.updateCustomDimension(apiName, model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Dimensions.baseUrl}/custom/${apiName}?updatePastEvents=false`,
                model
            );
        });
    });

    describe('deleteCustomDimension', () => {
        it('should make a DELETE call to the specific Dimensions url', () => {
            const apiName = '🌊';
            dimensions.deleteCustomDimension(apiName);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${apiName}`);
        });
    });

    describe('getCustomDimensionStatus', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.getCustomDimensionStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/status`);
        });
    });

    describe('checkCustomDimensionHealth', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.checkCustomDimensionHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/monitoring/health`);
        });
    });

    describe('listUncreatedDimensions', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            const event: DimensionEventTypes = DimensionEventTypes.searches;
            dimensions.listUncreatedDimensions(event);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${event}/suggestions`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the specific Dimensions url', () => {
            dimensions.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/status`);
        });
    });
});
