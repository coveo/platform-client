import API from '../APICore';
import CoveoPlatform, {CoveoPlatformOptions} from '../CoveoPlatform';
import {Resources} from '../resources/Resources';

jest.mock('../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('CoveoPlatform', () => {
    const baseOptions: CoveoPlatformOptions = {
        accessTokenRetriever: jest.fn(() => 'my-token'),
        organizationId: 'some-org',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        APIMock.mockClear();
    });

    it('should throw an error when the host is undefined', () => {
        expect(() => {
            new CoveoPlatform({...baseOptions, environment: 'unknown-environment'});
        }).toThrow();
    });

    test('an API object is created when creating a platform instance', () => {
        new CoveoPlatform(baseOptions);
        expect(APIMock).toHaveBeenCalledTimes(1);
    });

    test('the API uses the production host if no environment option is provided', () => {
        new CoveoPlatform(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: CoveoPlatform.Hosts[CoveoPlatform.Environments.prod],
            })
        );
    });

    test('the API uses the host associated with the environment specified in the options', () => {
        new CoveoPlatform({...baseOptions, environment: CoveoPlatform.Environments.dev});
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: CoveoPlatform.Hosts[CoveoPlatform.Environments.dev],
            })
        );
    });

    test('the API uses the custom host specified in the options if any', () => {
        const myCustomHost = 'localhost:9999/my-api-running-locally';
        new CoveoPlatform({...baseOptions, host: myCustomHost});
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: myCustomHost,
            })
        );
    });

    test('the API uses the organization id specified in the options', () => {
        new CoveoPlatform(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: baseOptions.organizationId,
            })
        );
    });

    test('the API uses the accessTokenRetriever function specified in the options', () => {
        new CoveoPlatform(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                accessTokenRetriever: baseOptions.accessTokenRetriever,
            })
        );
    });

    it('should register all the resources on the platform instance', () => {
        const registerAllSpy = spyOn(Resources, 'registerAll');
        new CoveoPlatform(baseOptions);

        expect(registerAllSpy).toHaveBeenCalledTimes(1);
    });

    describe('initialize', () => {
        it('should check if the retrieved token is valid', async () => {
            const platform = new CoveoPlatform(baseOptions);
            const APIMockInstance = APIMock.mock.instances[0];

            await platform.initialize();

            expect(APIMockInstance.post).toHaveBeenCalledTimes(1);
            expect(APIMockInstance.post).toHaveBeenCalledWith(
                '/oauth/check_token',
                expect.objectContaining({token: baseOptions.accessTokenRetriever()})
            );
        });

        it('should throw an error if the check token call fails', async () => {
            const platform = new CoveoPlatform(baseOptions);
            const APIPostMock: jest.Mock<ReturnType<typeof API.prototype.post>> = APIMock.mock.instances[0].post as any;
            APIPostMock.mockRejectedValue(new Error('invalid token'));

            try {
                await platform.initialize();
            } catch (err) {
                expect(err.message).toBe('invalid token');
            }

            expect.assertions(1);
        });
    });
});
