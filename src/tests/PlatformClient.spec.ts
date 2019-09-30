import API from '../APICore';
import {PlatformClientOptions} from '../ConfigurationInterfaces';
import PlatformClient from '../PlatformClient';
import PlatformResources from '../resources/PlatformResources';

jest.mock('../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('PlatformClient', () => {
    const baseOptions: PlatformClientOptions = {
        accessTokenRetriever: jest.fn(() => 'my-token'),
        organizationId: 'some-org',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error when the host is undefined', () => {
        expect(() => {
            new PlatformClient({...baseOptions, environment: 'unknown-environment'});
        }).toThrow();
    });

    test('an API object is created when creating a platform instance', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledTimes(1);
    });

    test('the API uses the production host if no environment option is provided', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: PlatformClient.Hosts[PlatformClient.Environments.prod],
            })
        );
    });

    test('the API uses the host associated with the environment specified in the options', () => {
        new PlatformClient({...baseOptions, environment: PlatformClient.Environments.dev});
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: PlatformClient.Hosts[PlatformClient.Environments.dev],
            })
        );
    });

    test('the API uses the custom host specified in the options if any', () => {
        const myCustomHost = 'localhost:9999/my-api-running-locally';
        new PlatformClient({...baseOptions, host: myCustomHost});
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                host: myCustomHost,
            })
        );
    });

    test('the API uses the organization id specified in the options', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                organizationId: baseOptions.organizationId,
            })
        );
    });

    test('the API uses the accessTokenRetriever function specified in the options', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                accessTokenRetriever: baseOptions.accessTokenRetriever,
            })
        );
    });

    it('should register all the resources on the platform instance', () => {
        const registerAllSpy = spyOn(PlatformResources.prototype, 'registerAll');
        new PlatformClient(baseOptions);

        expect(registerAllSpy).toHaveBeenCalledTimes(1);
    });

    describe('initialize', () => {
        const mockedFormData = {
            set: jest.fn(),
        };

        beforeEach(() => {
            (global as any).FormData = jest.fn(() => mockedFormData);
        });

        it('should check if the retrieved token is valid', async () => {
            const platform = new PlatformClient(baseOptions);
            const APIMockInstance = APIMock.mock.instances[0];

            await platform.initialize();

            expect(APIMockInstance.postForm).toHaveBeenCalledTimes(1);
            expect(APIMockInstance.postForm).toHaveBeenCalledWith('/oauth/check_token', mockedFormData);
            expect(mockedFormData.set).toHaveBeenCalledTimes(1);
            expect(mockedFormData.set).toHaveBeenCalledWith('token', baseOptions.accessTokenRetriever());
        });

        it('should throw an error if the check token call fails', async () => {
            const platform = new PlatformClient(baseOptions);
            const APIPostFormMock: jest.Mock<ReturnType<typeof API.prototype.postForm>> = APIMock.mock.instances[0]
                .postForm as any;
            APIPostFormMock.mockRejectedValue(new Error('invalid token'));

            try {
                await platform.initialize();
            } catch (err) {
                expect(err.message).toBe('invalid token');
            }

            expect.assertions(1);
        });
    });
});
