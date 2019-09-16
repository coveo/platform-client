import API from '../APICore';
import CoveoPlatform from '../CoveoPlatform';
import Catalog from './Catalogs/Catalog';

const resourcesMap = [{key: 'catalog', resource: Catalog}];

export class CoveoPlatformResources {
    catalog: Catalog;
}

const registerAll = (platform: CoveoPlatform, api: API) => {
    resourcesMap.forEach(({key, resource}) => {
        CoveoPlatform.prototype[key] = new resource(api);
    });
};

export const Resources = {
    registerAll,
};
