import getEndpoint, {Environment, Region} from '../Endpoints';

describe('Endpoint', () => {
    describe('platform endpoint', () => {
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

    describe('api endpoint', () => {
        it('should return the prod US endpoint by default', () => {
            expect(getEndpoint(undefined, undefined, true)).toBe('https://api.cloud.coveo.com');
        });

        describe('development environment', () => {
            it('should return the development US endpoint when no region is specified', () => {
                expect(getEndpoint(Environment.dev, undefined, true)).toBe('https://apidev.cloud.coveo.com');
            });

            it('should not add a region suffix for the US region', () => {
                expect(getEndpoint(Environment.dev, Region.US, true)).toBe('https://apidev.cloud.coveo.com');
            });

            it('should return the endpoint corresponding to each specified environment and region', () => {
                expect(getEndpoint(Environment.dev, Region.EU, true)).toBe('https://apidev-eu.cloud.coveo.com');
                expect(getEndpoint(Environment.dev, Region.AU, true)).toBe('https://apidev-au.cloud.coveo.com');
            });
        });

        describe('staging environment', () => {
            it('should return the development US endpoint when no region is specified', () => {
                expect(getEndpoint(Environment.staging, undefined, true)).toBe('https://apiqa.cloud.coveo.com');
            });

            it('should not add a region suffix for the US region', () => {
                expect(getEndpoint(Environment.staging, Region.US, true)).toBe('https://apiqa.cloud.coveo.com');
            });

            it('should return the endpoint corresponding to each specified environment and region', () => {
                expect(getEndpoint(Environment.staging, Region.EU, true)).toBe('https://apiqa-eu.cloud.coveo.com');
                expect(getEndpoint(Environment.staging, Region.AU, true)).toBe('https://apiqa-au.cloud.coveo.com');
            });
        });

        describe('prod environment', () => {
            it('should return the development US endpoint when no region is specified', () => {
                expect(getEndpoint(Environment.prod, undefined, true)).toBe('https://api.cloud.coveo.com');
            });

            it('should not add a region suffix for the US region', () => {
                expect(getEndpoint(Environment.prod, Region.US, true)).toBe('https://api.cloud.coveo.com');
            });

            it('should return the endpoint corresponding to each specified environment and region', () => {
                expect(getEndpoint(Environment.prod, Region.EU, true)).toBe('https://api-eu.cloud.coveo.com');
                expect(getEndpoint(Environment.prod, Region.AU, true)).toBe('https://api-au.cloud.coveo.com');
            });
        });

        describe('hipaa environment', () => {
            it('should return the development US endpoint when no region is specified', () => {
                expect(getEndpoint(Environment.hipaa, undefined, true)).toBe('https://apihipaa.cloud.coveo.com');
            });

            it('should not add a region suffix for any region', () => {
                expect(getEndpoint(Environment.hipaa, Region.US, true)).toBe('https://apihipaa.cloud.coveo.com');
                expect(getEndpoint(Environment.hipaa, Region.EU, true)).toBe('https://apihipaa.cloud.coveo.com');
                expect(getEndpoint(Environment.hipaa, Region.AU, true)).toBe('https://apihipaa.cloud.coveo.com');
            });
        });
    });
});
