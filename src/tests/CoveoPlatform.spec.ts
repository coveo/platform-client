import CoveoPlatform, {CoveoPlatformOptions} from '../CoveoPlatform';

describe('CoveoPlatform', () => {
    const tokenRetriever = jest.fn(() => 'my-token');
    const options: CoveoPlatformOptions = {
        accessTokenRetreiver: tokenRetriever,
        organizationId: 'some-org',
    };

    beforeEach(() => {
        global.fetch.resetMocks();
        tokenRetriever.mockClear();
    });

    describe('initialize', () => {
        test('should check if the retrieved token is valid', async () => {
            const platform = new CoveoPlatform(options);
            const fetchMock = global.fetch.mockResponseOnce(JSON.stringify({username: 'xyz'}));

            await platform.initialize();
            expect(fetchMock).toHaveBeenCalledTimes(1);

            const [url, init] = fetchMock.mock.calls[0];
            expect(url).toMatch(new RegExp('/oauth/check_token$'));
            expect(JSON.parse(init.body).token).toBe('my-token');
        });

        test('should throw an error if the check token call fails', async () => {
            const platform = new CoveoPlatform(options);
            global.fetch.mockRejectOnce(new Error('not true equals false'));

            try {
                await platform.initialize();
            } catch (err) {
                expect(err.message).toBe('not true equals false');
            }

            expect.assertions(1);
        });
    });

    describe('resources', () => {
        test('should be possible to access the platform resources', async () => {
            const platform = new CoveoPlatform(options);
            expect(platform.activities).toBeDefined();
            expect(platform.catalog).toBeDefined();
            expect(platform.crawlingModule).toBeDefined();
            expect(platform.criticalUpdates).toBeDefined();
            expect(platform.fields).toBeDefined();
            expect(platform.indexes).toBeDefined();
            expect(platform.license).toBeDefined();
            expect(platform.limits).toBeDefined();
            expect(platform.organizations).toBeDefined();
            expect(platform.securityCache).toBeDefined();
            expect(platform.securityProviders).toBeDefined();
            expect(platform.snapshots).toBeDefined();
            expect(platform.usageAnalytics.administration).toBeDefined();
            expect(platform.usageAnalytics.dimensions).toBeDefined();
            expect(platform.usageAnalytics.exports).toBeDefined();
            expect(platform.usageAnalytics.filters).toBeDefined();
            expect(platform.usageAnalytics.groups).toBeDefined();
            expect(platform.usageAnalytics.metrics).toBeDefined();
            expect(platform.usageAnalytics.reports).toBeDefined();
            expect(platform.usageAnalytics.statistics).toBeDefined();
            expect(platform.usageAnalytics.users).toBeDefined();
        });
    });
});
