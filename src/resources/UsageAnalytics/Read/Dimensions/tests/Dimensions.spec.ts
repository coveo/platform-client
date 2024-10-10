import API from '../../../../../APICore.js';
import {DimensionEventTypes, DimensionType} from '../../../../Enums.js';
import Dimensions from '../Dimensions.js';
import {CreateCustomDimensionParams, CustomDimensionModel} from '../DimensionsInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Dimensions', () => {
    let dimensions: Dimensions;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        dimensions = new Dimensions(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Dimensions base url', async () => {
            await dimensions.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Dimensions.baseUrl);
        });
    });

    describe('listExportableDimensions', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.listExportableDimensions();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/exportables`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            const apiName = '🌞';
            await dimensions.get(apiName);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/${apiName}`);
        });
    });

    describe('getValues', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            const dimension = '😎';
            await dimensions.getValues(dimension);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/${dimension}/values`);
        });
    });

    describe('listCustomDimensions', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.listCustomDimensions(true);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom?includeOnlyParents=true`);
        });
    });

    describe('createCustomDimension', () => {
        it('should make a POST call to the specific Dimensions url', async () => {
            const model: CustomDimensionModel = {
                displayName: '🆒',
                type: DimensionType.TEXT,
                path: ['Louis', 'est', 'sympa'],
            };
            const params: CreateCustomDimensionParams = {
                name: 'new-dimension',
            };

            await dimensions.createCustomDimension(model, params);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom?name=${params.name}`, model);
        });
    });

    describe('getCustomDimension', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            const apiName = '🥵';
            await dimensions.getCustomDimension(apiName);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${apiName}`);
        });
    });

    describe('getCustomDimensionValues', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            const dimension = '🕶️';
            await dimensions.getCustomDimensionValues(dimension);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${dimension}/values`);
        });
    });

    describe('updateCustomDimension', () => {
        it('should make a PUT call to the specific Dimensions url', async () => {
            const apiName = '🏖️';
            const model: CustomDimensionModel = {
                displayName: '🦈',
                type: DimensionType.TEXT,
            };
            await dimensions.updateCustomDimension(apiName, model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Dimensions.baseUrl}/custom/${apiName}?updatePastEvents=false`,
                model,
            );
        });
    });

    describe('deleteCustomDimension', () => {
        it('should make a DELETE call to the specific Dimensions url', async () => {
            const apiName = '🌊';
            await dimensions.deleteCustomDimension(apiName);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${apiName}`);
        });
    });

    describe('getCustomDimensionStatus', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.getCustomDimensionStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/status`);
        });
    });

    describe('checkCustomDimensionHealth', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.checkCustomDimensionHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/monitoring/health`);
        });
    });

    describe('listUncreatedDimensions', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            const event: DimensionEventTypes = DimensionEventTypes.searches;
            await dimensions.listUncreatedDimensions(event);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/custom/${event}/suggestions`);
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the specific Dimensions url', async () => {
            await dimensions.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Dimensions.baseUrl}/status`);
        });
    });
});
