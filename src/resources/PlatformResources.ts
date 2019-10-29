import API from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import AWS from './AWS/AWS';
import Catalog from './Catalogs/Catalog';
import Cluster from './Clusters/Cluster';
import Group from './Groups/Groups';
import Index from './Indexes/Indexes';
import Organization from './Organizations/Organization';
import Resource from './Resource';
import SecurityCache from './SecurityCache/SecurityCache';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'aws', resource: AWS},
    {key: 'catalog', resource: Catalog},
    {key: 'cluster', resource: Cluster},
    {key: 'group', resource: Group},
    {key: 'organization', resource: Organization},
    {key: 'index', resource: Index},
    {key: 'securityCache', resource: SecurityCache},
    {key: 'apiKey', resource: ApiKey},
];

class PlatformResources {
    protected API: API;

    aws: AWS;
    catalog: Catalog;
    cluster: Cluster;
    group: Group;
    organization: Organization;
    index: Index;
    apiKey: ApiKey;
    securityCache: SecurityCache;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
