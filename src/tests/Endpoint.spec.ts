import getEndpoint, {Environment, Region} from '../Endpoints';

describe('Endpoint', () => {
    describe('platform endpoint', () => {
        it('should return the prod US endpoint by default', () => {
            expect(getEndpoint()).toBe('https://platform.cloud.coveo.com');
        });

        describe.each([
            [Environment.dev, 'platformdev'],
            [Environment.stg, 'platformstg'],
            [Environment.prod, 'platform'],
        ])('%s environment', (env: Environment, host: string) => {
            it('should return the development US endpoint when no region is specified', () => {
                expect(getEndpoint(env)).toBe(`https://${host}.cloud.coveo.com`);
            });

            it('should not add a region suffix for the US region', () => {
                expect(getEndpoint(env, Region.US)).toBe(`https://${host}.cloud.coveo.com`);
            });

            it('should return the endpoint corresponding to each specified environment and region', () => {
                expect(getEndpoint(env, Region.EU)).toBe(`https://${host}-eu.cloud.coveo.com`);
                expect(getEndpoint(env, Region.AU)).toBe(`https://${host}-au.cloud.coveo.com`);
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
