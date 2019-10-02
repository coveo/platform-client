import API from '../APICore';
import Catalog from './Catalogs/Catalog';
import Group from './Groups/Groups';
import Organizations from './Organizations/Organizations';
import Resource from './Resource';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [
    {key: 'catalog', resource: Catalog},
    {key: 'group', resource: Group},
    {key: 'organizations', resource: Organizations},
];

class PlatformResources {
    protected API: API;

    catalog: Catalog;
    group: Group;
    organizations: Organizations;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
