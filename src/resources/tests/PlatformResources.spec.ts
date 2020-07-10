import ApiKey from '../ApiKeys/ApiKeys';
import AWS from '../AWS/AWS';
import Catalog from '../Catalogs/Catalog';
import Cluster from '../Clusters/Cluster';
import CrawlingModule from '../CrawlingModule/CrawlingModule';
import Extension from '../Extensions/Extensions';
import Field from '../Fields/Fields';
import Global from '../Global/Global';
import GlobalGroup from '../GlobalGroups/GlobalGroup';
import Group from '../Groups/Groups';
import MachineLearning from '../MachineLearning/MachineLearning';
import Organization from '../Organizations/Organization';
import Pipelines from '../Pipelines/Pipelines';
import PlatformResources from '../PlatformResources';
import ResourceSnapshots from '../ResourceSnapshots/ResourceSnapshots';
import Saml from '../Saml/Saml';
import Search from '../Search/Search';
import SecurityCache from '../SecurityCache/SecurityCache';
import Sources from '../Sources/Sources';
import UsageAnalytics from '../UsageAnalytics/UsageAnalytics';
import User from '../Users/User';

describe('PlatformResources', () => {
    describe('registerAll', () => {
        it('should register the aws resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.aws).toBeDefined();
            expect(platformResources.aws).toBeInstanceOf(AWS);
        });

        it('should register the catalog resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.catalog).toBeDefined();
            expect(platformResources.catalog).toBeInstanceOf(Catalog);
        });

        it('should register the aws resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.cluster).toBeDefined();
            expect(platformResources.cluster).toBeInstanceOf(Cluster);
        });

        it('should register the group resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.group).toBeDefined();
            expect(platformResources.group).toBeInstanceOf(Group);
        });

        it('should register the globalGroup resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.globalGroup).toBeDefined();
            expect(platformResources.globalGroup).toBeInstanceOf(GlobalGroup);
        });

        it('should register the organization resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.organization).toBeDefined();
            expect(platformResources.organization).toBeInstanceOf(Organization);
        });

        it('should register the securityCache resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.securityCache).toBeDefined();
            expect(platformResources.securityCache).toBeInstanceOf(SecurityCache);
        });

        it('should register the apiKey resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.apiKey).toBeDefined();
            expect(platformResources.apiKey).toBeInstanceOf(ApiKey);
        });

        it('should register the ml resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.ml).toBeDefined();
            expect(platformResources.ml).toBeInstanceOf(MachineLearning);
        });

        it('should register the pipeline resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.pipeline).toBeDefined();
            expect(platformResources.pipeline).toBeInstanceOf(Pipelines);
        });

        it('should register the crawlingModule resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.crawlingModule).toBeDefined();
            expect(platformResources.crawlingModule).toBeInstanceOf(CrawlingModule);
        });

        it('should register the source resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.source).toBeDefined();
            expect(platformResources.source).toBeInstanceOf(Sources);
        });

        it('should register the extension resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.extension).toBeDefined();
            expect(platformResources.extension).toBeInstanceOf(Extension);
        });

        it('should register the field resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.field).toBeDefined();
            expect(platformResources.field).toBeInstanceOf(Field);
        });

        it('should register the saml resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.saml).toBeDefined();
            expect(platformResources.saml).toBeInstanceOf(Saml);
        });

        it('should register the user resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.user).toBeDefined();
            expect(platformResources.user).toBeInstanceOf(User);
        });

        it('should register the search resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.search).toBeDefined();
            expect(platformResources.search).toBeInstanceOf(Search);
        });

        it('should register the resource snapshots resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.resourceSnapshot).toBeDefined();
            expect(platformResources.resourceSnapshot).toBeInstanceOf(ResourceSnapshots);
        });

        it('should register the ua resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.ua).toBeDefined();
            expect(platformResources.ua).toBeInstanceOf(UsageAnalytics);
        });

        it('should register the global resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.global).toBeDefined();
            expect(platformResources.global).toBeInstanceOf(Global);
        });
    });
});
