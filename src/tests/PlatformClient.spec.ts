import API from '../APICore';
import {PlatformClientOptions} from '../ConfigurationInterfaces';
import {IAPIFeature} from '../features/APIFeature';
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

    it('should abort get requests on the API instance', () => {
        const platform = new PlatformClient(baseOptions);
        const abortGetRequestsSpy = APIMock.mock.instances[0].abortGetRequests as jest.Mock<
            ReturnType<typeof API.prototype.abortGetRequests>
        >;

        platform.abortPendingGetRequests();

        expect(abortGetRequestsSpy).toHaveBeenCalledTimes(1);
    });

    it('should check the validity of the access token when initializing the platform client', () => {
        const checkTokenSpy = jest.spyOn(API.prototype, 'checkToken');
        const platform = new PlatformClient(baseOptions);

        platform.initialize();

        expect(checkTokenSpy).toHaveBeenCalledTimes(1);
    });

    describe('withFeatures', () => {
        it('should create a copy of the client with the new feature', async () => {
            const feature: IAPIFeature = jest.fn((api) => api);
            const client = new PlatformClient(baseOptions);

            const clientWithFeature = client.withFeatures(feature);

            expect(clientWithFeature).not.toBe(client);
        });

        it('should execute the feature', async () => {
            const feature: IAPIFeature = jest.fn((api) => api);
            const client = new PlatformClient(baseOptions);

            client.withFeatures(feature);

            expect(feature).toHaveBeenCalled();
        });

        it('should call the new api when accessing the resource with the feature', async () => {
            const apiThatShouldWrapTheInitialOne = new APIMock();
            const feature = jest.fn(() => apiThatShouldWrapTheInitialOne);

            const client = new PlatformClient(baseOptions);

            await client.withFeatures(feature).catalog.get('someId');

            expect(apiThatShouldWrapTheInitialOne.get).toHaveBeenCalled();
        });

        it('should not call the new api when accessing the resource without the feature', async () => {
            const apiThatShouldWrapTheInitialOne = new APIMock();
            const feature = jest.fn(() => apiThatShouldWrapTheInitialOne);

            const client = new PlatformClient(baseOptions);

            client.withFeatures(feature);

            await client.catalog.get('someId');

            expect(apiThatShouldWrapTheInitialOne.get).not.toHaveBeenCalled();
        });
    });
});
