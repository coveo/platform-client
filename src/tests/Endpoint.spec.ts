import getEndpoint, {Environment, Region} from '../Endpoints';

describe('Endpoint', () => {
    it('should return the prod US endpoint by default', () => {
        expect(getEndpoint()).toBe('https://platform.cloud.coveo.com');
    });

    describe('development environment', () => {
        it('should return the development US endpoint when no region is specified', () => {
            expect(getEndpoint(Environment.dev)).toBe('https://platformdev.cloud.coveo.com');
        });

        it('should not add a region suffix for the US region', () => {
            expect(getEndpoint(Environment.dev, Region.US)).toBe('https://platformdev.cloud.coveo.com');
        });

        it('should return the endpoint corresponding to each specified environment and region', () => {
            expect(getEndpoint(Environment.dev, Region.EU)).toBe('https://platformdev-eu.cloud.coveo.com');
            expect(getEndpoint(Environment.dev, Region.AU)).toBe('https://platformdev-au.cloud.coveo.com');
        });
    });

    describe('staging environment', () => {
        it('should return the development US endpoint when no region is specified', () => {
            expect(getEndpoint(Environment.staging)).toBe('https://platformqa.cloud.coveo.com');
        });

        it('should not add a region suffix for the US region', () => {
            expect(getEndpoint(Environment.staging, Region.US)).toBe('https://platformqa.cloud.coveo.com');
        });

        it('should return the endpoint corresponding to each specified environment and region', () => {
            expect(getEndpoint(Environment.staging, Region.EU)).toBe('https://platformqa-eu.cloud.coveo.com');
            expect(getEndpoint(Environment.staging, Region.AU)).toBe('https://platformqa-au.cloud.coveo.com');
        });
    });

    describe('prod environment', () => {
        it('should return the development US endpoint when no region is specified', () => {
            expect(getEndpoint(Environment.prod)).toBe('https://platform.cloud.coveo.com');
        });

        it('should not add a region suffix for the US region', () => {
            expect(getEndpoint(Environment.prod, Region.US)).toBe('https://platform.cloud.coveo.com');
        });

        it('should return the endpoint corresponding to each specified environment and region', () => {
            expect(getEndpoint(Environment.prod, Region.EU)).toBe('https://platform-eu.cloud.coveo.com');
            expect(getEndpoint(Environment.prod, Region.AU)).toBe('https://platform-au.cloud.coveo.com');
        });
    });

    describe('hipaa environment', () => {
        it('should return the development US endpoint when no region is specified', () => {
            expect(getEndpoint(Environment.hipaa)).toBe('https://platformhipaa.cloud.coveo.com');
        });

        it('should not add a region suffix for any region', () => {
            expect(getEndpoint(Environment.hipaa, Region.US)).toBe('https://platformhipaa.cloud.coveo.com');
            expect(getEndpoint(Environment.hipaa, Region.EU)).toBe('https://platformhipaa.cloud.coveo.com');
            expect(getEndpoint(Environment.hipaa, Region.AU)).toBe('https://platformhipaa.cloud.coveo.com');
        });
    });
});
