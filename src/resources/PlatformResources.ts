import API from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import AWS from './AWS/AWS';
import CaseAssistConfig from './CaseAssistConfigs/CaseAssistConfig';
import Catalog from './Catalogs/Catalog';
import Cluster from './Clusters/Cluster';
import CrawlingModule from './CrawlingModule/CrawlingModule';
import Extensions from './Extensions/Extensions';
import Field from './Fields/Fields';
import Global from './Global/Global';
import GlobalGroup from './GlobalGroups/GlobalGroup';
import Group from './Groups/Groups';
import Index from './Indexes/Indexes';
import MachineLearning from './MachineLearning/MachineLearning';
import Organization from './Organizations/Organization';
import Pipelines from './Pipelines/Pipelines';
import Resource from './Resource';
import ResourceSnapshots from './ResourceSnapshots/ResourceSnapshots';
import Saml from './Saml/Saml';
import Search from './Search/Search';
import SearchPages from './SearchPages/SearchPages';
import SecurityCache from './SecurityCache/SecurityCache';
import SchemaService from './SchemaService/SchemaService';
import Sources from './Sources/Sources';
import UsageAnalytics from './UsageAnalytics/UsageAnalytics';
import User from './Users/User';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'aws', resource: AWS},
    {key: 'caseAssistConfig', resource: CaseAssistConfig},
    {key: 'catalog', resource: Catalog},
    {key: 'cluster', resource: Cluster},
    {key: 'group', resource: Group},
    {key: 'globalGroup', resource: GlobalGroup},
    {key: 'organization', resource: Organization},
    {key: 'index', resource: Index},
    {key: 'securityCache', resource: SecurityCache},
    {key: 'apiKey', resource: ApiKey},
    {key: 'ml', resource: MachineLearning},
    {key: 'pipeline', resource: Pipelines},
    {key: 'crawlingModule', resource: CrawlingModule},
    {key: 'source', resource: Sources},
    {key: 'extension', resource: Extensions},
    {key: 'field', resource: Field},
    {key: 'saml', resource: Saml},
    {key: 'user', resource: User},
    {key: 'search', resource: Search},
    {key: 'resourceSnapshot', resource: ResourceSnapshots},
    {key: 'ua', resource: UsageAnalytics},
    {key: 'global', resource: Global},
    {key: 'schemaService', resource: SchemaService},
    {key: 'searchPages', resource: SearchPages},
];

class PlatformResources {
    protected API: API;

    aws: AWS;
    caseAssistConfig: CaseAssistConfig;
    catalog: Catalog;
    cluster: Cluster;
    group: Group;
    globalGroup: GlobalGroup;
    organization: Organization;
    index: Index;
    apiKey: ApiKey;
    ml: MachineLearning;
    securityCache: SecurityCache;
    pipeline: Pipelines;
    crawlingModule: CrawlingModule;
    source: Sources;
    extension: Extensions;
    field: Field;
    saml: Saml;
    search: Search;
    user: User;
    resourceSnapshot: ResourceSnapshots;
    ua: UsageAnalytics;
    global: Global;
    schemaService: SchemaService;
    searchPages: SearchPages;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
