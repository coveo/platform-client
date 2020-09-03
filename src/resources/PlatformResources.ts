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
import License from './License/License';
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
    {key: 'apiKey', resource: ApiKey},
    {key: 'aws', resource: AWS},
    {key: 'caseAssistConfig', resource: CaseAssistConfig},
    {key: 'catalog', resource: Catalog},
    {key: 'cluster', resource: Cluster},
    {key: 'crawlingModule', resource: CrawlingModule},
    {key: 'extension', resource: Extensions},
    {key: 'field', resource: Field},
    {key: 'global', resource: Global},
    {key: 'globalGroup', resource: GlobalGroup},
    {key: 'group', resource: Group},
    {key: 'index', resource: Index},
    {key: 'ml', resource: MachineLearning},
    {key: 'license', resource: License},
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
];

class PlatformResources {
    protected API: API;

    apiKey: ApiKey;
    aws: AWS;
    caseAssistConfig: CaseAssistConfig;
    catalog: Catalog;
    cluster: Cluster;
    crawlingModule: CrawlingModule;
    extension: Extensions;
    field: Field;
    global: Global;
    globalGroup: GlobalGroup;
    group: Group;
    index: Index;
    ml: MachineLearning;
    license: License;
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

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
