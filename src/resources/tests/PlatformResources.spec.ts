import ApiKey from '../ApiKeys/ApiKeys.js';
import AWS from '../AWS/AWS.js';
import CaseAssistConfig from '../CaseAssistConfigs/CaseAssistConfig.js';
import Catalog from '../Catalogs/Catalog.js';
import CatalogConfiguration from '../Catalogs/CatalogConfiguration.js';
import Cluster from '../Clusters/Cluster.js';
import CrawlingModule from '../CrawlingModule/CrawlingModule.js';
import Extension from '../Extensions/Extensions.js';
import Field from '../Fields/Fields.js';
import Global from '../Global/Global.js';
import GlobalGroup from '../GlobalGroups/GlobalGroup.js';
import Group from '../Groups/Groups.js';
import Limits from '../Limits/Limits.js';
import MachineLearning from '../MachineLearning/MachineLearning.js';
import License from '../License/License.js';
import Organization from '../Organizations/Organization.js';
import Pipelines from '../Pipelines/Pipelines.js';
import PlatformResources from '../PlatformResources.js';
import ResourceSnapshots from '../ResourceSnapshots/ResourceSnapshots.js';
import Saml from '../Saml/Saml.js';
import Search from '../Search/Search.js';
import SecurityCache from '../SecurityCache/SecurityCache.js';
import Sources from '../Sources/Sources.js';
import UsageAnalytics from '../UsageAnalytics/UsageAnalytics.js';
import User from '../Users/User.js';
import SchemaService from '../SchemaService/SchemaService.js';
import SearchPages from '../SearchPages/SearchPages.js';
import Notifications from '../Notification/notification.js';
import Logs from '../Logs/Logs.js';
import Connectivity from '../Connectivity/Connectivity.js';
import SearchInterfaces from '../SearchInterfaces/SearchInterfaces.js';
import InProductExperiences from '../InProductExperiences/InProductExperiences.js';
import HostedPages from '../HostedPages/HostedPages.js';
import ProductListingConfiguration from '../ProductListingConfiguration/ProductListingConfiguration.js';
import ProductListingMetrics from '../ProductListingMetrics/ProductListingMetrics.js';
import ProductListingReportingMetrics from '../ProductListingMetrics/ProductListingReportingMetrics.js';

describe('PlatformResources', () => {
    describe('registerAll', () => {
        it('should register the aws resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.aws).toBeDefined();
            expect(platformResources.aws).toBeInstanceOf(AWS);
        });

        it('should register the caseAssistConfig resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.caseAssistConfig).toBeDefined();
            expect(platformResources.caseAssistConfig).toBeInstanceOf(CaseAssistConfig);
        });

        it('should register the catalog resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.catalog).toBeDefined();
            expect(platformResources.catalog).toBeInstanceOf(Catalog);
        });

        it('should register the catalogConfiguration resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.catalogConfiguration).toBeDefined();
            expect(platformResources.catalogConfiguration).toBeInstanceOf(CatalogConfiguration);
        });

        it('should register the productListing resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.productListingMetrics).toBeDefined();
            expect(platformResources.productListingMetrics).toBeInstanceOf(ProductListingMetrics);
        });
        it('should register the productListingConfiguration resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.productListingConfiguration).toBeDefined();
            expect(platformResources.productListingConfiguration).toBeInstanceOf(ProductListingConfiguration);
        });
        it('should register the productListingReportingMetrics resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.productListingReportingMetrics).toBeDefined();
            expect(platformResources.productListingReportingMetrics).toBeInstanceOf(ProductListingReportingMetrics);
        });
        it('should register the cluster resource on the platform instance', () => {
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

        it('should register the license resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.license).toBeDefined();
            expect(platformResources.license).toBeInstanceOf(License);
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

        it('should register the schemaService resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.schemaService).toBeDefined();
            expect(platformResources.schemaService).toBeInstanceOf(SchemaService);
        });

        it('should register the searchPages resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.searchPages).toBeDefined();
            expect(platformResources.searchPages).toBeInstanceOf(SearchPages);
        });

        it('should register the limits resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.limits).toBeDefined();
            expect(platformResources.limits).toBeInstanceOf(Limits);
        });

        it('should register the Notification resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.notification).toBeDefined();
            expect(platformResources.notification).toBeInstanceOf(Notifications);
        });

        it('should register the Logs resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.logs).toBeDefined();
            expect(platformResources.logs).toBeInstanceOf(Logs);
        });

        it('should register the Connectivity resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.connectivity).toBeDefined();
            expect(platformResources.connectivity).toBeInstanceOf(Connectivity);
        });

        it('should register the Search Interfaces resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.searchInterfaces).toBeDefined();
            expect(platformResources.searchInterfaces).toBeInstanceOf(SearchInterfaces);
        });

        it('should register the In Product Experiences resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.ipx).toBeDefined();
            expect(platformResources.ipx).toBeInstanceOf(InProductExperiences);
        });

        it('should register the Hosted Pages resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.hostedPages).toBeDefined();
            expect(platformResources.hostedPages).toBeInstanceOf(HostedPages);
        });
    });
});
