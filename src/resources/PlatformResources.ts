import API from '../APICore';
import ApiKey from './ApiKeys/ApiKeys';
import Catalog from './Catalogs/Catalog';
import Group from './Groups/Groups';
import Organization from './Organizations/Organization';
import Resource from './Resource';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'catalog', resource: Catalog},
    {key: 'group', resource: Group},
    {key: 'organization', resource: Organization},
    {key: 'apiKey', resource: ApiKey},
];

class PlatformResources {
    protected API: API;

    catalog: Catalog;
    group: Group;
    organization: Organization;
    apiKey: ApiKey;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
