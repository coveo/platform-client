import API from '../APICore';
import {Feature, PlatformClientOptions} from '../ConfigurationInterfaces';
import PlatformClient from '../PlatformClient';
import {Resource} from '../resources';
import PlatformResources from '../resources/PlatformResources';

jest.mock('../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('PlatformClient', () => {
    const baseOptions: PlatformClientOptions = {
        accessToken: jest.fn(() => 'my-token'),
        organizationId: 'some-org',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('2 API objects are created when creating a platform instance', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledTimes(2);
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
                accessToken: baseOptions.accessToken,
            })
        );
    });

    it('should abort get requests on the API instance', () => {
        const platform = new PlatformClient(baseOptions);
        const abortGetRequestsSpy = APIMock.mock.instances[0].abortGetRequests as jest.Mock<
            ReturnType<typeof API.prototype.abortGetRequests>
        >;
        const abortServerlessGetRequestsSpy = APIMock.mock.instances[1].abortGetRequests as jest.Mock<
            ReturnType<typeof API.prototype.abortGetRequests>
        >;

        platform.abortPendingGetRequests();

        expect(abortGetRequestsSpy).toHaveBeenCalledTimes(1);
        expect(abortServerlessGetRequestsSpy).toHaveBeenCalledTimes(1);
    });

    it('should check the validity of the access token when initializing the platform client', () => {
        const checkTokenSpy = jest.spyOn(API.prototype, 'checkToken');
        const platform = new PlatformClient(baseOptions);

        platform.initialize();

        expect(checkTokenSpy).toHaveBeenCalledTimes(1);
    });

    it('should register all the resources on the platform instance', () => {
        const registerAllSpy = jest.spyOn(PlatformResources.prototype, 'registerAll');
        new PlatformClient(baseOptions);

        expect(registerAllSpy).toHaveBeenCalledTimes(1);
    });

    describe('withFeatures', () => {
        it('should create a copy of the client with the new feature', async () => {
            const feature: Feature = jest.fn((currentOptions) => currentOptions);
            const client = new PlatformClient(baseOptions);

            const clientWithFeature = client.withFeatures(feature);

            expect(clientWithFeature).toBeInstanceOf(PlatformClient);
            expect(clientWithFeature).not.toBe(client);
        });

        it('should execute the feature', async () => {
            const feature: Feature = jest.fn((currentOptions) => currentOptions);
            const client = new PlatformClient(baseOptions);

            client.withFeatures(feature);

            expect(feature).toHaveBeenCalled();
        });

        it('should execute all the features', async () => {
            const feature1: Feature = jest.fn((currentOptions) => currentOptions);
            const feature2: Feature = jest.fn((currentOptions) => currentOptions);
            const client = new PlatformClient(baseOptions);

            client.withFeatures(feature1, feature2);

            expect(feature1).toHaveBeenCalled();
            expect(feature2).toHaveBeenCalled();
        });
    });

    describe('extending the client', () => {
        it('allows extending the client with experimental features', () => {
            const listSomethingSpy = jest.fn();
            class Something extends Resource {
                list() {
                    listSomethingSpy();
                }
            }

            const experimentalResources: Array<{key: string; resource: typeof Resource}> = [
                {key: 'something', resource: Something},
            ];

            class ExperimentalPlatformClient extends PlatformClient {
                something: Something;
                constructor(options: PlatformClientOptions) {
                    super(options);
                    experimentalResources.forEach(({key, resource}) => {
                        this[key] = new resource(this.API, this.ServerlessAPI);
                    });
                }
            }

            const experimentalClient = new ExperimentalPlatformClient(baseOptions);
            experimentalClient.something.list();
            expect(listSomethingSpy).toHaveBeenCalledTimes(1);
        });
    });
});
