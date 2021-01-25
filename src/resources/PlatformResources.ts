import API from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import AWS from './AWS/AWS';
import CaseAssistConfig from './CaseAssistConfigs/CaseAssistConfig';
import Catalog from './Catalogs/Catalog';
import CatalogConfiguration from './Catalogs/CatalogConfiguration';
import Cluster from './Clusters/Cluster';
import CrawlingModule from './CrawlingModule/CrawlingModule';
import Extensions from './Extensions/Extensions';
import Field from './Fields/Fields';
import Global from './Global/Global';
import GlobalGroup from './GlobalGroups/GlobalGroup';
import Group from './Groups/Groups';
import Index from './Indexes/Indexes';
import License from './License/License';
import Limits from './Limits/Limits';
import Logs from './Logs/Logs';
import MachineLearning from './MachineLearning/MachineLearning';
import Notifications from './Notification/notification';
import Organization from './Organizations/Organization';
import Pipelines from './Pipelines/Pipelines';
import Resource from './Resource';
import ResourceSnapshots from './ResourceSnapshots/ResourceSnapshots';
import Saml from './Saml/Saml';
import SchemaService from './SchemaService/SchemaService';
import Search from './Search/Search';
import SearchPages from './SearchPages/SearchPages';
import SecurityCache from './SecurityCache/SecurityCache';
import Sources from './Sources/Sources';
import UsageAnalytics from './UsageAnalytics/UsageAnalytics';
import User from './Users/User';
import Links from './ResourceSnapshots/links/Links';
import Connectivity from './Connectivity/Connectivity';

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
    {key: 'ml', resource: MachineLearning},
    {key: 'license', resource: License},
    {key: 'limits', resource: Limits},
    {key: 'logs', resource: Logs},
    {key: 'organization', resource: Organization},
    {key: 'pipeline', resource: Pipelines},
    {key: 'resourceSnapshot', resource: ResourceSnapshots},
    {key: 'saml', resource: Saml},
    {key: 'schemaService', resource: SchemaService},
    {key: 'search', resource: Search},
    {key: 'searchPages', resource: SearchPages},
    {key: 'securityCache', resource: SecurityCache},
    {key: 'source', resource: Sources},
    {key: 'ua', resource: UsageAnalytics},
    {key: 'user', resource: User},
    {key: 'notification', resource: Notifications},
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
    ml: MachineLearning;
    license: License;
    limits: Limits;
    links: Links;
    logs: Logs;
    organization: Organization;
    pipeline: Pipelines;
    resourceSnapshot: ResourceSnapshots;
    saml: Saml;
    schemaService: SchemaService;
    search: Search;
    searchPages: SearchPages;
    securityCache: SecurityCache;
    source: Sources;
    ua: UsageAnalytics;
    user: User;
    notification: Notifications;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API, this.ServerlessAPI);
        });
    }
}

export default PlatformResources;
