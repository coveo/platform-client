import API from '../../APICore.js';
import {PlatformClientOptions} from '../../ConfigurationInterfaces.js';
import Resource from '../Resource.js';

jest.mock('../../APICore.js');

class ResourceFixture extends Resource {
    testBuildPath(route: string, params: Record<string, unknown>) {
        return super.buildPath(route, params);
    }
    getSomething() {
        return this.api.get('🏥');
    }
}

describe('Resource', () => {
    const testConfig = {
        host: 'https://some.url/',
        organizationId: 'some-org-id',
        accessToken: jest.fn(() => 'my-token'),
    } satisfies PlatformClientOptions;
    const api = new API(testConfig);
    const serverlessApi = new API(testConfig);
    let resource: ResourceFixture;

    beforeEach(() => {
        jest.clearAllMocks();
        resource = new ResourceFixture(api, serverlessApi);
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
            expect(resource.testBuildPath('/some/route', {a: ['b', 'c']})).toBe('/some/route?a=b&a=c');
        });
    });
});
