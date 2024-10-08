import API from '../APICore.js';
import {Feature, PlatformClientOptions} from '../ConfigurationInterfaces.js';
import PlatformClient from '../PlatformClient.js';
import {Resource} from '../resources/index.js';
import PlatformResources from '../resources/PlatformResources.js';

jest.mock('../APICore.js');

const APIMock = jest.mocked(API);

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
            }),
        );
    });

    test('the API uses the accessTokenRetriever function specified in the options', () => {
        new PlatformClient(baseOptions);
        expect(APIMock).toHaveBeenCalledWith(
            expect.objectContaining({
                accessToken: baseOptions.accessToken,
            }),
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

    it('should check the validity of the access token when initializing the platform client', async () => {
        const checkTokenSpy = jest.spyOn(API.prototype, 'checkToken');
        const platform = new PlatformClient(baseOptions);

        await platform.initialize();

        expect(checkTokenSpy).toHaveBeenCalledTimes(1);
    });

    it('should register all the resources on the platform instance', () => {
        const registerAllSpy = jest.spyOn(PlatformResources.prototype, 'registerAll');
        new PlatformClient(baseOptions);

        expect(registerAllSpy).toHaveBeenCalledTimes(1);
    });

    describe('withFeatures', () => {
        it('should create a copy of the client with the new feature', () => {
            const feature: Feature = jest.fn((currentOptions) => currentOptions);
            const client = new PlatformClient(baseOptions);

            const clientWithFeature = client.withFeatures(feature);

            expect(clientWithFeature).toBeInstanceOf(PlatformClient);
            expect(clientWithFeature).not.toBe(client);
        });

        it('should execute the feature', () => {
            const feature: Feature = jest.fn((currentOptions) => currentOptions);
            const client = new PlatformClient(baseOptions);

            client.withFeatures(feature);

            expect(feature).toHaveBeenCalled();
        });

        it('should execute all the features', () => {
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

            const experimentalResources = [{key: 'something', resource: Something}];

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
