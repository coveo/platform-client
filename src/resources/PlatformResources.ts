import {IAPI} from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import AWS from './AWS/AWS';
import Catalog from './Catalogs/Catalog';
import Cluster from './Clusters/Cluster';
import Field from './Fields/Fields';
import GlobalGroup from './GlobalGroups/GlobalGroup';
import Group from './Groups/Groups';
import Index from './Indexes/Indexes';
import MachineLearning from './MachineLearning/MachineLearning';
import Organization from './Organizations/Organization';
import Pipelines from './Pipelines/Pipelines';
import Platform from './Platforn/Platform';
import Resource from './Resource';
import ResourceSnapshots from './ResourceSnapshots/ResourceSnapshots';
import Saml from './Saml/Saml';
import Search from './Search/Search';
import SecurityCache from './SecurityCache/SecurityCache';
import Sources from './Sources/Sources';
import User from './Users/User';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'aws', resource: AWS},
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
    {key: 'platform', resource: Platform},
    {key: 'source', resource: Sources},
    {key: 'field', resource: Field},
    {key: 'saml', resource: Saml},
    {key: 'user', resource: User},
    {key: 'search', resource: Search},
    {key: 'resourceSnapshot', resource: ResourceSnapshots},
];

class PlatformResources {
    protected API: IAPI;

    aws: AWS;
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
    platform: Platform;
    source: Sources;
    field: Field;
    saml: Saml;
    search: Search;
    user: User;
    resourceSnapshot: ResourceSnapshots;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
