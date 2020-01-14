import API, {IAPI} from '../../APICore';
import Resource from '../Resource';

jest.mock('../../APICore');

const APIMock: jest.Mock<API> = API as any;

class ResourceFixture extends Resource {
    testBuildPath(route: string, params: object) {
        return super.buildPath(route, params);
    }
    getSomething() {
        return this.api.get('🏥');
    }
}

describe('Resource', () => {
    const api = new APIMock() as jest.Mocked<API>;
    let resource: ResourceFixture;

    beforeEach(() => {
        jest.clearAllMocks();
        resource = new ResourceFixture(api);
    });

    describe('buildPath', () => {
        it('should not add any query parameter string when no parameters are specified', () => {
            expect(resource.testBuildPath('/some/route', {})).toBe('/some/route');
        });

        it('should not add parameters with empty values as query parameter', () => {
            expect(resource.testBuildPath('/some/route', {a: undefined})).toBe('/some/route');
            expect(resource.testBuildPath('/some/route', {a: null})).toBe('/some/route');
            expect(resource.testBuildPath('/some/route', {a: ''})).toBe('/some/route');
        });

        it('should convert the parameter object to query parameters string and add it to the route', () => {
            expect(resource.testBuildPath('/some/route', {a: false})).toBe('/some/route?a=false');
            expect(resource.testBuildPath('/some/route', {a: 0})).toBe('/some/route?a=0');
            expect(resource.testBuildPath('/some/route', {a: 'b', c: 'd'})).toBe('/some/route?a=b&c=d');
            expect(resource.testBuildPath('/some/route', {a: ['b', 'c']})).toBe('/some/route?a=b%2Cc');
        });
    });

    describe('withFeatures', () => {
        it('should call the feature with the initial API', () => {
            const feature = jest.fn((resourceApi: IAPI) => resourceApi);

            resource.withFeatures(feature);

            expect(feature).toHaveBeenCalledWith(api);
        });

        it('should call all the features with the initial API', () => {
            const firstFeature = jest.fn((resourceApi: IAPI) => resourceApi);
            const secondFeature = jest.fn((resourceApi: IAPI) => resourceApi);

            resource.withFeatures(firstFeature, secondFeature);

            expect(firstFeature).toHaveBeenCalledWith(api);
            expect(secondFeature).toHaveBeenCalledWith(api);
        });

        it('should call the new api when accessing the resources', async () => {
            const apiThatShouldWrapTheInitialOne = new APIMock();
            const feature = jest.fn(() => apiThatShouldWrapTheInitialOne);

            const wrappedResource = resource.withFeatures(feature);

            await wrappedResource.getSomething();

            expect(apiThatShouldWrapTheInitialOne.get).toHaveBeenCalled();
        });

        it('should not call the new api when accessing the resource without the feature', async () => {
            const apiThatShouldWrapTheInitialOne = new APIMock();
            const feature = jest.fn(() => apiThatShouldWrapTheInitialOne);

            resource.withFeatures(feature);

            await resource.getSomething();

            expect(apiThatShouldWrapTheInitialOne.get).not.toHaveBeenCalled();
        });
    });
});
