import API from '../APICore';
import Catalog from './Catalogs/Catalog';
import Resource from './Resource';

const resourcesMap: Array<{key: string; resource: typeof Resource}> = [{key: 'catalog', resource: Catalog}];

class PlatformResources {
    protected API: API;

    catalog: Catalog;

    registerAll() {
        resourcesMap.forEach(({key, resource}) => {
            this[key] = new resource(this.API);
        });
    }
}

export default PlatformResources;
