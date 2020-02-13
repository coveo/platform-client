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
import Resource from './Resource';
import Saml from './Saml/Saml';
import SecurityCache from './SecurityCache/SecurityCache';
import Sources from './Sources/Sources';
import UsageAnalytics from './UsageAnalytics/UsageAnalytics';
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
    {key: 'ua', resource: UsageAnalytics},
    {key: 'pipeline', resource: Pipelines},
    {key: 'source', resource: Sources},
    {key: 'field', resource: Field},
    {key: 'saml', resource: Saml},
    {key: 'user', resource: User},
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
    ua: UsageAnalytics;
    securityCache: SecurityCache;
    pipeline: Pipelines;
    source: Sources;
    field: Field;
    saml: Saml;
    user: User;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
