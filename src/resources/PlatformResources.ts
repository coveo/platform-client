import API from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import AWS from './AWS/AWS';
import CaseAssistConfig from './CaseAssistConfigs/CaseAssistConfig';
import Catalog from './Catalogs/Catalog';
import CatalogConfiguration from './Catalogs/CatalogConfiguration';
import Cluster from './Clusters/Cluster';
import Connectivity from './Connectivity/Connectivity';
import CrawlingModule from './CrawlingModule/CrawlingModule';
import Extensions from './Extensions/Extensions';
import Field from './Fields/Fields';
import Global from './Global/Global';
import GlobalGroup from './GlobalGroups/GlobalGroup';
import Group from './Groups/Groups';
import Index from './Indexes/Indexes';
import InProductExperiences from './InProductExperiences/InProductExperiences';
import InsightPanelConfig from './InsightPanelConfigs/InsightPanelConfig';
import InsightPanelInterface from './InsightPanelInterfaces/InsightPanelInterface';
import License from './License/License';
import Limits from './Limits/Limits';
import Links from './Links/Links';
import Logs from './Logs/Logs';
import MachineLearning from './MachineLearning/MachineLearning';
import ModifierTemplates from './ModifierTemplates/ModifierTemplates';
import Notifications from './Notification/notification';
import Organization from './Organizations/Organization';
import Pipelines from './Pipelines/Pipelines';
import PrivilegeEvaluator from './PrivilegeEvaluator/PrivilegeEvaluator';
import ProductListing from './Catalogs/ProductListing';
import Products from './Products/Product';
import PushApi from './PushApi/PushApi';
import Resource from './Resource';
import ResourceSnapshots from './ResourceSnapshots/ResourceSnapshots';
import Saml from './Saml/Saml';
import SchemaService from './SchemaService/SchemaService';
import Search from './Search/Search';
import SearchInterfaces from './SearchInterfaces/SearchInterfaces';
import SearchPages from './SearchPages/SearchPages';
import SearchUsageMetrics from './SearchUsageMetrics/SearchUsageMetrics';
import SecurityCache from './SecurityCache/SecurityCache';
import Sources from './Sources/Sources';
import UsageAnalytics from './UsageAnalytics/UsageAnalytics';
import User from './Users/User';
import Vaults from './Vaults/Vaults';
import TableauService from './TableauService/TableauService';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
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
    {key: 'index', resource: Index},
    {key: 'insightPanelConfig', resource: InsightPanelConfig},
    {key: 'insightPanelInterface', resource: InsightPanelInterface},
    {key: 'ipx', resource: InProductExperiences},
    {key: 'license', resource: License},
    {key: 'limits', resource: Limits},
    {key: 'links', resource: Links},
    {key: 'logs', resource: Logs},
    {key: 'ml', resource: MachineLearning},
    {key: 'modifierTemplates', resource: ModifierTemplates},
    {key: 'notification', resource: Notifications},
    {key: 'organization', resource: Organization},
    {key: 'pipeline', resource: Pipelines},
    {key: 'privilegeEvaluator', resource: PrivilegeEvaluator},
    {key: 'productListing', resource: ProductListing},
    {key: 'products', resource: Products},
    {key: 'pushApi', resource: PushApi},
    {key: 'resourceSnapshot', resource: ResourceSnapshots},
    {key: 'saml', resource: Saml},
    {key: 'schemaService', resource: SchemaService},
    {key: 'search', resource: Search},
    {key: 'searchInterfaces', resource: SearchInterfaces},
    {key: 'searchPages', resource: SearchPages},
    {key: 'searchUsageMetrics', resource: SearchUsageMetrics},
    {key: 'securityCache', resource: SecurityCache},
    {key: 'source', resource: Sources},
    {key: 'ua', resource: UsageAnalytics},
    {key: 'user', resource: User},
    {key: 'vault', resource: Vaults},
    {key: 'notification', resource: Notifications},
    {key: 'privilegeEvaluator', resource: PrivilegeEvaluator},
    {key: 'tableauService', resource: TableauService},
];

class PlatformResources {
    protected API: API;
    protected ServerlessAPI: API;

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
    index: Index;
    insightPanelConfig: InsightPanelConfig;
    insightPanelInterface: InsightPanelInterface;
    ipx: InProductExperiences;
    license: License;
    limits: Limits;
    links: Links;
    logs: Logs;
    ml: MachineLearning;
    modifierTemplates: ModifierTemplates;
    notification: Notifications;
    organization: Organization;
    pipeline: Pipelines;
    privilegeEvaluator: PrivilegeEvaluator;
    productListing: ProductListing;
    products: Products;
    pushApi: PushApi;
    resourceSnapshot: ResourceSnapshots;
    saml: Saml;
    schemaService: SchemaService;
    search: Search;
    searchInterfaces: SearchInterfaces;
    searchPages: SearchPages;
    searchUsageMetrics: SearchUsageMetrics;
    securityCache: SecurityCache;
    source: Sources;
    ua: UsageAnalytics;
    user: User;
    vault: Vaults;
    tableauService: TableauService;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API, this.ServerlessAPI);
        });
    }
}

export default PlatformResources;
