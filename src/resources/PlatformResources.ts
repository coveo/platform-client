import Access from './OrganizationAccess/Access.js';
import Activity from './Activities/Activities.js';
import API from '../APICore.js';
import ApiKey from './ApiKeys/ApiKeys.js';
import AWS from './AWS/AWS.js';
import CaseAssistConfig from './CaseAssistConfigs/CaseAssistConfig.js';
import Catalog from './Catalogs/Catalog.js';
import CatalogConfiguration from './Catalogs/CatalogConfiguration.js';
import Cluster from './Clusters/Cluster.js';
import Connectivity from './Connectivity/Connectivity.js';
import CrawlingModule from './CrawlingModule/CrawlingModule.js';
import Extensions from './Extensions/Extensions.js';
import Field from './Fields/Fields.js';
import Global from './Global/Global.js';
import GlobalGroup from './GlobalGroups/GlobalGroup.js';
import Group from './Groups/Groups.js';
import Index from './Indexes/Indexes.js';
import InProductExperiences from './InProductExperiences/InProductExperiences.js';
import InsightPanelConfig from './InsightPanelConfigs/InsightPanelConfig.js';
import InsightPanelInterface from './InsightPanelInterfaces/InsightPanelInterface.js';
import Invites from './Invites/Invites.js';
import IPXInterface from './IPXInterfaces/IPXInterface.js';
import License from './License/License.js';
import Limits from './Limits/Limits.js';
import Links from './Links/Links.js';
import Logs from './Logs/Logs.js';
import MachineLearning from './MachineLearning/MachineLearning.js';
import ModifierTemplates from './ModifierTemplates/ModifierTemplates.js';
import Notifications from './Notification/notification.js';
import Organization from './Organizations/Organization.js';
import Pipelines from './Pipelines/Pipelines.js';
import PrivilegeEvaluator from './PrivilegeEvaluator/PrivilegeEvaluator.js';
import ProductListing from './Catalogs/ProductListing.js';
import ProductListingConfiguration from './Catalogs/ProductListingConfiguration.js';
import Products from './Products/Product.js';
import PushApi from './PushApi/PushApi.js';
import Resource from './Resource.js';
import ResourceSnapshots from './ResourceSnapshots/ResourceSnapshots.js';
import Saml from './Saml/Saml.js';
import SchemaService from './SchemaService/SchemaService.js';
import Search from './Search/Search.js';
import SearchInterfaces from './SearchInterfaces/SearchInterfaces.js';
import SearchPages from './SearchPages/SearchPages.js';
import NextGenSearchPages from './NextGenSearchPages/NextGenSearchPages.js';
import SearchUsageMetrics from './SearchUsageMetrics/SearchUsageMetrics.js';
import SecurityCache from './SecurityCache/SecurityCache.js';
import Sources from './Sources/Sources.js';
import UsageAnalytics from './UsageAnalytics/UsageAnalytics.js';
import User from './Users/User.js';
import Vaults from './Vaults/Vaults.js';
import HostedPages from './HostedPages/HostedPages.js';
import SearchAnalysis from './SearchAnalysis/SearchAnalysis.js';
import Project from './Projects/Project.js';
import Resources from './Resources/Resources.js';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'activity', resource: Activity},
    {key: 'apiKey', resource: ApiKey},
    {key: 'aws', resource: AWS},
    {key: 'caseAssistConfig', resource: CaseAssistConfig},
    {key: 'catalog', resource: Catalog},
    {key: 'catalogConfiguration', resource: CatalogConfiguration},
    {key: 'cluster', resource: Cluster},
    {key: 'connectivity', resource: Connectivity},
    {key: 'crawlingModule', resource: CrawlingModule},
    {key: 'extension', resource: Extensions},
    {key: 'field', resource: Field},
    {key: 'global', resource: Global},
    {key: 'globalGroup', resource: GlobalGroup},
    {key: 'group', resource: Group},
    {key: 'hostedPages', resource: HostedPages},
    {key: 'index', resource: Index},
    {key: 'insightPanelConfig', resource: InsightPanelConfig},
    {key: 'insightPanelInterface', resource: InsightPanelInterface},
    {key: 'invites', resource: Invites},
    {key: 'ipx', resource: InProductExperiences},
    {key: 'ipxInterface', resource: IPXInterface},
    {key: 'license', resource: License},
    {key: 'limits', resource: Limits},
    {key: 'links', resource: Links},
    {key: 'logs', resource: Logs},
    {key: 'ml', resource: MachineLearning},
    {key: 'modifierTemplates', resource: ModifierTemplates},
    {key: 'notification', resource: Notifications},
    {key: 'organization', resource: Organization},
    {key: 'organizationAccess', resource: Access},
    {key: 'pipeline', resource: Pipelines},
    {key: 'privilegeEvaluator', resource: PrivilegeEvaluator},
    {key: 'productListing', resource: ProductListing},
    {key: 'productListingConfiguration', resource: ProductListingConfiguration},
    {key: 'products', resource: Products},
    {key: 'pushApi', resource: PushApi},
    {key: 'resourceSnapshot', resource: ResourceSnapshots},
    {key: 'saml', resource: Saml},
    {key: 'schemaService', resource: SchemaService},
    {key: 'search', resource: Search},
    {key: 'searchInterfaces', resource: SearchInterfaces},
    {key: 'searchPages', resource: SearchPages},
    {key: 'nextGenSearchPages', resource: NextGenSearchPages},
    {key: 'searchUsageMetrics', resource: SearchUsageMetrics},
    {key: 'securityCache', resource: SecurityCache},
    {key: 'source', resource: Sources},
    {key: 'ua', resource: UsageAnalytics},
    {key: 'user', resource: User},
    {key: 'vault', resource: Vaults},
    {key: 'notification', resource: Notifications},
    {key: 'privilegeEvaluator', resource: PrivilegeEvaluator},
    {key: 'searchAnalysis', resource: SearchAnalysis},
    {key: 'project', resource: Project},
    {key: 'resources', resource: Resources},
];

