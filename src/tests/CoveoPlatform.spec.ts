import CoveoPlatform, {CoveoPlatformOptions} from '../CoveoPlatform';

describe('CoveoPlatform', () => {
    const tokenRetriever = jest.fn(() => 'my-token');
    const options: CoveoPlatformOptions = {
        accessTokenRetriever: tokenRetriever,
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
            expect(platform.catalog).toBeDefined();
        });
    });
});