class PlatformResources {
    protected API: API;
    protected ServerlessAPI: API;

    activity: Activity;
    apiKey: ApiKey;
    aws: AWS;
    caseAssistConfig: CaseAssistConfig;
    catalog: Catalog;
    catalogConfiguration: CatalogConfiguration;
    cluster: Cluster;
    crawlingModule: CrawlingModule;
    connectivity: Connectivity;
    extension: Extensions;
    field: Field;
    global: Global;
    globalGroup: GlobalGroup;
    group: Group;
    hostedPages: HostedPages;
    index: Index;
    insightPanelConfig: InsightPanelConfig;
    insightPanelInterface: InsightPanelInterface;
    invites: Invites;
    ipx: InProductExperiences;
    ipxInterface: IPXInterface;
    license: License;
    limits: Limits;
    links: Links;
    logs: Logs;
    ml: MachineLearning;
    modifierTemplates: ModifierTemplates;
    notification: Notifications;
    organization: Organization;
    organizationAccess: Access;
    pipeline: Pipelines;
    privilegeEvaluator: PrivilegeEvaluator;
    productListing: ProductListing;
    productListingConfiguration: ProductListingConfiguration;
    products: Products;
    pushApi: PushApi;
    resourceSnapshot: ResourceSnapshots;
    saml: Saml;
    schemaService: SchemaService;
    search: Search;
    searchInterfaces: SearchInterfaces;
    searchPages: SearchPages;
    nextGenSearchPages: NextGenSearchPages;
    searchUsageMetrics: SearchUsageMetrics;
    securityCache: SecurityCache;
    source: Sources;
    ua: UsageAnalytics;
    user: User;
    vault: Vaults;
    project: Project;
    resources: Resources;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API, this.ServerlessAPI);
        });
    }
}

export default PlatformResources;
